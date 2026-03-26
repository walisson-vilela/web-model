import GridSelector from '../../../../../../../components/GridSelector'
import { TabComponents } from '../../interface'

import useLeft from './components/left'
import useRight from './components/right'

const Cities: TabComponents['cities'] = Object.assign(
  ((props) => {
    const {
      selected: [selected, setSelected],
    } = props

    return (
      <GridSelector.Container
        selected={[selected, setSelected]}
        left={useLeft}
        right={useRight}
      />
    )
  }) as TabComponents['cities'],
  {
    label: 'Cidade',
  },
)

export default Cities
