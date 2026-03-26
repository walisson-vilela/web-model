import GridsConstants from '../../constants/GridsConstants';

export const gridsCheck = (key = 'default', value = null, toggle = null) => {
    return dispatch => {
        dispatch({
            type: GridsConstants.GRIDS_CHECK,
            key,
            value,
            toggle,
        });
    };
};

export const gridsRefresh = (key = 'default') => {
    return dispatch => {

        dispatch({
            type: GridsConstants.GRIDS_REFRESH,
            key,
        });
    };
};
