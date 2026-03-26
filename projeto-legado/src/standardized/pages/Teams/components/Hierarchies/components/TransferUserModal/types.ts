import { CardNodeDatum, HierarchyType, NodeType } from '../../../../types'

export type HierarchyUser = Exclude<NodeType['hierarchies_user'], null>

export type TransferUsersProps = {
  close: () => void
  nodeDatum: CardNodeDatum
  hierarchy: HierarchyType
  loadingNodes: () => void
}
