import { isObject } from "lodash";

export const getState = (state, key, defaultState) => {
    if (!isObject(state[key]))
    {
        state[key] = defaultState;
    }
    return {...state[key]};
};

export const setState = (state, key, content) => {
    state[key] = content;
    return {...state};
};