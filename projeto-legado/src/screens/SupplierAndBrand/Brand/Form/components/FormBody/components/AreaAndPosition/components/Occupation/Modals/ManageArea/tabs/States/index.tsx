import GridSelector from '../../../../../../../../../../../../../../components/GridSelector'
import { TabComponents } from '../../interface'

import useLeft from './components/left'
import useRight from './components/right'

const States: TabComponents['states'] = Object.assign(
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
  }) as TabComponents['states'],
  {
    label: 'Estado',
  },
)

export default States
