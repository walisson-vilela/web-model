import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { ModalState } from '../../../../../../../components/MwModal'
import Menu from '../../../../../../components/MenuOptions'
import { ManageMenus } from '../../../../../../components/modals'
import { AssociatedUser } from '../../types'

interface IMenuOptions {
  boundRef: HTMLDivElement | null
  e: AssociatedUser
  setModal: (state: ModalState) => void
  viewMode?: boolean
  typeForm: 'conta' | 'agrupamento'
  name: string
  setUserAssociated: React.Dispatch<React.SetStateAction<AssociatedUser[]>>
}

const MenuOptions = (props: IMenuOptions) => {
  const { boundRef, e, setModal, viewMode, setUserAssociated, name, typeForm } =
    props

  const [isMaster] = e.role ? [e.role.master] : [false]

  const onRemove = (id: number) => {
    setUserAssociated((prev) => {
      const index = prev.findIndex((e) => e.person_id === id)
      if (index < 0) {
        console.error('User not found in list')
        return prev
      }

      const newState = [...prev]
      newState.splice(index, 1)
      return newState
    })
  }

  const onUpdatesMenus = (id: number, menus: number[]) => {
    setUserAssociated((prev) => {
      const index = prev.findIndex((e) => e.person_id === id)
      if (index < 0) {
        console.error('User not found in list')
        return prev
      }

      const newState = [...prev]
      newState[index] = { ...newState[index], menu_ids: menus }
      return newState
    })
  }

  return (
    <Menu
      boundRef={boundRef}
      options={[
        {
          label: <MwEllipsisContainer children='Gerenciar Menu' />,
          onClick: () =>
            setModal(
              <ManageMenus
                title={
                  <React.Fragment>
                    {typeForm === 'conta' ? ' Conta' : 'Agrupamento'}:{' '}
                    <b>{name}</b>
                  </React.Fragment>
                }
                onClose={() => setModal(null)}
                loadSelectedMenus={async () => {
                  return [...e.menu_ids]
                }}
                onSubmit={async (ids) => {
                  onUpdatesMenus(e.person_id, ids)
                }}
              />,
            ),

          rules: [() => !e.administrator],
          data: {},
        },

        {
          label: <MwEllipsisContainer children='Remover' />,
          onClick: () => onRemove(e.person_id),
          data: {},
          rules: [
            () => !viewMode,
            () =>
              isMaster
                ? {
                    position: 'left center',
                    content: 'Não é possível remover usuários Master.',
                  }
                : true,
          ],
        },
      ]}
      width='140px'
    />
  )
}

export default MenuOptions
