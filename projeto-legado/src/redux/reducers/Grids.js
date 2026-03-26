import { indexOf, isArray } from 'lodash';
import GridsConstants from "../../constants/GridsConstants";

const defaultState = {};

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case GridsConstants.GRIDS_CHECK:

            if (typeof action.toggle === 'boolean')
            {
                return {...state, [action.key]: action.value};
            }

            let checked = isArray(state[action.key]) ? state[action.key] : [];
            let index = indexOf(checked, action.value);


            if (index > -1)
            {
                checked.splice(index, 1);
            } else
            {
                checked.push(action.value);
            }

           return {...state, [action.key]: checked};

        case GridsConstants.GRIDS_REFRESH:
            return {...state, [action.key]: []};

        default:
            return state;
    }
}
