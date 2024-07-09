export const REQUEST_STATES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

export const MAX_MOVIES_PER_YEAR = 20;
export const DEFAULT_SORT_BY = 'popularity.desc';
export const DEFAULT_VOTE_COUNT_GREATER_THAN = 100;
export const DEFAULT_PRIMARY_RELEASE_YEAR = 2012;
export const defaultApiParams = {
  sortBy: DEFAULT_SORT_BY,
  voteCountGte: DEFAULT_VOTE_COUNT_GREATER_THAN,
};
