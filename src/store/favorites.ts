import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type CharacterType } from '@/services/utils';

type StoreFavorites = {
  characters: CharacterType[];
  addCharacter: (newCharacter: CharacterType) => void;
  removeCharacter: (id: number) => void;
  showFavorites: boolean;
  toggleShowFavorites: () => void;
};

export const useStoreFavorites = create(
  persist<StoreFavorites>(
    (set) => ({
      characters: [],
      addCharacter: (newCharacter) =>
        set(({ characters }) => ({ characters: [...characters, newCharacter] })),
      removeCharacter: (id) =>
        set(({ characters }) => ({
          characters: characters.filter((character) => character.id !== id),
        })),
      showFavorites: false,
      toggleShowFavorites: () => set(({ showFavorites }) => ({ showFavorites: !showFavorites })),
    }),
    {
      name: 'favorites-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
