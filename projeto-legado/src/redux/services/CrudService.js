import { isObject } from 'lodash';
import { ApiService, ErrorExtract } from './ApiService';

export const CrudService = {
    _get,
    _post,
    _put,
    _patch,
    _delete
};

function _get(options = {}) {
    return _execute({
        url: options.url,
        method: 'get',
        params: options.params,
        props: isObject(options.props) ? options.props : {}
    }, options.dispatch, options.consts)
}

function _post(options = {}) {
    return _execute({
        url: options.url,
        method: 'post',
        data: options.data,
        params: options.params || {},
        props: isObject(options.props) ? options.props : {}
    }, options.dispatch, options.consts)
}

function _put(options = {}) {
    return _execute({
        url: options.url,
        method: 'put',
        data: options.data,
        props: isObject(options.props) ? options.props : {}
    }, options.dispatch, options.consts)
}

function _patch(options = {}) {
    return _execute({
        url: options.url,
        method: 'patch',
        data: options.data,
        props: isObject(options.props) ? options.props : {}
    }, options.dispatch, options.consts)
}

function _delete(options = {}) {
    return _execute({
        url: options.url,
        method: 'delete',
        data: options.data,
        props: isObject(options.props) ? options.props : {}
    }, options.dispatch, options.consts)
}

function _execute(options, dispatch, consts) {
    return new Promise(function (resolve, reject) {
        if (consts.start)
        {
            dispatch({
                type: consts.start,
                props: options.props,
            });
        }

        ApiService(options)
            .then(({data}) => {
                if (consts.success)
                {
                    dispatch({
                        type: consts.success,
                        payload: data,
                        //content: isObject(options.data) ? options.data : {},
                        props: options.props,
                    });
                }
                resolve(data);
            }).catch(error => {
            let payload = ErrorExtract(error);
            if (consts.failure)
            {
                dispatch({
                    type: consts.failure,
                    error: 'open',
                    props: options.props,
                    payload
                });
            }
            reject(payload);
        });
    });
}
