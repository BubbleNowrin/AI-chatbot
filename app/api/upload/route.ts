import { NextRequest, NextResponse } from 'next/server';

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
      content = 'PDF file uploaded. Content extraction would require pdf-parse library in a server environment.';
    }

    // Return the content to be stored client-side
    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      content: content, // Full content for client-side storage
      preview: content.substring(0, 500), // First 500 chars for preview
      message: 'File uploaded successfully. Knowledge base updated!'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
