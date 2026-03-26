import * as types from '../types/LoadingTypes'

export function loadingRequest(){
  return{
      type: types.LOADING_REQUEST
  }
}

export function loadingSucess(){
    return{
        type: types.LOADING_SUCESS
    }
}

export function loadingFailure(){
    return{
        type: types.LOADING_FAILURE
    }
}
