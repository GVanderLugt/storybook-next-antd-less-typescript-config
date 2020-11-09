import _ from 'lodash';
import { PayloadAction } from '@reduxjs/toolkit';
import normalizedCallbacks from 'store/util/normalizedCallbacks';

export interface NormalizedReducerCallback {
  (
    state: any,
    action: NormalizedPayloadAction,
    options?: HttpReducerOptions
  ): void;
}

export interface HttpReducerOptions {
  appendResult?: boolean;
  callback?: 'merge' | NormalizedReducerCallback;
  entity?: string;
  result?: string;
  updateResult?: boolean;
}

export interface NormalizedPayload {
  entities: object;
  entity: string;
  normalized: boolean;
  result: string[] | number[];
}

export type NormalizedPayloadAction = PayloadAction<NormalizedPayload>;

/** @todo Figure out how to get the `void` to default correctly */
declare type HttpPayloadAction<P = void> = PayloadAction<P>;

/**
 * Factory method to create an httpReducer using given options.
 *
 * @param options
 */
export function createHttpReducer<P>(options?: HttpReducerOptions) {
  return (state: any, action: PayloadAction<P>) => {
    httpReducer(state, action, options);
  };
}

/**
 * A reducer to handle processing an HTTP response action and payload -- will only
 * mutate the state if the action was dispatched from a saga.
 *
 * @param state
 * @param action
 * @param options
 */
export default function httpReducer(
  state: any,
  action: any,
  options?: HttpReducerOptions
) {
  if (!action['@@redux-saga/SAGA_ACTION']) return;

  const isNormalized = _.get(action, 'payload.normalized', false);

  // If the response payload is not normalized, set it to `state.data`.
  if (!isNormalized) {
    state.data = action.payload;
    return;
  }

  const updateResult = _.get(options, 'updateResult', true);
  const appendResult = _.get(options, 'appendResult', false);
  const resultKey = _.get(options, 'result', 'result');
  const incomingResult = action.payload?.result;
  const currentResult = _.get(state, ['data', resultKey], []);

  if (updateResult && appendResult) {
    _.set(state, ['data', resultKey], _.concat(currentResult, incomingResult));
  } else if (updateResult && !appendResult) {
    _.set(state, ['data', resultKey], incomingResult);
  }

  let callback = _.get(options, 'callback', 'merge');
  if (!_.isFunction(callback)) {
    callback = normalizedCallbacks[callback];
  }

  callback(state, action, options);
}
