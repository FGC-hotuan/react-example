import _ from 'lodash';

import NewsConstant from './constant';

const initialState = {
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
    state = state || initialState;

    switch (action.type) {
        case NewsConstant.ACTION_LOAD_FORM:
            return _.assign(state, {
                data: action.data
            });
        default:
            return state;
    }
}