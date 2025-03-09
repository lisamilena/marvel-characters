import Image from 'next/image';
import { type MouseEventHandler } from 'react';

const HEART_ICON = {
  full: '/heart.svg',
  empty: '/heart-empty.svg',
};

const ICON_SIZES = {
  sm: 12,
  md: 24,
};

export function FavoriteIcon({
  isFilled,
  size = 'md',
  onClick,
  className,
}: {
  isFilled: boolean;
  size?: 'sm' | 'md';
  onClick?: MouseEventHandler;
  className?: string;
}) {
  return (
    <Image
      priority
      alt={isFilled ? HEART_ICON.full : HEART_ICON.empty}
      className={className}
      height={ICON_SIZES[size]}
      src={isFilled ? HEART_ICON.full : HEART_ICON.empty}
      width={ICON_SIZES[size]}
      onClick={onClick}
    />
  );
}
