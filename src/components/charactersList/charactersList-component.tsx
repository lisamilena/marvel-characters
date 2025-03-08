'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { type Character, useGetCharacters } from '@/services/get-characters';

import styles from './charactersList.module.css';

export function CharactersList() {
  const t = useTranslations('Home');

  const { data, isLoading, error } = useGetCharacters(); //isSuccess isFetched

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className={styles.search}>
      <Image priority alt="magnifying glass" height={12} src="./magnifying-glass.svg" width={12} />
      <h1>{t('name')}</h1>
      <ul>
        {data?.results?.map((character: Character) => <li key={character.id}>{character.name}</li>)}
      </ul>
    </div>
  );
}
