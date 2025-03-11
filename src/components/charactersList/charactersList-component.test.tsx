import { describe, beforeEach, vi, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { useStoreFavorites } from '@/store/favorites';
import { MOCK_CHARACTERS, MOCK_FAVORITES, withMockReturnValue } from '@/utils/test-utils';
import { CharactersList } from './charactersList-component';

vi.mock('@/store/favorites', () => ({
  useStoreFavorites: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/en'),
}));

describe('Testing CharactersList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    withMockReturnValue(usePathname).mockReturnValue('/en');
    withMockReturnValue(useStoreFavorites).mockReturnValue(MOCK_FAVORITES);
  });

  it('Should render loading on isLoading = true', () => {
    render(<CharactersList isLoading data={[]} />);
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('Should render the characters correctly', async () => {
    render(<CharactersList data={MOCK_CHARACTERS} isLoading={false} />);

    await waitFor(() => {
      expect(screen.getByText('Spider-Man')).toBeInTheDocument();
      expect(screen.getByText('Iron Man')).toBeInTheDocument();
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(MOCK_CHARACTERS.length);
    expect(images[0].getAttribute('src')).toContain('spiderman.jpg');
    expect(images[1].getAttribute('src')).toContain('ironman.jpg');
  });

  it('Should mark a character as a favorite by clicking on `FavoriteIcon`', () => {
    const addCharacter = vi.fn();
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      characters: [],
      addCharacter,
      removeCharacter: vi.fn(),
    });

    render(<CharactersList data={MOCK_CHARACTERS} isLoading={false} />);

    const favoriteButtons = screen.getAllByRole('button');
    fireEvent.click(favoriteButtons[0]);

    expect(addCharacter).toHaveBeenCalledWith(MOCK_CHARACTERS[0]);
  });

  it('Should remove a favorite by clicking on `FavoriteIcon`', () => {
    const removeCharacter = vi.fn();
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      characters: [MOCK_CHARACTERS[0]],
      addCharacter: vi.fn(),
      removeCharacter,
    });

    render(<CharactersList data={MOCK_CHARACTERS} isLoading={false} />);

    const favoriteButtons = screen.getAllByRole('button');
    fireEvent.click(favoriteButtons[0]);

    expect(removeCharacter).toHaveBeenCalledWith(MOCK_CHARACTERS[0].id);
  });

  it('Should navigate to the detail page when you click on ', () => {
    render(<CharactersList data={MOCK_CHARACTERS} isLoading={false} />);

    const spiderManLink = screen.getByText('Spider-Man').closest('a');
    expect(spiderManLink).toHaveAttribute('href', '/en/1');
  });
});
