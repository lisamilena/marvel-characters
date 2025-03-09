import { useQuery } from '@tanstack/react-query';
import { getAuthParams } from './utils';

const LIMIT_SEARCH = 50;

type CharacterType = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: 'jpg' | 'gif';
  };
  resourceURI: string;
  comics: unknown;
  series: unknown;
  stories: unknown;
  events: unknown;
  urls: unknown[];
};
type DataResponseType = {
  code: number;
  status: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: CharacterType[];
  };
};
type ErrorType = {
  code: string;
  message: string;
};

const getCharacters = async (): Promise<DataResponseType['data']> => {
  const authParams = getAuthParams();
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?${authParams}&limit=${LIMIT_SEARCH}`
  );

  if (!response.ok) {
    const error = (await response.json()) as ErrorType;
    throw new Error(error.message);
  }

  const data = (await response.json()) as DataResponseType;
  return data?.data;
};

// We are using useQuery to cache our data for 24h
const useGetCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export { getCharacters, useGetCharacters };
export type { CharacterType };
