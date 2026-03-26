import AppTypesConstants from "../../constants/AppTypesConstants";
import TasksConstants from "../../constants/TasksConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case TasksConstants.FETCH_TASKS:
            return {...defaultState, isLoading: true};

        case TasksConstants.FETCH_TASKS_SUCCESS:
            return {...defaultState, result: action.payload};

        case TasksConstants.FETCH_TASKS_FAILURE:
            return {...defaultState, error: action.payload};

        case TasksConstants.GET_TASK:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case TasksConstants.PUT_TASK:
        case TasksConstants.POST_TASK:
        case TasksConstants.DELETE_TASK:
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

        case TasksConstants.GET_TASK_SUCCESS:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: action.payload
                }
            };

        case TasksConstants.PUT_TASK_SUCCESS:
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

        case TasksConstants.DELETE_TASK_SUCCESS:
            if (action.type === TasksConstants.DELETE_TASK_SUCCESS)
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

        case TasksConstants.GET_TASK_FAILURE:
        case TasksConstants.PUT_TASK_FAILURE:
        case TasksConstants.POST_TASK_FAILURE:
        case TasksConstants.DELETE_TASK_FAILURE:
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