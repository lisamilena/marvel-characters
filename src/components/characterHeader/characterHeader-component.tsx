'use client';
import Image from 'next/image';

import { useGetCharacter } from '@/services/get-character-detail';
import { useStoreFavorites } from '@/store/favorites';
import styles from './characterHeader.module.css';
import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import { Loading } from '../loading/loading-component';

export function CharacterHeader({ id }: { id: number }) {
  const [{ data, isLoading, error }] = useGetCharacter(id);
  const { characters, addCharacter, removeCharacter } = useStoreFavorites();

  const isFavorite = characters?.some((item) => item.id === id);

  if (error || (!isLoading && !data)) {
    return <div>Error: {error ? JSON.stringify(error) : 'Not found'}</div>;
  }

  return (
    <div className={styles.characterHeader}>
      {isLoading ? (
        <Loading className="py-12" color="red" />
      ) : (
        data && (
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
                <FavoriteIcon
                  isFilled={isFavorite}
                  onClick={() => {
                    if (isFavorite) removeCharacter(id);
                    else addCharacter(data);
                  }}
                />
              </h2>
              <p>{data.description || '-'}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
