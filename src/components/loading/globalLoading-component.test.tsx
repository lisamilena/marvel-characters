import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { GlobalLoader } from './globalLoading-component';
import { withMockReturnValue } from '@/utils/test-utils';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Testing GlobalLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should be rendered when the path changes', () => {
    withMockReturnValue(usePathname).mockReturnValue('/home');

    render(<GlobalLoader />);

    expect(screen.getByTestId('global-loader')).toBeInTheDocument();
  });

  it('Should clear the timeout when unmount', () => {
    vi.useFakeTimers();
    withMockReturnValue(usePathname).mockReturnValue('/home');

    const { unmount } = render(<GlobalLoader />);
    unmount();

    expect(() => vi.advanceTimersByTime(200)).not.toThrow();
  });
});
