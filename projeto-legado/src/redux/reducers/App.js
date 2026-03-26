import AppTypesConstants from "../../constants/AppTypesConstants";

const defaultState = {
    window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
    },
    dimmer: {
        active: false
    },
    tabs: [{
        pathname: "/main/home",
        title: "Home"
    }]
};

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case AppTypesConstants.WINDOW_RESIZE:
            return {
                ...state,
                window: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight
                }
            };

        case AppTypesConstants.DIMMER_TOGGLE:
            alert('redux?');
            return {
                ...state,
                dimmer: {
                    ...state.dimmer,
                    active: !state.dimmer.active
                }
            };

        default:
            return state;
    }
}
