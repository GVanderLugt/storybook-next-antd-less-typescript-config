import _ from 'lodash';
import {
  HttpReducerOptions,
  NormalizedPayloadAction,
} from 'store/util/httpReducer';

export default {
  merge: function (
    state: any,
    action: NormalizedPayloadAction,
    options?: HttpReducerOptions
  ) {
    // Get the normalizr entity from `options` or default to the original schema from `action.payload.entity`
    const entity = _.get(options, 'entity', action.payload?.entity);

    // Get the incoming data for the entity off `action.payload.entities`
    const incomingDataById = _.get(action, `payload.entities.${entity}`, {});

    // Get the current data by id off `state.data.byId`
    const currentDataById = _.get(state, 'data.byId', {});

    // Merge the current data with the incoming data
    const newDataById = _.merge(currentDataById, incomingDataById);

    // Set the new `state.data.byId`
    _.set(state, 'data.byId', newDataById);
  },
};
