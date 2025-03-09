'use client';
import Image from 'next/image';

import { useGetCharacter } from '@/services/get-character-detail';
import styles from './characterHeader.module.css';
import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import { Loading } from '../loading/loading-component';

export function CharacterHeader({ id }: { id: string }) {
  const { data, isLoading, error } = useGetCharacter(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>Error: {error ? JSON.stringify(error) : 'Not found'}</div>;
  }

  return (
    <div className={styles.characterHeader}>
      <div className={styles.headerWrapper}>
        <Image
          priority
          alt={data.name}
          className={styles.detailImage}
          height={278}
          src={`${data.thumbnail?.path}.${data.thumbnail?.extension}`}
          width={278}
        />
        <div className={styles.headerDetails}>
          <h2>
            {data.name || '-'}
            <FavoriteIcon isFilled={false} />
          </h2>
          <p>{data.description || '-'}</p>
        </div>
      </div>
    </div>
  );
}
