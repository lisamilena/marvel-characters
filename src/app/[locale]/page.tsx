import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CharactersList } from '@/components/charactersList/charactersList-component';
import { Search } from '@/components/search/search-component';
import { getCharacters } from '@/services/get-characters';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });

  // Dehydrating (making accessible the data and state over the client-side)
  return (
    <section className="grid grid-rows-[77px_1fr] gap-6 px-4 py-6 sm:p-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Search />

        <CharactersList />
      </HydrationBoundary>
    </section>
  );
}
