import { ModalState } from '../../../../../../components/MwModal'
import { Row } from '../../../../../../components/TableSelector/interfaces'
import { SetState, UseState } from '../../../../../interfaces'
import { Recipients } from '../../interfaces'

export interface SelectRecipientsProps {
  setModal: SetState<ModalState>
  recipientType: 'P' | 'S'
  save: (recipients: Recipients[]) => void
  getData: () => Recipients[]
}

export interface TableInterface {
  editData?: Recipients[]
  recipientType?: 'P' | 'S'
  options: {
    optionsList?: UseState<Row[]>
    optionsChecked?: UseState<Recipients[]>
    insertedList?: UseState<Row[]>
    insertedChecked?: UseState<Recipients[]>
  }
}

export interface RowProps {
  id: number | string | null
  name: string | null
  formatted_address: string | null
}
