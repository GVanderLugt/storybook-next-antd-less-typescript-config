import { all } from 'redux-saga/effects';

// sagas
import fetchUsers from './fetchUsers';

const placeholderSagas = function* rootSaga() {
  yield all([fetchUsers()]);
};

export default placeholderSagas;
