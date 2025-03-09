import { useQuery } from '@tanstack/react-query';
import { type CharacterType, type DataResponseType, getAuthParams } from './utils';

type ErrorType = {
  code: string;
  message: string;
};

const getCharacter = async (id: string): Promise<CharacterType> => {
  const authParams = getAuthParams();
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?${authParams}`
  );

  if (!response.ok) {
    const error = (await response.json()) as ErrorType;
    throw new Error(error.message);
  }

  const data = (await response.json()) as DataResponseType;
  return data?.data?.results?.[0];
};

// We are using useQuery to cache our data for 24h
const useGetCharacter = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export { getCharacter, useGetCharacter };
