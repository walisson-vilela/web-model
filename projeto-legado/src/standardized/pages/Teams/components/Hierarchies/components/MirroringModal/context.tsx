import React, { useCallback, useEffect, useState } from 'react'

import { HierarchyUser } from '../../../../types'
import { getMirroringUsers } from '../MirroringPopup/service'
import { MirroringPopupProps } from '../MirroringPopup/types'

type MirroringModalProps = MirroringPopupProps & {
  onClose: () => void
  reload: () => void
}

type ContextType = MirroringModalProps & {
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  selected: [
    HierarchyUser[],
    React.Dispatch<React.SetStateAction<HierarchyUser[]>>,
  ]
  originals: [
    HierarchyUser[],
    React.Dispatch<React.SetStateAction<HierarchyUser[]>>,
  ]
}

const MirroringModalContext = React.createContext<ContextType>({
  hierarchyId: 0,
  structure: {
    id: 0,
    level: 0,
    level_label: '',
    name: null,
  },
  hierarchiesUser: {
    manual: false,
    manual_label: '',
    region_count: 0,
    mirroring_count: 0,
    approval_count: 0,
    user: {
      id: 0,
      name: '',
      role: {
        id: 0,
        name: '',
      },
      avatar: null,
    },
  },
  loading: [true, () => {}],
  selected: [[], () => {}],
  originals: [[], () => {}],
  onClose: () => {},
  reload: () => {},
})

export const MirroringModalProvider = ({
  children,
  ...props
}: React.PropsWithChildren<MirroringModalProps>) => {
  const { hierarchyId, hierarchiesUser } = props

  const [selected, setSelected] = useState<HierarchyUser[]>([])
  const [originals, setOriginals] = useState<HierarchyUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onLoad = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await getMirroringUsers(
        hierarchyId,
        hierarchiesUser.user.id,
        1,
      )

      setOriginals([...data])
      setSelected([...data])
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [hierarchyId, hierarchiesUser.user.id, setSelected])

  useEffect(() => {
    onLoad()
  }, [onLoad])

  return (
    <MirroringModalContext.Provider
      value={{
        ...props,
        selected: [selected, setSelected],
        originals: [originals, setOriginals],
        loading: [loading, setLoading],
      }}
      children={children}
    />
  )
}

const useMirroringModalContext = () => React.useContext(MirroringModalContext)

export default useMirroringModalContext
