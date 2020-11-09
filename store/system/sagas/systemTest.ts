import { all, put, fork, takeEvery } from 'redux-saga/effects';

import { updateUserName, UpdateUserNamePayload } from '../';

const WATCH_TYPE = updateUserName.type;

export function* updateUserNameSaga(action: UpdateUserNamePayload) {
  yield put({ type: 'action_from_saga', payload: action.payload });
}

export function* watch() {
  yield takeEvery(WATCH_TYPE, updateUserNameSaga);
}

export default function* root() {
  yield all([fork(watch)]);
}
