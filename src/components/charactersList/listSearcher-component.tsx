'use client';
import { useState } from 'react';

import { useGetCharacters } from '@/services/get-characters';
import { useStoreFavorites } from '@/store/favorites';
import { Search } from '../search/search-component';
import { CharactersList } from './charactersList-component';

export function ListSearcher() {
  const [query, setQuery] = useState<string>();
  const { data, isLoading, error } = useGetCharacters(query);
  const { showFavorites, characters } = useStoreFavorites();
  const filteredFavorites = characters.filter((item) =>
    item.name?.toUpperCase().startsWith(query?.toUpperCase() || '')
  );

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <>
      <Search
        results={showFavorites ? filteredFavorites.length : data?.total}
        value={query}
        onFilter={(value) => setQuery(value)}
      />
      <CharactersList
        data={showFavorites ? filteredFavorites : (data?.results ?? [])}
        isLoading={!showFavorites && isLoading}
      />
    </>
  );
}
