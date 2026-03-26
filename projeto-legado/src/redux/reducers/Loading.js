import * as types from '../types/LoadingTypes';

const initialState ={
    isLoading: false,
    isError: false

}


export default function(state=initialState, action){
        switch(action.type){
            case types.LOADING_REQUEST:{
                const newState ={ ...state}
                newState.isLoading =true
                newState.done = false;
                return newState;

            }


            case types.LOADING_SUCESS:{
                const newState = {...state};
                newState.isLoading = false;
                newState.done = true;
                newState.isError = false;
                return newState
            }

            case types.LOADING_FAILURE:{
                const newState = {...state};
                newState.isError = true;
                return newState;
            }


            default:{
                return state;
            }

        }

}
