import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse-fork';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const mode = formData.get('mode') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['.txt', '.pdf', '.csv', '.md', '.json'];
    const fileName = file.name.toLowerCase();
    const isValidType = validTypes.some(type => fileName.endsWith(type));

    if (!isValidType) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported: TXT, PDF, CSV, MD, JSON' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 5MB' },
        { status: 400 }
      );
    }

    // Read file content directly (no file system write in production)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text content
    let content = '';
    if (fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.json')) {
      content = buffer.toString('utf-8');
    } else if (fileName.endsWith('.csv')) {
      content = buffer.toString('utf-8');
      // Basic CSV parsing preview
      const lines = content.split('\n').slice(0, 10);
      content = `CSV Preview (first 10 rows):\n${lines.join('\n')}`;
    } else if (fileName.endsWith('.pdf')) {
      try {
        // Extract text from PDF
        const pdfData = await pdf(buffer);
        content = pdfData.text;
        
        // Clean up the extracted text
        content = content
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
          .trim();
        
        if (!content || content.length < 10) {
          content = `PDF Document: ${file.name}

This PDF file was uploaded but appears to contain mostly images or no extractable text content. 

File Information:
- Name: ${file.name}
- Size: ${(file.size / 1024).toFixed(2)} KB
- Type: PDF Document

For better results, try:
1. Converting the PDF to text format (.txt) 
2. Using a PDF with more text content
3. Ensuring the PDF is not password protected`;
        } else {
          // Add header with file info for context
          content = `PDF Document: ${file.name}
File Size: ${(file.size / 1024).toFixed(2)} KB

EXTRACTED CONTENT:
${content}

---
End of PDF content. You can now answer questions about this document based on the extracted text above.`;
        }
      } catch (error) {
        console.error('PDF parsing error:', error);
        content = `PDF Document: ${file.name}

Error extracting text from PDF. This may be due to:
- Password protection
- Image-only PDF (scanned document)
- Corrupted file
- Unsupported PDF format

File Information:
- Name: ${file.name} 
- Size: ${(file.size / 1024).toFixed(2)} KB

Please try converting to .txt format for better compatibility.`;
      }
    }

    // Return the content to be stored client-side
    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      content: content, // Full content for client-side storage
      preview: content.substring(0, 500), // First 500 chars for preview
      contentLength: content.length,
      message: fileName.endsWith('.pdf') && content.length > 100 
        ? 'PDF uploaded and text successfully extracted! Knowledge base updated.' 
        : 'File uploaded successfully. Knowledge base updated!'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
