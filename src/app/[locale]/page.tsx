import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCharacters } from '@/services/get-characters';
import { ListSearcher } from '@/components/list/listSearcher-component';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacters(),
    initialData: { name: 'Loading...' },
  });

  // Dehydrating (making accessible the data and state over the client-side)
  return (
    <section className="grid grid-rows-[77px_1fr] gap-6 px-4 py-6 sm:p-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListSearcher />
      </HydrationBoundary>
    </section>
  );
}
