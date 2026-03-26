import { MwLoader } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import Modal from '../../../components/MwModal'
import { createRouteTab } from '../../../routes'

import { Hierarchies, TreeCards } from './components'
import Users from './components/Users'
import useTeamsContext, { TeamsProvider } from './context'
import { EmptyMessage, HierarchyBody, HierarchyMain } from './styles'
import type { NodeType } from './types'

export const TreeCardsOrEmpty = ({ nodes }: { nodes: NodeType[] }) => {
  if (nodes.length === 0) {
    return (
      <EmptyMessage>
        No momento ainda não há nenhum Usuário no organograma
      </EmptyMessage>
    )
  }

  return <TreeCards />
}

const Teams = createRouteTab(() => {
  const {
    loading: [loading],
    nodes: [nodes],
    modal: [modal],
  } = useTeamsContext()

  return (
    <HierarchyMain>
      {loading && <MwLoader filled={true} zIndex={10} />}

      <Hierarchies />

      <HierarchyBody>
        <TreeCardsOrEmpty nodes={nodes} />

        <Users />
      </HierarchyBody>

      <Modal modal={modal} />

      <Toaster position='bottom-right' />
    </HierarchyMain>
  )
}, TeamsProvider)

export default Teams
