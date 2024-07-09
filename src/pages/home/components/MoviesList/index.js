import styled from 'styled-components';

import { Box } from '~/components/atoms';
import { TitleSmall } from '~/components/typography';
import { mediaQueryMobileOrTablet } from '~/styles/mixins';

import MovieCard from '../MovieCard';

const MoviesList = ({ moviesByYear, primaryReleaseYears, genresList }) => {
  return primaryReleaseYears.map((year) => {
    const movies = moviesByYear[year] || [];
    return (
      <Root key={year}>
        <Title my="24px">{year}</Title>

        <MoviesWrapper>
          {movies.map((movie) => {
            const genre = genresList
              .filter((value) => movie.genre_ids.includes(value.id))
              .map((value) => value.name)
              .join(', ');

            return (
              <MovieCard
                movie={movie}
                genre={genre}
                key={`${year}-${movie.id}`}
              />
            );
          })}
        </MoviesWrapper>
      </Root>
    );
  });
};

export default MoviesList;

const Root = styled(Box)`
  & + & {
    margin-top: 56px;
    border-top: 4px dashed ${({ theme }) => theme.colors.BORDER_NEGATIVE_NORMAL};
  }
`;

const Title = styled(TitleSmall)`
  border-radius: 4px;
  width: fit-content;
  padding: 4px 12px;
  color: ${({ theme }) => theme.colors.TEXT_NEGATIVE_STRONG};
  background: ${({ theme }) => theme.colors.BG_NEGATIVE_WEAK};
`;

const MoviesWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;

  ${mediaQueryMobileOrTablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 12px;
    grid-column-gap: 12px;
    width: 100%;
  }
`;
