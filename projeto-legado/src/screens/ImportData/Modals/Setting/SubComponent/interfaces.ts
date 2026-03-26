import { UseState } from '../../../../interfaces'
import { SelectedInterface } from '../interfaces'

export interface SubComponentProps {
  title: string
  value: string
  options: {
    label: string
    value: string | number
  }[]
  selected: UseState<SelectedInterface>
  parentValue: string
  isSubmitted: boolean
}
