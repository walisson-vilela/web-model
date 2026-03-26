import { UseFormReturn } from 'react-hook-form'

import { DataInterface } from '../../../manager/interface'
import { selectedForm } from '../../create/components/content/components/forms'
import { CreateSurveyFormData } from '../../create/interface'

import { RelationProps } from './SelectComponent/interface'

type TabsNames = 'Área de Atuação' | 'Estados' | 'Cidade' | 'Bairro'

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
  methods?: UseFormReturn<CreateSurveyFormData>
  reload?: () => void
}
