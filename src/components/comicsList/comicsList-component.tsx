'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useGetCharacter } from '@/services/get-character-detail';
import { Loading } from '../loading/loading-component';
import styles from './comicsList.module.css';

export function ComicsList({ id }: { id: string }) {
  const t = useTranslations('Detail');
  const [, { data, isLoading }] = useGetCharacter(parseInt(id));

  if (isLoading) return <Loading className="py-12" color="red" />;

  return (
    data && (
      <div className={styles.comicsList}>
        <h3>{t('comics')}</h3>
        <ul>
          {data?.map((comic) => (
            <li key={comic.resourceURI}>
              <Image
                alt={comic.title}
                height={268}
                src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                width={179}
              />
              <div className={styles.name}>
                <span>{comic.title}</span>
                <span>{comic.dates[0].date?.split('-')?.[0]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
