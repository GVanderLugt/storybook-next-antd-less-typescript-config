import { AppState } from 'store';
import { userSchema } from 'store/placeholder/schemas';
import { denormalize } from 'normalizr';

import createDeepEqualSelector from 'store/util/createDeepEqualSelector';

export const getData = (state: AppState) => state.placeholder.data;
export const getResult = (state: AppState) => getData(state)?.result;
export const getDataById = (state: AppState) => getData(state)?.byId;

export const getUsers = createDeepEqualSelector(
  [getResult, getDataById],
  (result, dataById) => {
    return (
      denormalize({ user: result }, { user: [userSchema] }, { user: dataById })
        ?.user || []
    );
  }
);
