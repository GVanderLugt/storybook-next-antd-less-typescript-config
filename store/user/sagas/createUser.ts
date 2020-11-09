import { all, fork, takeEvery } from 'redux-saga/effects';
import { createUser } from 'store/user';
import client from 'sources/api';
import httpSaga from 'store/util/httpSaga';

const TYPE = createUser.type;

/**
 * @todo Type the incoming action
 */
export function* createUserSaga(action: any) {
  if (action['@@redux-saga/SAGA_ACTION']) return;

  yield httpSaga(TYPE, client.service('users').create(action.payload));
}

export function* watch() {
  yield takeEvery(TYPE, createUserSaga);
}

export default function* root() {
  yield all([fork(watch)]);
}
