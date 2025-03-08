import Image from 'next/image';

const HEART_ICON = {
  full: '/heart.svg',
  empty: '/heart-empty.svg',
};

export function FavoriteIcon({ isFilled }: { isFilled: boolean }) {
  return (
    <Image
      priority
      alt={isFilled ? HEART_ICON.full : HEART_ICON.empty}
      height={22}
      src={isFilled ? HEART_ICON.full : HEART_ICON.empty}
      width={24}
    />
  );
}
