import { all } from 'redux-saga/effects';

import systemSaga from 'store/system/sagas';
import placeholderSagas from 'store/placeholder/sagas';
import userSagas from 'store/user/sagas';

export default function* rootSaga() {
  yield all([systemSaga(), placeholderSagas(), userSagas()]);
}
