import GridSelector from '../../../../../../../../../../../../../components/GridSelector'
import * as Types from '../../interface'

import useLeft from './components/left'
import useRight from './components/right'

type SegmentsProps = {
  selected: [
    Types.Segments[],
    React.Dispatch<React.SetStateAction<Types.Segments[]>>,
  ]
}

const Segments = (props: SegmentsProps) => {
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

export default Segments
