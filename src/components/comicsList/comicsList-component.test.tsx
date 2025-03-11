import { describe, it, expect, vi, beforeEach, type MockInstance } from 'vitest';
import { useTranslations } from 'next-intl';
import { render, screen, waitFor } from '@testing-library/react';

import { useGetCharacter } from '@/services/get-character-detail';
import { MOCK_COMICS, withMockReturnValue } from '@/utils/test-utils';
import { ComicsList } from './comicsList-component';

vi.mock('@/services/get-character-detail', () => ({
  useGetCharacter: vi.fn(),
}));
vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('Testing ComicsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslations as unknown as MockInstance).mockReturnValue((key: string) => key);
  });

  it('Should display the loading while the comics are being fetched', () => {
    withMockReturnValue(useGetCharacter).mockReturnValue([null, { data: null, isLoading: true }]);

    render(<ComicsList id="1" />);
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('Should display comics when data is available', async () => {
    withMockReturnValue(useGetCharacter).mockReturnValue([
      null,
      { data: MOCK_COMICS, isLoading: false },
    ]);

    render(<ComicsList id="1" />);

    await waitFor(() => {
      expect(screen.getByText('comics')).toBeInTheDocument(); // Verifica el título traducido
      expect(screen.getByText('Comic 1')).toBeInTheDocument();
      expect(screen.getByText('Comic 2')).toBeInTheDocument();
    });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(MOCK_COMICS.length);
    expect(images[0].getAttribute('src')).toContain('comic1.jpg');
    expect(images[1].getAttribute('src')).toContain('comic2.jpg');

    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });
});
