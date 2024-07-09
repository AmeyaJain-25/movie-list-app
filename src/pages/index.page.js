import { movieApi } from '~/api';
import {
  DEFAULT_PRIMARY_RELEASE_YEAR,
  defaultApiParams,
  MAX_MOVIES_PER_YEAR,
} from '~/constants';

import HomePage from './home';

export default function Home(props) {
  return <HomePage {...props} />;
}

export async function getServerSideProps(context) {
  const query = context.query;

  const fetchMoviesPayload = {
    primaryReleaseYear: DEFAULT_PRIMARY_RELEASE_YEAR,
    ...defaultApiParams,
  };

  if (query.genre) {
    let genreIds = query.genre
      .split(',')
      .map((val) => val.trim())
      .filter((val) => !!val);

    fetchMoviesPayload.withGenres = genreIds.join('|');
  }

  const [fetchMovies, fetchAllGenre] = await Promise.allSettled([
    movieApi.fetchMovies(fetchMoviesPayload, { context }),
    movieApi.fetchAllGenre({ context }),
  ]);

  if (fetchMovies.status !== 'fulfilled') {
    throw fetchMovies.reason;
  }
  if (fetchAllGenre.status !== 'fulfilled') {
    throw fetchAllGenre.reason;
  }

  const moviesList =
    fetchMovies.value?.results.slice(0, MAX_MOVIES_PER_YEAR) || [];
  const genresList = fetchAllGenre.value?.genres || [];

  return {
    props: {
      moviesList,
      genresList,
    },
  };
}
