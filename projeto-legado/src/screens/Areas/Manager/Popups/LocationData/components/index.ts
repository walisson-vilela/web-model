import { Rows } from '../interfaces'

import RowCity from './City'
import RowState from './State'
import RowSublocality from './Sublocality'

export { default as Content } from './Content'
export { default as Trigger } from './Trigger'

export const RowsComponents: {
  [k in keyof Rows]: React.FunctionComponent<{ data: Rows[k] }>
} = {
  cities: RowCity,
  states: RowState,
  sublocalities: RowSublocality,
}
