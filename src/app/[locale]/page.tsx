import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CharactersList } from '@/components/charactersList/charactersList-component';
import { Search } from '@/components/search/search-component';
import { getCharacters } from '@/services/get-characters';
//    <main className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getCharacters,
  });

  // Dehydrating (making accessible the data and state over the client-side)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="grid min-h-screen grid-rows-[77px_1fr] gap-6 px-4 py-6 sm:p-12">
        <Search />

        <CharactersList />
      </main>
    </HydrationBoundary>
  );
}
