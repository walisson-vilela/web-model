import { isEmpty } from 'lodash';
import { getUserCookies } from '../../utils';
import { CrudService } from '../services/';

export const CrudActions = {
  _get,
  _post,
  _put,
  _delete
};

function _get(url, consts, params, dispatch) {
  return CrudService._get({
    url,
    consts,
    params,
    dispatch
  });
};

function _post(url, consts, data, dispatch) {
  return CrudService._post({
    url,
    consts,
    data,
    dispatch
  });
};

function _put(url, consts, data, dispatch) {
  return CrudService._put({
    url,
    consts,
    data,
    dispatch
  });
};

function _delete(url, consts, data, dispatch) {
  return CrudService._delete({
    url,
    consts,
    data,
    dispatch
  });
};

export function logout() {
  const { LOGOUT_URL = null } = getUserCookies()

  if (isEmpty(LOGOUT_URL)) {
    window.location.href = 'https://traderesult.com.br/';
    return;
  }

  window.location.href = LOGOUT_URL;

}
