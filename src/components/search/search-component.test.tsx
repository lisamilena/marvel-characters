import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import { withMockReturnValue } from '@/utils/test-utils';
import { Search } from './search-component';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('Testing Search Component', () => {
  let mockOnFilter: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    withMockReturnValue(useTranslations).mockReturnValue(
      (key: string, params: Record<string, string>) => (params ? `${key}: ${params.value}` : key)
    );
    mockOnFilter = vi.fn();
  });

  it('Should render correctly with the initial value', () => {
    render(<Search results={10} value="Iron Man" onFilter={mockOnFilter} />);

    const input = screen.getByPlaceholderText('search');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Iron Man');
    expect(screen.getByText('results: 10')).toBeInTheDocument();
  });

  it('Should update the value of the input when the user writes', () => {
    render(<Search results={undefined} value="" onFilter={mockOnFilter} />);

    const input = screen.getByPlaceholderText('search');
    fireEvent.change(input, { target: { value: 'Spider-Man' } });

    expect(input).toHaveValue('Spider-Man');
  });

  it('Should call `onFilter` when Enter is pressed', () => {
    render(<Search results={undefined} value="" onFilter={mockOnFilter} />);

    const input = screen.getByPlaceholderText('search');
    fireEvent.change(input, { target: { value: 'Hulk' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnFilter).toHaveBeenCalledWith('Hulk');
  });

  it('Should show ‘-’ if `results` is undefined', () => {
    render(<Search results={undefined} value="" onFilter={mockOnFilter} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
