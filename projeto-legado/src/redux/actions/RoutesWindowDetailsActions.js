import {CrudActions} from "./AppActions";

export const getRoutesWindowDetails = (params) => {
    return CrudActions._get('v1/routes-window-details', {}, params);
};
