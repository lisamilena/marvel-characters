import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import styles from './header.module.css';

export async function Header() {
  const local = await getLocale();

  return (
    <header className={styles.header}>
      <Link href={`/${local}`}>
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
        <FavoriteIcon isFilled />
        {/* TODO: counter */}
        <p className="text-white">1</p>
      </div>
    </header>
  );
}
