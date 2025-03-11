import { useQueries } from '@tanstack/react-query';
import {
  type CharacterType,
  type ComicResponseType,
  type DataResponseType,
  type FullComicType,
  getAuthParams,
} from './utils';

const LIMIT_SEARCH = 20;

type ErrorCharacterType = {
  code: string;
  message: string;
};
type ErrorComicType = {
  code: string;
  message: string;
};

const getCharacter = async (id: number): Promise<CharacterType> => {
  const authParams = getAuthParams();
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?${authParams}`
  );

  if (!response.ok) {
    const error = (await response.json()) as ErrorCharacterType;
    throw new Error(error.message);
  }

  const data = (await response.json()) as DataResponseType;
  return data?.data?.results?.[0];
};

const getComics = async (id: number): Promise<FullComicType[]> => {
  const authParams = getAuthParams();
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}/comics?${authParams}&limit=${LIMIT_SEARCH}`
  );

  if (!response.ok) {
    const error = (await response.json()) as ErrorComicType;
    throw new Error(error.message);
  }

  const data = (await response.json()) as ComicResponseType;
  return data?.data?.results;
};

// Cache data for 24h
const useGetCharacter = (id: number) => {
  return useQueries({
    queries: [
      {
        queryKey: ['character', id],
        queryFn: () => getCharacter(id),
        staleTime: 24 * 60 * 60 * 1000,
      },
      { queryKey: ['comics', id], queryFn: () => getComics(id), staleTime: 24 * 60 * 60 * 1000 },
    ],
  });
};

export { getCharacter, useGetCharacter };
