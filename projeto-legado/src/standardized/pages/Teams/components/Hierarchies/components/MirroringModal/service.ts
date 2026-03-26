import axios from '../../../../../../../services/Axios'
import { HierarchyUser } from '../../../../types'

export const saveMirrorings = async (
  hierarchyId: number,
  nodeUserId: number,
  selected: HierarchyUser[],
) => {
  const payload = {
    mirrorings: selected.map((e) =>
      e.id ? { id: e.id } : { user_id: e.user.id },
    ),
  }

  await axios.put(
    `v1/tr/hierarchies/${hierarchyId}/mirrorings/${nodeUserId}`,
    payload,
  )
}
