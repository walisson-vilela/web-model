import { ProfilesConstants, UsersConstants } from '../../constants';
import AppTypesConstants, { STORAGE } from '../../constants/AppTypesConstants';

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case UsersConstants.USER_LOGIN:
            return {
                ...defaultState,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case UsersConstants.USER_LOGIN_CLEAR:
            return defaultState;

        case UsersConstants.USER_LOGIN_SUCCESS:

            if(action.content.keep){
                localStorage.setItem(STORAGE.LOGIN, JSON.stringify({
                    username: action.content.username,
                    account: action.content.account
                }));
            }else{
                localStorage.removeItem(STORAGE.LOGIN);
            }

            //sessionStorage.setItem(STORAGE.USER, JSON.stringify(action.payload.data));

            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: action.payload
                }
            };

        case UsersConstants.USER_LOGIN_FAILURE:
            return {
                ...defaultState,
                content: {
                    ...defaultState.content,
                    error: action.payload
                }
            };

        case ProfilesConstants.USER_PROFILE:
            return {...state, results: {...defaultState.results, isLoading: true}};

        case ProfilesConstants.USER_PROFILE_FAILURE:
        case ProfilesConstants.USER_PROFILE_SUCCESS:
            //return {...state, results: {...defaultState.results, ...action.payload}};
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: action.payload
                }
            };

        default:
            return state;
    }
}
