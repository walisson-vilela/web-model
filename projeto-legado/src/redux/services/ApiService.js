import axios from 'axios';
import { isEmpty } from 'lodash';
import Qs from 'qs';
import { Cookies } from 'react-cookie';
import { STORAGE } from '../../constants/AppTypesConstants';

let hostname = window.location.hostname.split('.');
hostname.shift();

const domain = hostname.join('.');
const cookies = new Cookies();
const user = cookies.get(STORAGE.USER);
const locale = localStorage.getItem('_GIV_LOCALE');
const apiAddress = cookies.get('_GIV_API_ADDRESS') || ('https://apimw.'+domain);

window['domain'] = domain;
window['isNew'] = domain.includes('traderesult');

window.document.title = window['isNew'] ? 'Trade Result' : 'Giv'

if (window['isNew']) {
    const link = document.createElement('link');

    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = '/trade_result.ico';

    document.head.appendChild(link);
}

// API de Produção
axios.defaults.baseURL = window.location.hostname === 'localhost'
? 'https://apimw.sistemagiv.com.br'
: apiAddress;

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Accept-Language'] = locale;

if (!isEmpty(user))
{
    axios.defaults.headers.common['Authorization'] = user.token
        ? `Bearer ${user.token}`
        : '';
}

export function ApiService(options = {}) {
    return axios.request({
        method: 'get',
        paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
        ...options
    });
}

export function ErrorExtract(error) {
    let res = error.response;
    if (!res)
    {
        return {
            code: 404,
            message: 'Verifique a sua conexão com a internet.'
        };
    }
    return res.data.data;
}

export default axios;
