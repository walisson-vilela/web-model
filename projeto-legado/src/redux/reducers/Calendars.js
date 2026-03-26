import AppTypesConstants from '../../constants/AppTypesConstants';
import CalendarsConstants from "../../constants/CalendarsConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case CalendarsConstants.FETCH_CALENDARS:
            return {...defaultState, isLoading: true};

        case CalendarsConstants.FETCH_CALENDARS_SUCCESS:
            return {...defaultState, result: action.payload};

        case CalendarsConstants.FETCH_CALENDARS_FAILURE:
            return {...defaultState, error: action.payload};

        case CalendarsConstants.GET_CALENDAR:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case CalendarsConstants.PUT_CALENDAR:
        case CalendarsConstants.POST_CALENDAR:
        case CalendarsConstants.DELETE_CALENDAR:
            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        isLoading: true
                    }
                }
            };

        case CalendarsConstants.GET_CALENDAR_SUCCESS:
            //let row = action.payload.data;
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: action.payload
                }
            };

        case CalendarsConstants.PUT_CALENDAR_SUCCESS:
            state.content.result = action.payload;
            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        success: true,
                        result: action.payload
                    }
                }
            };

        case CalendarsConstants.DELETE_CALENDAR_SUCCESS:
            if (action.type === CalendarsConstants.DELETE_CALENDAR_SUCCESS)
            {
                state.result.data = state.result.data.filter((row) => {
                    return row.id !== action.props.id;
                });
            }

            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        success: true,
                        result: action.payload
                    }
                }
            };

        case CalendarsConstants.GET_CALENDAR_FAILURE:
        case CalendarsConstants.PUT_CALENDAR_FAILURE:
        case CalendarsConstants.POST_CALENDAR_FAILURE:
        case CalendarsConstants.DELETE_CALENDAR_FAILURE:
            return {
                ...state,
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        error: true,
                        result: action.payload
                    }
                }
            };

        default:
            return state;
    }
}
