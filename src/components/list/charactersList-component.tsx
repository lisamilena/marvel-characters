'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useStoreFavorites } from '@/store/favorites';
import { type CharacterType } from '@/services/utils';
import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import { Loading } from '../loading/loading-component';

export function CharactersList({ data, isLoading }: { data: CharacterType[]; isLoading: boolean }) {
  const pathname = usePathname();
  const { characters, addCharacter, removeCharacter } = useStoreFavorites();

  const locale = pathname.split('/')[1];

  if (isLoading) {
    return <Loading color="red" />;
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(172px,1fr))] gap-4">
      {data?.map(({ id, name, thumbnail, ...character }) => {
        const isFavorite = characters?.some((item) => item.id === id);
        return (
          <li key={id} className="animated-bg cut-corner max-w-[210px]">
            <Link className="relative z-10" href={`/${locale}/${id}`}>
              <Image
                alt={name}
                className="h-[190px] w-full border-b-2 border-red-600"
                height={190}
                src={`${thumbnail?.path}.${thumbnail?.extension}`}
                width={190}
              />
              <div className="flex justify-between p-4 pb-5">
                <p className="truncate text-sm text-white">{name}</p>
                <FavoriteIcon
                  isFilled={isFavorite}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (isFavorite) removeCharacter(id);
                    else addCharacter({ id, name, thumbnail, ...character });
                  }}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
