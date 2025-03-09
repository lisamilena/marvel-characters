import md5 from 'md5';

type ComicType = {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
};
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
  comics: ComicType;
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

const getAuthParams = (): string => {
  const publicKey = 'a52be1c5426f685544028f3f97c4a503';
  const privateKey = '4a5afff42b8f6c961af0f181f5c7788e8fbfc41f';
  const ts = new Date().getTime();

  const hashString: string = md5(ts + privateKey + publicKey);
  return `ts=${ts}&apikey=${publicKey}&hash=${hashString}`;
};

export { getAuthParams };
export type { CharacterType, DataResponseType };
