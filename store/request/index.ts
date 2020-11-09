import _ from 'lodash';
import { PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';

export interface RequestState {
  [index: string]: {
    status: 'loading' | 'success' | 'error';
    message?: string;
  };
}

const initialState: RequestState = {};

/** The type for a request action.payload */
interface RequestPayload {
  requestId: string | number;
  code?: number;
  errors?: object;
  message?: string;
  name?: string;
}

/** The type for the entire action { type, payload } */
export type RequestActionPayload = PayloadAction<RequestPayload>;

const actions = {
  start: (payload: RequestPayload) => {
    const { requestId } = payload;
    return { type: `request/${requestId}/start`, payload };
  },
  success: (payload: RequestPayload) => {
    const { requestId } = payload;
    return { type: `request/${requestId}/success`, payload };
  },
  error: (payload: RequestPayload) => {
    const { requestId } = payload;
    return { type: `request/${requestId}/error`, payload };
  },
  clear: (payload: RequestPayload) => {
    const { requestId } = payload;
    return { type: `request/${requestId}/clear`, payload };
  },
};

const requestReducer = produce(
  (state = initialState, action: RequestActionPayload) => {
    const { requestId, ...restOfPayload } = action.payload || {};

    if (/request\/.*\/start/.test(action.type)) {
      _.set(state, `${requestId}.status`, 'loading');
    } else if (/request\/.*\/success/.test(action.type)) {
      state[requestId] = {
        status: 'success',
        ...restOfPayload,
      };
    } else if (/request\/.*\/error/.test(action.type)) {
      state[requestId] = {
        status: 'error',
        ...restOfPayload,
      };
    } else if (/request\/.*\/clear/.test(action.type)) {
      delete state[requestId];
    }

    return state;
  }
);

export const { start, success, error, clear } = actions;
export default requestReducer;
