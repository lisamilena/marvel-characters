'use client';
import { useTranslations } from 'next-intl';

import { useGetCharacter } from '@/services/get-character-detail';
import styles from './comicsList.module.css';

export function ComicsList({ id }: { id: string }) {
  const t = useTranslations('Detail');
  const { data, isLoading } = useGetCharacter(id);

  if (isLoading) return <p>Loading ...</p>;

  return (
    data && (
      <div className={styles.comicsList}>
        <h3>{t('comics')}</h3>
        <ul>{data.comics?.items.map((comic) => <li key={comic.resourceURI}>{comic.name}</li>)}</ul>
      </div>
    )
  );
}
