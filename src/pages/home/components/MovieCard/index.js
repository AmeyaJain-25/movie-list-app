import { useTheme } from 'styled-components';

import { MOVIE_IMG_BASE_PATH } from '~/constants';
import {
  LabelSmall,
  LabelXSmall,
  ParaMedium,
  TitleXXSmall,
} from '~/components/typography';
import { useFormatDatetimeUtils } from '~/hooks';

import * as Styles from './index.styled';

const MovieCard = ({ movie, genre, ...rest }) => {
  const theme = useTheme();
  const { formatDatetimeInTz } = useFormatDatetimeUtils();

  return (
    <Styles.Root {...rest}>
      <Styles.MovieImgWrapper>
        <Styles.MovieDetailsContainer>
          <TitleXXSmall color={theme.colors.TEXT_INVERTED}>
            {movie.title}
            <span style={{ textTransform: 'none' }}>
              {genre ? ` - [${genre}]` : null}
            </span>
          </TitleXXSmall>
          <Styles.HoverShow>
            <ParaMedium color={theme.colors.TEXT_INVERTED}>
              {formatDatetimeInTz(new Date(movie.release_date), 'dd MMM yyyy')}
            </ParaMedium>
            <LabelSmall color={theme.colors.TEXT_INVERTED}>
              Rating: {movie.vote_average}
            </LabelSmall>
            <LabelXSmall color={theme.colors.TEXT_INVERTED} mt="12px">
              {movie.overview}
            </LabelXSmall>
          </Styles.HoverShow>
        </Styles.MovieDetailsContainer>

        <Styles.MovieImg
          src={`${MOVIE_IMG_BASE_PATH}${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      </Styles.MovieImgWrapper>
    </Styles.Root>
  );
};

export default MovieCard;
