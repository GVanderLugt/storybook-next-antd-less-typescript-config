import { combineReducers } from 'redux';

// reducers
import system from 'store/system';
import placeholder from 'store/placeholder';
import request from 'store/request';

const reducers = {
  placeholder,
  request,
  system,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
