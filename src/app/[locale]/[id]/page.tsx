import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { CharacterHeader } from '@/components/characterHeader/characterHeader-component';
import { ComicsList } from '@/components/comicsList/comicsList-component';
import { getCharacter } from '@/services/get-character-detail';

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(parseInt(id)),
  });

  return (
    <section className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CharacterHeader id={parseInt(id)} />

        <ComicsList id={id} />
      </HydrationBoundary>
    </section>
  );
}
