import { NodeType } from './types'

export const getMirroringSubtitle = (
  structure: NodeType['structure'],
  hierarchiesUser: NodeType['hierarchies_user'],
): string => {
  const parts = [
    structure.level_label,
    ...(structure.name ? [structure.name] : []),
    ...(hierarchiesUser ? [hierarchiesUser.user.name] : []),
  ]

  return parts.join(' | ')
}
