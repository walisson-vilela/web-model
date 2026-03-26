import React from 'react'

import { DataInterface } from '../../../manager/interface'
import { selectedForm } from '../../create/components/content/components/forms'

import { RelationProps } from './SelectComponent/interface'

type TabsNames = 'PDV' | 'Grupo' | 'Rede' | 'Bandeira'

export type AddedItemProps = {
  [name in TabsNames]: {
    items?: RelationProps[]
  }
}

export interface ModalProps {
  edit?: boolean
  item?: DataInterface
  createSelected?: AddedItemProps
  creteSetSelected?: React.Dispatch<React.SetStateAction<selectedForm>>
  reload?: () => void
}
