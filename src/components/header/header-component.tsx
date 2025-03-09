'use client';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { useStoreFavorites } from '@/store/favorites';
import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import styles from './header.module.css';

export function Header() {
  const favorites = useStoreFavorites((state) => state.characters);
  const { toggleShowFavorites, showFavorites } = useStoreFavorites();

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          priority
          alt="Marvel logo"
          className={styles.logo}
          height={52}
          src="/logo.svg"
          width={130}
        />
      </Link>
      <div className="flex gap-2">
        <FavoriteIcon isFilled onClick={toggleShowFavorites} />
        <p className={twMerge('text-white', showFavorites && 'font-black')}>{favorites?.length}</p>
      </div>
    </header>
  );
}
