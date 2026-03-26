import HierarchiesTreeConstants from '../../constants/HierarchiesTreeConstants'
import { CrudService } from '../services/'

export const fetchHierarchiesTree = (params) => (dispatch) => {
  return CrudService._get({
    url: 'v1/tr/hierarchies/tree',
    consts: {
      start: HierarchiesTreeConstants.FETCH_HIERARCHIES_TREE,
      success: HierarchiesTreeConstants.FETCH_HIERARCHIES_TREE_SUCCESS,
      failure: HierarchiesTreeConstants.FETCH_HIERARCHIES_TREE_FAILURE,
    },
    params,
    dispatch,
  })
}

export default {
  fetchHierarchiesTree,
}
