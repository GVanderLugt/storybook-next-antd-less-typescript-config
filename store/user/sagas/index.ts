import { all } from 'redux-saga/effects';

// sagas
import createUser from './createUser';

const userSagas = function* rootSaga() {
  yield all([createUser()]);
};

export default userSagas;
