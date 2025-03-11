import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useGetCharacter } from '@/services/get-character-detail';
import { useStoreFavorites } from '@/store/favorites';
import { CharacterHeader } from './characterHeader-component';
import { MOCK_CHARACTERS, MOCK_FAVORITES, withMockReturnValue } from '@/utils/test-utils';

vi.mock('@/services/get-character-detail', () => ({
  useGetCharacter: vi.fn(),
}));
vi.mock('@/store/favorites', () => ({
  useStoreFavorites: vi.fn(),
}));

describe('Testing CharacterHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    withMockReturnValue(useStoreFavorites).mockReturnValue(MOCK_FAVORITES);
  });

  it('Should show the loading component while the character is being obtained', () => {
    withMockReturnValue(useGetCharacter).mockReturnValue([
      { data: null, isLoading: true, error: null },
    ]);

    render(<CharacterHeader id={1} />);
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('Should display an error message if there is an error obtaining the data', () => {
    withMockReturnValue(useGetCharacter).mockReturnValue([
      { data: null, isLoading: false, error: 'Error getting data' },
    ]);

    render(<CharacterHeader id={1} />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/Error getting data/i)).toBeInTheDocument();
  });

  it('Should show details when available', async () => {
    withMockReturnValue(useGetCharacter).mockReturnValue([
      { data: MOCK_CHARACTERS[0], isLoading: false, error: null },
    ]);

    render(<CharacterHeader id={1} />);

    await waitFor(() => {
      expect(screen.getByText(MOCK_CHARACTERS[0].name)).toBeInTheDocument();
      expect(screen.getByText(MOCK_CHARACTERS[0].description)).toBeInTheDocument();
    });

    const image = screen.getByRole('img', { name: MOCK_CHARACTERS[0].name });
    expect(image.getAttribute('src')).toContain('spiderman.jpg');
  });

  it('Should display the favorite icon when the character is in favorites', async () => {
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      characters: [MOCK_CHARACTERS[0]],
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
    });
    withMockReturnValue(useGetCharacter).mockReturnValue([
      { data: MOCK_CHARACTERS[0], isLoading: false, error: null },
    ]);

    render(<CharacterHeader id={1} />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveClass('heart');
    });
  });

  it('Should add a character to favorites when the favorite icon is clicked on', () => {
    const addCharacterMock = vi.fn();
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      characters: [],
      addCharacter: addCharacterMock,
      removeCharacter: vi.fn(),
    });

    withMockReturnValue(useGetCharacter).mockReturnValue([
      { data: MOCK_CHARACTERS[0], isLoading: false, error: null },
    ]);

    render(<CharacterHeader id={1} />);

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(addCharacterMock).toHaveBeenCalledWith(MOCK_CHARACTERS[0]);
  });

  it('Should remove the character from favorites when the icon is clicked if it is already marked as a favorite', () => {
    const removeCharacterMock = vi.fn();
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      characters: [MOCK_CHARACTERS[0]],
      addCharacter: vi.fn(),
      removeCharacter: removeCharacterMock,
    });

    withMockReturnValue(useGetCharacter).mockReturnValue([
      { data: MOCK_CHARACTERS[0], isLoading: false, error: null },
    ]);

    render(<CharacterHeader id={1} />);

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(removeCharacterMock).toHaveBeenCalledWith(MOCK_CHARACTERS[0].id);
  });
});
