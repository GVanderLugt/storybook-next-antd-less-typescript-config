import { all } from 'redux-saga/effects';

// sagas
import systemTest from './systemTest';

const systemSaga = function* rootSaga() {
  yield all([systemTest()]);
};

export default systemSaga;
