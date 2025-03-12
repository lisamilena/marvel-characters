'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useGetCharacter } from '@/services/get-character-detail';
import { Loading } from '../loading/loading-component';
import styles from './comicsList.module.css';

const IMAGE_QUALITY = process.env.NEXT_PUBLIC_IMAGE_QUALITY || 90;

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
              <div className={styles.imageContainer}>
                <Image
                  alt={comic.title}
                  height={268}
                  quality={IMAGE_QUALITY as number}
                  src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                  width={179}
                />
              </div>
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
