import TypingStudioClient from '@/components/TypingStudioClient';
import type { AppTab } from '@/lib/types';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialTab: AppTab =
    params.tab === 'heatmap' || params.tab === 'history' ? params.tab : 'test';

  return <TypingStudioClient initialTab={initialTab} />;
}
