import ChatWidget from '@/components/ChatWidget';

export default function WidgetEmbedPage({
  searchParams,
}: {
  searchParams: { websiteUrl?: string; primaryColor?: string; position?: string };
}) {
  return (
    <div className="w-full h-screen bg-transparent">
      <ChatWidget
        websiteUrl={searchParams.websiteUrl || ''}
        primaryColor={searchParams.primaryColor || '#3b82f6'}
        position={(searchParams.position as any) || 'bottom-right'}
      />
    </div>
  );
}
