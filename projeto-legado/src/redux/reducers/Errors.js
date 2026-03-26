const defaultState = {
    open: false,
    result: {}
};

export default function reducer(state = defaultState, action) {
    switch (action.error)
    {
        case 'open':
            return {...defaultState, open:true, result: action.payload};

        case 'close':
            return defaultState;

        default:
            return state;
    }
}