import { FieldErrors } from 'react-hook-form'

import { Countries, Form } from '../../../../../interfaces'

export interface IOccupationPosition {
  country: [Countries, React.Dispatch<React.SetStateAction<Countries>>]
  errors: FieldErrors<Form>['countries'][number]
}
