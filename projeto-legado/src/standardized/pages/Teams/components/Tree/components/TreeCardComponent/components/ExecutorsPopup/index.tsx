import Popup from '../../../../../../../../components/Popup'
import { centeringTransitionDuration } from '../../../../../../constants'
import type { CardNodeDatum } from '../../../../../../types'
import { usePopupTimeout } from '../../../../functions'

import CardContent from './Content'

const ExecutorsPopup = ({ nodeDatum }: { nodeDatum: CardNodeDatum }) => {
  const { attributes } = nodeDatum

  return (
    <Popup
      on='click'
      position='left center'
      offset={[0, 9]}
      trigger={
        <div style={{ cursor: 'pointer', display: 'inline' }}>
          <span>Executores: </span>
          <span className='bold'>{attributes.child_count}</span>
        </div>
      }
      content={<CardContent nodeDatum={nodeDatum} />}
      style={{
        border: 'none',
        margin: 0,
        padding: 0,
        zIndex: 1000,
      }}
      {...usePopupTimeout(centeringTransitionDuration)}
    />
  )
}

export default ExecutorsPopup
