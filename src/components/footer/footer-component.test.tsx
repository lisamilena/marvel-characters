import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Footer } from './footer-component';

describe('Testing Footer', () => {
  it('Should display the Marvel logo', () => {
    render(<Footer />);

    const logo = screen.getByRole('img', { name: /marvel logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('alt', 'Marvel logo');
  });

  it('Should show the author´s name', () => {
    render(<Footer />);

    expect(screen.getByText(/author: lisa fernandez/i)).toBeInTheDocument();
  });

  it('Should display the Marvel rights text', () => {
    render(<Footer />);

    expect(screen.getByText(/data provided by marvel/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2014 marvel/i)).toBeInTheDocument();
  });
});
