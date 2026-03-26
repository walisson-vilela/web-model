import React, { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import type { ModalState } from '../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import type { RouteTabProvider } from '../../../routes/types'

import { ResetDecisionsModal } from './components/ResetDecisionsModal'
import useUserQueues from './components/Users/hooks'
import { deleteHierarchiesApprovals, getNodes } from './services'
import type { HierarchyType, NodeType } from './types'

type Context = {
  hierarchy: [
    null | HierarchyType,
    React.Dispatch<React.SetStateAction<null | HierarchyType>>,
  ]
  nodes: [NodeType[], React.Dispatch<React.SetStateAction<NodeType[]>>]

  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  lastLevel: number
  transferUserModal: [
    null | ModalState,
    React.Dispatch<React.SetStateAction<null | ModalState>>,
  ]
  loadingNodes: () => void

  modal: [ModalState, React.Dispatch<React.SetStateAction<ModalState>>]
  byUser: boolean
  resetDecisions: (
    params: { hierarchy_element_id: number } | { user_ids: number[] },
  ) => Promise<void>
} & ReturnType<typeof useUserQueues>

const TeamsContext = React.createContext<Context>({} as Context)

export const DefaultTeamsProvider = ({
  children,
  byUser,
}: React.PropsWithChildren<{ byUser?: boolean }>) => {
  const [hierarchy, setHierarchy] = useState<HierarchyType | null>(null)
  const [nodes, setNodes] = useState<NodeType[]>([])
  const [lastLevel, setLastLevel] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const [modal, setModal] = useState<ModalState>(null)

  const [transferUserModal, setTransferUserModal] = useState<ModalState | null>(
    null,
  )
  const [confirmResetDecisions, setConfirmResetDecisions] =
    useState<boolean>(true)

  const userQueues = useUserQueues(hierarchy?.id)
  const { reloadUserQueues } = userQueues

  const loadingNodes = useCallback(async () => {
    if (!hierarchy?.id) return

    setLoading(true)

    try {
      const response = await getNodes({
        hierarchy_id: hierarchy.id,
        by_user: byUser,
      })
      setNodes([...response.nodes])
      setLastLevel(response.last_level)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [hierarchy?.id, byUser])

  useEffect(() => {
    loadingNodes()
  }, [loadingNodes])

  const reload = useCallback(() => {
    loadingNodes()
    reloadUserQueues()
  }, [loadingNodes, reloadUserQueues])

  const resetDecisions: Context['resetDecisions'] = useCallback(
    async (params) => {
      if (!hierarchy) return

      const onSubmit = async (confirmResetDecisions: boolean) => {
        setConfirmResetDecisions(confirmResetDecisions)
        await deleteHierarchiesApprovals(hierarchy.id, params)
      }

      if (!confirmResetDecisions) {
        setLoading(true)

        try {
          await onSubmit(confirmResetDecisions)
          toast(<ToasterContent color='normal' />, SuccessStyle)
          loadingNodes()
        } catch (error) {
          toast(<ToasterContent color='error' />, ErrorStyle)
          console.error(error)
          setLoading(false)
        }

        return
      }

      setModal(
        <ResetDecisionsModal
          reload={loadingNodes}
          close={() => setModal(null)}
          onSubmit={onSubmit}
        />,
      )
    },
    [hierarchy, confirmResetDecisions, loadingNodes],
  )

  return (
    <TeamsContext.Provider
      value={{
        lastLevel: lastLevel,
        hierarchy: [hierarchy, setHierarchy],
        nodes: [nodes, setNodes],
        loading: [loading, setLoading],
        transferUserModal: [transferUserModal, setTransferUserModal],
        loadingNodes: reload,
        modal: [modal, setModal],
        byUser: byUser || false,
        resetDecisions,
        ...userQueues,
      }}
    >
      {children}
    </TeamsContext.Provider>
  )
}

export const TeamsProvider: RouteTabProvider = ({ children }) => {
  return <DefaultTeamsProvider>{children}</DefaultTeamsProvider>
}

const useTeamsContext = () => React.useContext(TeamsContext)

export default useTeamsContext
