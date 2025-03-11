'use client';
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { useStoreFavorites } from '@/store/favorites';
import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import styles from './header.module.css';

const HOME_URL = '/';

export function Header() {
  const { updateShowFavorites, showFavorites, characters } = useStoreFavorites();
  const pathName = usePathname();

  const handleRedirectList = (showFavorites: boolean) => {
    updateShowFavorites(showFavorites);
    if (pathName !== HOME_URL) redirect(HOME_URL);
  };

  return (
    <header className={styles.header}>
      <Image
        priority
        alt="Marvel logo"
        className={styles.logo}
        height={52}
        quality={75}
        src="/logo.svg"
        width={130}
        onClick={() => handleRedirectList(false)}
      />
      <div className="flex gap-2">
        <FavoriteIcon isFilled onClick={() => handleRedirectList(true)} />
        <p className={twMerge('text-white', showFavorites && 'font-black')}>{characters?.length}</p>
      </div>
    </header>
  );
}
