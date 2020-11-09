import { all, fork, takeEvery } from 'redux-saga/effects';

import { fetchUsers } from 'store/placeholder';
import { userSchema } from 'store/placeholder/schemas';
import client from 'sources/api';
import httpSaga from 'store/util/httpSaga';

const TYPE = fetchUsers.type;

export function* fetchUsersSaga(action: any) {
  if (action['@@redux-saga/SAGA_ACTION']) return;

  yield httpSaga(TYPE, client.service('users').find(), {
    schema: [userSchema],
  });
}

export function* watch() {
  yield takeEvery(TYPE, fetchUsersSaga);
}

export default function* root() {
  yield all([fork(watch)]);
}
