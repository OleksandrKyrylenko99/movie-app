export const bodyParams = (id: number) => {
  return {
    addFavoriteList: {
      media_type: 'movie',
      media_id: id,
      favorite: true,
    },
    addWatchList: {
      media_type: 'movie',
      media_id: id,
      watchlist: true,
    },
    removeFavoriteList: {
      media_type: 'movie',
      media_id: id,
      favorite: false,
    },
    removeWatchList: {
      media_type: 'movie',
      media_id: id,
      watchlist: false,
    },
  };
};
