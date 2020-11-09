import { AppState } from 'store';
import { createSelector } from 'reselect';

export const getRequest = (state: AppState, requestId: string | number) =>
  state.request[requestId];

export const getStatus = (state: AppState, requestId: string | number) =>
  getRequest(state, requestId)?.status;

export const getMessage = (state: AppState, requestId: string | number) =>
  getRequest(state, requestId)?.message;

export const getIsLoading = createSelector(
  [getStatus],
  (status) => status === 'loading'
);

export const getHasError = createSelector(
  [getStatus],
  (status) => status === 'error'
);
