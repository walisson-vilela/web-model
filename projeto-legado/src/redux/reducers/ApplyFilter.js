import * as types from '../types/ApplyFilter';

const initialState ={
    count: 0,
    data: []

}


export default function(state= initialState, action){
    switch(action.type){
        case types.ADD_APPLY_FILTER_REQUEST:{
            const newState = { ...state};
            if(newState.count >= 1 ){
                return state;
            }
            newState.count = newState.count + 1;
            newState.data.push(action.payload);
            return newState;

        }

        case types.REMOVE_ALL_FILTERS:{
            const newState = {...state};
            newState.count = 0;
            newState.data = []
            return newState;
        }

        case types.REMOVE_FILTER:{
            const newState = {...state}
            if(newState <0){
                return state
            }
            newState.count = newState.count -1;
            return newState;
        }

        default:{
            return  state;
        }
    }
}
