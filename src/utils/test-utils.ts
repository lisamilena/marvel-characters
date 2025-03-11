import { type MockInstance, vi } from 'vitest';
import { type CharacterType } from '@/services/utils';

const MOCK_CHARACTERS = [
  {
    id: 1,
    name: 'Spider-Man',
    description: 'A hero',
    thumbnail: { path: 'https://example.com/spiderman', extension: 'jpg' },
  },
  {
    id: 2,
    name: 'Iron Man',
    description: 'A hero',
    thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' },
  },
] as CharacterType[];

const MOCK_COMICS = [
  {
    resourceURI: 'https://example.com/comic1',
    title: 'Comic 1',
    thumbnail: { path: 'https://example.com/comic1', extension: 'jpg' },
    dates: [{ date: '2023-01-01' }],
  },
  {
    resourceURI: 'https://example.com/comic2',
    title: 'Comic 2',
    thumbnail: { path: 'https://example.com/comic2', extension: 'jpg' },
    dates: [{ date: '2022-05-15' }],
  },
];

const MOCK_FAVORITES = {
  characters: [],
  showFavorites: false,
  addCharacter: vi.fn(),
  removeCharacter: vi.fn(),
  updateShowFavorites: vi.fn(),
};

const withMockReturnValue = (mocked: unknown) => mocked as MockInstance;

export { MOCK_CHARACTERS, MOCK_COMICS, MOCK_FAVORITES, withMockReturnValue };
