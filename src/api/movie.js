import queryString from 'query-string';

import serverConfig from '~/config';

import httpClient from './client';

export const fetchMovies = (
  { sortBy, primaryReleaseYear, voteCountGte, withGenres },
  options = {}
) => {
  const query = queryString.stringify({
    api_key: serverConfig.NEXT_PUBLIC_MOVIEDB_API_KEY,
    sort_by: sortBy,
    primary_release_year: primaryReleaseYear,
    'vote_count.gte': voteCountGte,
    with_genres: withGenres,
  });

  return httpClient.get(`/discover/movie?${query}`, options);
};

export const fetchAllGenre = (options = {}) => {
  const query = queryString.stringify({
    api_key: serverConfig.NEXT_PUBLIC_MOVIEDB_API_KEY,
  });

  return httpClient.get(`/genre/movie/list?${query}`, options);
};
