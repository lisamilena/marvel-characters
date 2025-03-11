import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteIcon } from './favoriteIcon-component';

describe('Testing FavoriteIcon', () => {
  it('Should render the correct icon when `isFilled`', () => {
    render(<FavoriteIcon isFilled />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('heart');
  });

  it('Should render the correct icon when `isFilled` is false', () => {
    render(<FavoriteIcon isFilled={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('heart-empty');
  });

  it('Should correctly apply the default size', () => {
    render(<FavoriteIcon isFilled={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-6 h-6');
  });

  it('Should correctly apply the size `sm`', () => {
    render(<FavoriteIcon isFilled={false} size="sm" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-3 h-3');
  });

  it('Should execute the `onClick` function when click it', () => {
    const handleClick = vi.fn();
    render(<FavoriteIcon isFilled={false} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should have `cursor-pointer` when passing a function in `onClick`.', () => {
    const handleClick = vi.fn();
    render(<FavoriteIcon isFilled={false} onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-pointer');
  });
});
