import { combineReducers } from 'redux';

// Import custom components
import authReducer from './authReducer';
import crudReducer from './crudReducer';
import apiReducer from './apiReducer';
import flashMessageReducer from './flashMessageReducer';
import newsReducer from '../app/news/meta/reducer';
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
    auth: authReducer,
    crud: crudReducer,
    api: apiReducer,
    form: formReducer,
    toastr: toastrReducer,
    flash: flashMessageReducer,
    news: newsReducer
});

export default rootReducer;