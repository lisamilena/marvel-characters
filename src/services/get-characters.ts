import { useQuery } from '@tanstack/react-query';
import crypto from 'crypto';

type Character = {
  id: number;
  name: string;
};
type DataResponse = {
  code: number;
  status: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
  };
};

const getCharacters = async (): Promise<DataResponse['data']> => {
  const publicKey = 'a52be1c5426f685544028f3f97c4a503';
  const privateKey = '4a5afff42b8f6c961af0f181f5c7788e8fbfc41f';
  const ts = new Date().getTime();
  const hash = crypto
    .createHash('md5')
    .update(ts + privateKey + publicKey)
    .digest('hex');

  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = (await response.json()) as DataResponse;
  return data?.data;
};

// We are using useQuery to cache our data for 10 minutes
const useGetCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
    staleTime: 10 * 60 * 1000,
  });
};

export { getCharacters, useGetCharacters };
export type { Character };
