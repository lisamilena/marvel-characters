/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { type CharacterType, useGetCharacters } from '@/services/get-characters';
import { FavoriteIcon } from '../favoriteIcon/favoriteIcon-component';
import { Loading } from '../loading/loading-component';

export function CharactersList() {
  const pathname = usePathname();
  const { push } = useRouter();
  const { data, isLoading, error } = useGetCharacters();

  const handleRedirect = (id: number) => {
    const locale = pathname.split('/')[1];
    push(`/${locale}/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(172px,1fr))] gap-4">
      {data?.results?.map(({ id, name, thumbnail }: CharacterType) => (
        <li key={id} className="animated-bg cut-corner">
          <div className="relative z-10 cursor-pointer" onClick={() => handleRedirect(id)}>
            <Image
              priority
              alt={name}
              className="h-[190px] w-full border-b-2 border-red-600"
              height={190}
              src={`${thumbnail?.path}.${thumbnail?.extension}`}
              width={190}
            />
            <div className="flex justify-between p-4 pb-5">
              <p className="truncate text-sm text-white">{name}</p>
              <FavoriteIcon
                isFilled={false}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  //console.log('Clicked ' + id);
                }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
