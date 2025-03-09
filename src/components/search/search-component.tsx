'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './search.module.css';

const DEBOUNCE_TIME = 3000;

export function Search() {
  const t = useTranslations('Home');
  const [query, setQuery] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      // eslint-disable-next-line no-console
      console.log(query);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(e.target.value);
    }, DEBOUNCE_TIME);
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.search}>
        <Image
          priority
          alt="magnifying glass"
          height={12}
          src="./magnifying-glass.svg"
          width={12}
        />
        <input
          className={styles.searchInput}
          placeholder={t('search')}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
      </div>
      <p>{t('results', { value: 50 })}</p>
    </div>
  );
}
