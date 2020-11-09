import _ from 'lodash';
import { put, delay } from 'redux-saga/effects';

// action creators
import { start, success, error, clear } from 'store/request';

import constructResponsePayload from 'store/util/constructResponsePayload';

interface HttpSagaOptions {
  requestId?: string | number;
  throwError?: boolean;
  schema?: any;
  clearTimeout?: number;
}

/**
 * A reusable saga to process HTTP requests and responses and handle side effects.
 *
 * @param type The action type for the triggering request.
 * @param request A promise
 * @param options `options.requestId` - custom identifier used in request action side effects (defaults to given `type`).
 *   `options.throwError` - determines if an error should be thrown for the parent saga to handle. Defaults to `false`.
 *   `options.schema` - normalizr schema to use to normalize response payload.
 *   `options.clearTimeout` - timeout to use before clearing request state, if undefined state will not be cleared.
 */
export default function* httpSaga(
  type: string,
  request: Promise<any>,
  options?: HttpSagaOptions
) {
  const requestId = _.get(options, 'requestId', type);
  const throwError = _.get(options, 'throwError', false);
  const schema = _.get(options, 'schema');
  const clearTimeout = _.get(options, 'clearTimeout', false);

  yield put(start({ requestId }));

  try {
    const response = yield request;

    yield put(success({ requestId }));

    yield put({
      type,
      payload: constructResponsePayload(response, schema),
    });
  } catch (err) {
    const { code, errors, message, name } = err;

    yield put(error({ requestId, code, errors, message, name }));

    if (throwError) {
      // Throw the error to be handled by the parent saga
      throw err;
    }
  } finally {
    if (clearTimeout) {
      yield delay(clearTimeout);
      yield put(clear({ requestId }));
    }
  }
}
