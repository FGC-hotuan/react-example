import _ from 'lodash';

import ProductConstant from './constant';

const initialState = {
    isRequesting: false,
    numberOfRequests: 0
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
    state = state || initialState;
    let newState;

    switch (action.type) {
        case ProductConstant.ACTION_ADD_PRODUCT:
            newState = _.cloneDeep(state);
            // change newState
            return newState;
        default:
            return state;
    }
}