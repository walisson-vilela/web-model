import GridSelector from '../../../../../../../../../../../../../components/GridSelector'
import * as Types from '../../interface'

import useLeft from './components/left'
import useRight from './components/right'

type FlagsProps = {
  selected: [Types.Flags[], React.Dispatch<React.SetStateAction<Types.Flags[]>>]
}

const Flags = (props: FlagsProps) => {
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
}

export default Flags
