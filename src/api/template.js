import queryString from 'query-string';

import serverConfig from '~/config';

import httpClient from './client';

export const fetchDiscoveredMovies = (
  { sortBy, primaryReleaseYear, page, voteCountGte },
  options = {}
) => {
  const query = queryString.stringify({
    api_key: serverConfig.NEXT_PUBLIC_MOVIEDB_API_KEY,
    sort_by: sortBy,
    primary_release_year: primaryReleaseYear,
    page,
    'vote_count.gte': voteCountGte,
  });

  return httpClient.get(`/api/discover/movie/?${query}`, options);
};

export const fetchMoviesByGenre = ({}, options = {}) => {
  const query = queryString.stringify({
    api_key: serverConfig.NEXT_PUBLIC_MOVIEDB_API_KEY,
  });

  return httpClient.get(`/api/genre/movie/list/?${query}`, options);
};
