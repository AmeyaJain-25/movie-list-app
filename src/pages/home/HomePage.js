import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useImmer } from 'use-immer';
import { useTheme } from 'styled-components';

import AppUIShell from '~/components/core/AppUIShell';
import PageContainer from '~/components/layout/PageContainer';
import { useRequestStates, useSearchParams } from '~/hooks';
import { movieApi } from '~/api';
import { Box, Button, Flex } from '~/components/atoms';
import { LabelXSmall, TitleXSmall } from '~/components/typography';
import {
  DEFAULT_PRIMARY_RELEASE_YEAR,
  defaultApiParams,
  MAX_MOVIES_PER_YEAR,
} from '~/constants';
import Header from '~/components/layout/Header';

import * as Styles from './HomePage.styled';
import MoviesList from './components/MoviesList';

import PlusIcon from '~public/assets/icons/plus.svg';
import CheckIcon from '~public/assets/icons/check.svg';

const HomePage = ({ moviesList: initialMoviesList = [], genresList = [] }) => {
  const pageTitle = 'Movie DB';
  const pageDescription = 'Discover new top rated movies here';
  const canonicalUrl = 'http://themoviedb.org';
  const ogTitle = pageTitle;
  const ogDescription = pageDescription;
  const ogUrl = canonicalUrl;
  const twitterTitle = pageTitle;
  const twitterDescription = pageDescription;
  const twitterUrl = canonicalUrl;

  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamGenreIds = searchParams.get('genre');
  const [fetchMoviesRequestStates, fetchMoviesRequestHandlers] =
    useRequestStates();
  const [primaryReleaseYears, setPrimaryReleaseYears] = useState([
    DEFAULT_PRIMARY_RELEASE_YEAR,
  ]);
  const [moviesListData, updateMoviesListData] = useImmer({
    moviesByYear: {
      [DEFAULT_PRIMARY_RELEASE_YEAR]: initialMoviesList.slice(
        0,
        MAX_MOVIES_PER_YEAR
      ),
    },
  });

  const loadMoreMoviesRef = useRef(null);
  const latestPrimaryReleaseYear =
    primaryReleaseYears[primaryReleaseYears.length - 1];
  const oldestPrimaryReleaseYear = primaryReleaseYears[0];
  const shouldLoadMoreMovies =
    latestPrimaryReleaseYear < new Date().getFullYear();

  const filteredGenreIds = useMemo(() => {
    if (searchParamGenreIds) {
      const result = searchParamGenreIds
        .split(',')
        .map((val) => Number(val.trim()))
        .filter((val) => !!val);
      return result;
    }
    return null;
  }, [searchParamGenreIds]);

  const updateInitialMoviesListData = () => {
    updateMoviesListData((draft) => {
      draft.moviesByYear = {
        [DEFAULT_PRIMARY_RELEASE_YEAR]: initialMoviesList.slice(
          0,
          MAX_MOVIES_PER_YEAR
        ),
      };
    });
  };

  const handleGenreFiltersReset = () => {
    searchParams.delete('genre');
    router.replace({ query: searchParams.toString() });
  };

  const handleGenreFiltersChange = ({ isFilterSelected, filterValue }) => {
    let updatedGenreIds =
      filteredGenreIds instanceof Array ? [...filteredGenreIds] : [];

    if (isFilterSelected) {
      updatedGenreIds = updatedGenreIds.filter((fil) => fil !== filterValue);
    } else {
      updatedGenreIds.push(filterValue);
    }

    if (updatedGenreIds.length) {
      searchParams.set('genre', updatedGenreIds);
    } else {
      searchParams.delete('genre');
    }

    router.replace({ query: searchParams.toString() });
  };

  const getMovies = async ({ scrollDirection = 'DOWN' } = {}) => {
    if (fetchMoviesRequestStates.pending || !shouldLoadMoreMovies) return;

    try {
      const newPrimaryReleaseYear =
        scrollDirection === 'DOWN'
          ? latestPrimaryReleaseYear + 1
          : oldestPrimaryReleaseYear - 1;

      fetchMoviesRequestHandlers.pending();

      const payload = {
        primaryReleaseYear: newPrimaryReleaseYear,
        ...defaultApiParams,
      };

      if (filteredGenreIds instanceof Array && filteredGenreIds.length) {
        payload.withGenres = filteredGenreIds.join('|');
      }

      const response = await movieApi.fetchMovies(payload);

      const { results: movies } = response;

      if (scrollDirection === 'DOWN') {
        setPrimaryReleaseYears((val) => [...val, newPrimaryReleaseYear]);
      } else {
        setPrimaryReleaseYears((val) => [newPrimaryReleaseYear, ...val]);
      }

      updateMoviesListData((draft) => {
        draft.moviesByYear = {
          ...draft.moviesByYear,
          [newPrimaryReleaseYear]: movies.slice(0, MAX_MOVIES_PER_YEAR),
        };
      });

      fetchMoviesRequestHandlers.fulfilled(response.data);
    } catch (error) {
      fetchMoviesRequestHandlers.rejected();
    }
  };

  const handleLoadMoreMoviesAfterFailureBtnClick = () => {
    getMovies();
  };

  const handleObserver = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && shouldLoadMoreMovies) {
          getMovies();
          observer.unobserve(entry.target);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [primaryReleaseYears]
  );

  useEffect(() => {
    if (fetchMoviesRequestStates.pending || fetchMoviesRequestStates.rejected)
      return;

    const intersectionObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(
      handleObserver,
      intersectionObserverOptions
    );

    if (loadMoreMoviesRef.current) observer.observe(loadMoreMoviesRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleObserver, fetchMoviesRequestStates.rawState]);

  useEffect(() => {
    updateInitialMoviesListData();
    setPrimaryReleaseYears([DEFAULT_PRIMARY_RELEASE_YEAR]);
    fetchMoviesRequestHandlers.fulfilled(initialMoviesList); // To set nextCursor and update data on filter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredGenreIds]);

  useEffect(() => {
    fetchMoviesRequestHandlers.fulfilled(initialMoviesList); // To set nextCursor and update data on filter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let nodeToRender;
  if (primaryReleaseYears.length) {
    nodeToRender = (
      <Box mb="24px">
        <MoviesList
          moviesByYear={moviesListData.moviesByYear}
          primaryReleaseYears={primaryReleaseYears}
          genresList={genresList}
        />
        {shouldLoadMoreMovies ? (
          <Box ref={loadMoreMoviesRef} mt="24px" p="24px">
            {fetchMoviesRequestStates.pending ? (
              <LabelXSmall textAlign="center">Loading...</LabelXSmall>
            ) : fetchMoviesRequestStates.rejected ? (
              <Button
                fullWidth
                text="Load More Movies"
                onClick={handleLoadMoreMoviesAfterFailureBtnClick}
              />
            ) : null}
          </Box>
        ) : null}
      </Box>
    );
  } else {
    nodeToRender = (
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <TitleXSmall mb="12px" color={theme.colors.TEXT_INVERTED}>
          No movies to show yet!
        </TitleXSmall>
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:site_name" content="WebsiteName" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@TwitterUsername"></meta>
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        <meta name="twitter:url" content={twitterUrl} />
      </Head>
      <AppUIShell>
        <Header>
          {genresList.length ? (
            <Styles.FiltersWrapper mt="12px">
              <Styles.FilterChip
                key="all_genre"
                onClick={handleGenreFiltersReset}
                isSelected={!filteredGenreIds?.length}
              >
                <Styles.FilterText>All</Styles.FilterText>
                <Styles.FilterSelectionIcon
                  isSelected={!filteredGenreIds?.length}
                >
                  {!filteredGenreIds?.length ? <CheckIcon /> : <PlusIcon />}
                </Styles.FilterSelectionIcon>
              </Styles.FilterChip>

              {genresList.map(({ id: filterValue, name: filterLabel }) => {
                const isFilterSelected =
                  filteredGenreIds instanceof Array &&
                  filteredGenreIds.includes(filterValue);

                return (
                  <Styles.FilterChip
                    key={filterValue}
                    onClick={() =>
                      handleGenreFiltersChange({
                        isFilterSelected,
                        filterValue,
                      })
                    }
                    isSelected={isFilterSelected}
                  >
                    <Styles.FilterText>{filterLabel}</Styles.FilterText>
                    <Styles.FilterSelectionIcon isSelected={isFilterSelected}>
                      {isFilterSelected ? <CheckIcon /> : <PlusIcon />}
                    </Styles.FilterSelectionIcon>
                  </Styles.FilterChip>
                );
              })}
            </Styles.FiltersWrapper>
          ) : null}
        </Header>

        <PageContainer mt="24px">{nodeToRender}</PageContainer>
      </AppUIShell>
    </>
  );
};

export default HomePage;
