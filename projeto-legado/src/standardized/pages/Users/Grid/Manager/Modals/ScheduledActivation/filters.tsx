import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../../components/Bullet'
import { contractors, roles } from '../../../../../../../services/options'
import { PERSON_STATUS } from '../../../../labels'

const status: FiltersInterfaces.Filter = {
  label: 'Status',
  name: 'status',
  options: (['AP', 'T'] as const).map((key) => {
    const { label, color } = PERSON_STATUS[key]

    const option: FiltersInterfaces.Option = {
      label: <Bullet content={label} color={color} />,
      value: key,
    }

    return option
  }),
}

const filters: FiltersInterfaces.Filter[] = [
  status,
  {
    label: 'Conta Grupo',
    name: 'route_contractor_id',
    options: contractors,
  },
  {
    label: 'Função',
    name: 'role_id',
    options: roles,
  },
]

export default filters
