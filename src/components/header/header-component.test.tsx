import { describe, it, expect, vi, beforeEach, type MockInstance } from 'vitest';
import { usePathname } from 'next/navigation';
import { render, screen, fireEvent } from '@testing-library/react';

import { useStoreFavorites } from '@/store/favorites';
import { MOCK_CHARACTERS, MOCK_FAVORITES } from '@/utils/test-utils';
import { Header } from './header-component';

vi.mock('@/store/favorites', () => ({
  useStoreFavorites: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  redirect: vi.fn(),
}));

const withMockReturnValue = (mocked: unknown) => mocked as MockInstance;

describe('Testing Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      ...MOCK_FAVORITES,
      characters: MOCK_CHARACTERS,
    });
    withMockReturnValue(usePathname).mockReturnValue('/');
  });

  it('Should display the Marvel logo', () => {
    render(<Header />);

    const logo = screen.getByRole('img', { name: /marvel logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
  });

  it('Should show the number of favorite characters', () => {
    render(<Header />);

    expect(screen.getByText(MOCK_CHARACTERS.length.toString())).toBeInTheDocument();
  });

  it('Should activate the favorite mode when clicking the icon', () => {
    render(<Header />);

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(MOCK_FAVORITES.updateShowFavorites).toHaveBeenCalledWith(true);
  });

  it('Should apply the `font-black` class if `showFavorites`', () => {
    withMockReturnValue(useStoreFavorites).mockReturnValue({
      ...MOCK_FAVORITES,
      characters: MOCK_CHARACTERS,
      showFavorites: true,
    });

    render(<Header />);

    const favoritesText = screen.getByText(MOCK_CHARACTERS.length.toString());
    expect(favoritesText).toHaveClass('font-black');
  });
});
