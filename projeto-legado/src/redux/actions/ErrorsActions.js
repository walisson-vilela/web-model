import ErrorsConstants from '../../constants/ErrorsConstants';

export const errorsClose = () => {
    return dispatch => {
        dispatch({
            type: ErrorsConstants.ERRORS_CLOSE,
            error: 'close'
        });
    };
};
