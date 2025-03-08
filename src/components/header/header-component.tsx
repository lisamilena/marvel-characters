import Image from 'next/image';

import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';

import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Image
        priority
        alt="Marvel logo"
        className={styles.logo}
        height={52}
        src="/logo.svg"
        width={130}
      />
      <div className="flex gap-2">
        <FavoriteIcon isFilled />
        {/* TODO: counter */}
        <p className="text-white">1</p>
      </div>
    </header>
  );
}
