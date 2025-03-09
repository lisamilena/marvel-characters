'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './search.module.css';

const DEBOUNCE_TIME = 1500;

export function Search({
  value = '',
  results,
  onFilter,
}: {
  value?: string;
  results: number | undefined;
  onFilter: (query: string) => void;
}) {
  const t = useTranslations('Home');
  const [query, setQuery] = useState(value);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      onFilter(query);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => onFilter(e.target.value), DEBOUNCE_TIME);
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
      <p>{results !== undefined ? t('results', { value: results }) : '-'}</p>
    </div>
  );
}
