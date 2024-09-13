'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FavoriteBtnProps {
  champId: string;
}

export default function FavoriteBtn({ champId }: FavoriteBtnProps) {
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  useEffect(() => {
    const getItem = localStorage.getItem('favorite_champions');
    if (getItem) {
      const favoriteList: string[] = JSON.parse(getItem);
      setIsFavorite(favoriteList.includes(champId));
      setFavoriteList(favoriteList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (isFavorite) {
      setIsFavorite(false);
      const newFavoriteArr = favoriteList.filter(item => item !== champId);
      setFavoriteList(newFavoriteArr);
      localStorage.setItem('favorite_champions', JSON.stringify(newFavoriteArr));
    } else {
      setIsFavorite(true);
      const newFavoriteArr = [...favoriteList, champId];
      setFavoriteList(newFavoriteArr);
      localStorage.setItem('favorite_champions', JSON.stringify(newFavoriteArr));
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`favorite-btn ${isFavorite ? 'bg-color-primary-500' : 'bg-[#d9d9d9]'}`}
    >
      <img src={'/images/favorite_img.png'} width={24} height={24} alt="favorite" />
    </button>
  );
}
