import { useQuery } from '@tanstack/react-query';
import { type DataResponseType, getAuthParams } from './utils';

const LIMIT_SEARCH = 50;

type ErrorType = {
  code: string;
  message: string;
};

const getCharacters = async (query?: string): Promise<DataResponseType['data']> => {
  const queryParam = query ? `&nameStartsWith=${query}` : '';
  const authParams = getAuthParams();
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?${authParams}&limit=${LIMIT_SEARCH}${queryParam}`
  );

  if (!response.ok) {
    const error = (await response.json()) as ErrorType;
    throw new Error(error.message);
  }

  const data = (await response.json()) as DataResponseType;
  return data?.data;
};

// Cache data for 24h
const useGetCharacters = (query?: string) => {
  return useQuery({
    queryKey: ['characters', query],
    queryFn: () => getCharacters(query),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export { getCharacters, useGetCharacters };
