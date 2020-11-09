import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'store/rootReducer';
import rootSaga from 'store/rootSaga';

export type AppState = ReturnType<typeof rootReducer>;

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore: MakeStore<AppState> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<AppState>(makeStore, { debug: true });
