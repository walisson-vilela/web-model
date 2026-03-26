import { NodeType } from '../../../../types'

export type MirroringPopupProps = {
  hierarchyId: number
  structure: NodeType['structure']
  hierarchiesUser: Exclude<NodeType['hierarchies_user'], null>
}
