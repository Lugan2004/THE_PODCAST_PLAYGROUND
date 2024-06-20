// localStorage.ts

import { FavoriteEpisode } from "@/components/types";

export const getFavorites = (): FavoriteEpisode[] => {
  if (typeof window !== 'undefined') {
    const favorites = window.localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};

const saveFavorites = (favorites: FavoriteEpisode[]): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const addToFavorites = (favoriteEpisode: FavoriteEpisode): void => {
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, favoriteEpisode];
  saveFavorites(updatedFavorites);
};

export const removeFromFavorites = (podcastId: string, seasonNumber: number, episodeNumber: number): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(
    (fav) => !(fav.podcastId === podcastId && fav.seasonNumber === seasonNumber && fav.episode === episodeNumber)
  );
  saveFavorites(updatedFavorites);
};

export const isFavorite = (podcastId: string, seasonNumber: number, episodeNumber: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => 
    fav.podcastId === podcastId && fav.seasonNumber === seasonNumber && fav.episode === episodeNumber
  );
};