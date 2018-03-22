import axios from 'axios';
import _ from 'lodash';

import {getToken} from "../utils/actionUtil";


import AppConstant from '../constants/app';
import {logout} from "./authService";


export default class ApiService {
    static get(path, params, options = {}) {
        options.method = 'get';
        options.url = path;
        options.params = params;

        return this.request(options);
    }

    static post(path, data, options = {}) {
        options.method = 'post';
        options.url = path;
        options.data = data;

        return this.request(options);
    }

    static put(path, data, options = {}) {
        options.method = 'put';
        options.url = path;
        options.data = data;

        return this.request(options);
    }

    static delete(path, params, options = {}) {
        options.method = 'delete';
        options.url = path;
        options.params = params;

        return this.request(options);
    }

    static request(requestConfig) {
        const defaultConfig = {
            //url: '/user',
            //method: 'get',
            baseURL: AppConstant.API_URL,
            // transformRequest: [function (data, headers) {
            //     return data;
            // }],
            // transformResponse: [function (data) {
            //     return data;
            // }],
            headers: {'Authorization': 'Bearer' + ' ' + getToken()},
            // headers: {'X-Requested-With': 'XMLHttpRequest'},
            // params: {
            //     ID: 12345
            // },
            // data: {
            //     firstName: 'Fred'
            // },
            // timeout: 1000,
            responseType: 'json',
        };

        return axios(_.merge(defaultConfig, requestConfig))
            .catch((error) => {
                console.log('error');
                if (error.response.status === 401) { //
                    console.log('logout');
                    logout();
                }
            });
    }
};

