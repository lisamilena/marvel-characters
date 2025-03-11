import { type MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

const HEART_ICON = {
  full: 'heart',
  empty: 'heart-empty',
};

const ICON_SIZES = {
  sm: 'w-3 h-3',
  md: 'w-6 h-6',
};

export function FavoriteIcon({
  isFilled,
  size = 'md',
  onClick,
}: {
  isFilled: boolean;
  size?: 'sm' | 'md';
  onClick?: MouseEventHandler;
}) {
  return (
    <button
      className={twMerge(
        'group mask mask-image transition-colors',
        isFilled ? HEART_ICON.full : HEART_ICON.empty,
        ICON_SIZES[size],
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    />
  );
}
