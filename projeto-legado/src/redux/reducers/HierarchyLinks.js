import AppTypesConstants from '../../constants/AppTypesConstants';
import HierarchyLinksConstants from "../../constants/HierarchyLinksConstants";

const defaultState = AppTypesConstants.defaultState;

export default function reducer(state = defaultState, action) {
    switch (action.type)
    {
        case HierarchyLinksConstants.FETCH_HIERARCHY_LINKS:
            return {...defaultState, isLoading: true};

        case HierarchyLinksConstants.FETCH_HIERARCHY_LINKS_SUCCESS:
            return {...defaultState, result: action.payload};

        case HierarchyLinksConstants.FETCH_HIERARCHY_LINKS_FAILURE:
            return {...defaultState, error: action.payload};

        case HierarchyLinksConstants.GET_HIERARCHY_LINK:
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    isLoading: true
                }
            };

        case HierarchyLinksConstants.PUT_HIERARCHY_LINK:
        case HierarchyLinksConstants.POST_HIERARCHY_LINK:
        case HierarchyLinksConstants.DELETE_HIERARCHY_LINK:
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

        case HierarchyLinksConstants.GET_HIERARCHY_LINK_SUCCESS:
            let row = action.payload.data;
            return {
                ...state,
                content: {
                    ...defaultState.content,
                    result: {
                        id: row.id,
                        name: row.name,
                        status: row.status,
                        type: row.type
                    }
                }
            };

        case HierarchyLinksConstants.POST_HIERARCHY_LINK_SUCCESS:
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

        case HierarchyLinksConstants.DELETE_HIERARCHY_LINK_SUCCESS:
            return {
                ...state,
                result: {
                    ...state.result,
                    data: state.result.data.filter((row) => {
                        return row.id !== action.content.id
                    })
                },
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        success: true,
                        result: action.payload
                    }
                }
            };

        case HierarchyLinksConstants.PUT_HIERARCHY_LINK_SUCCESS:
            return {
                ...state,
                result: {
                    ...state.result,
                    data: state.result.data.map((row) => {
                        return row.id === action.content.id ? {...row, name:action.content.name} : row
                    })
                },
                content: {
                    ...state.content,
                    save: {
                        ...defaultState.save,
                        success: true,
                        result: action.payload
                    }
                }
            };

        case HierarchyLinksConstants.GET_HIERARCHY_LINK_FAILURE:
        case HierarchyLinksConstants.PUT_HIERARCHY_LINK_FAILURE:
        case HierarchyLinksConstants.POST_HIERARCHY_LINK_FAILURE:
        case HierarchyLinksConstants.DELETE_HIERARCHY_LINK_FAILURE:
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
