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
type ThumbnailType = {
  path: string;
  extension: 'jpg' | 'gif';
};
type CharacterType = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: ThumbnailType;
  resourceURI: string;
  comics: ComicType;
  series: unknown;
  stories: unknown;
  events: unknown;
  urls: unknown[];
};
type DataType<T> = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
};
type DataResponseType = {
  code: number;
  status: string;
  etag: string;
  data: DataType<CharacterType>;
};

type FullComicType = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: unknown;
  resourceURI: string;
  urls: unknown;
  series: unknown;
  variants: unknown;
  collections: unknown;
  collectedIssues: unknown;
  dates: {
    type: string;
    date: string;
  }[];
  prices: unknown;
  thumbnail: ThumbnailType;
  images: unknown;
  creators: unknown;
  characters: unknown;
  stories: unknown;
  events: unknown;
};
type ComicResponseType = DataResponseType & {
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: DataType<FullComicType>;
};

const getAuthParams = (): string => {
  const publicKey = 'a52be1c5426f685544028f3f97c4a503';
  const privateKey = '4a5afff42b8f6c961af0f181f5c7788e8fbfc41f';
  const ts = new Date().getTime();

  const hashString: string = md5(ts + privateKey + publicKey);
  return `ts=${ts}&apikey=${publicKey}&hash=${hashString}`;
};

export { getAuthParams };
export type { CharacterType, ComicResponseType, DataResponseType, FullComicType };
