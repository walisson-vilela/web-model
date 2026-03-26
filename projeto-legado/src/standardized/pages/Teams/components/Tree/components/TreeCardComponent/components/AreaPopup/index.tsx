import Popup from '../../../../../../../../components/Popup'
import { centeringTransitionDuration } from '../../../../../../constants'
import { usePopupTimeout } from '../../../../functions'

import CardContent from './Content'
import { FunctionProps } from './types'

const AreaPopup: React.FC<FunctionProps> = (props) => {
  const {
    nodeDatum: { attributes },
  } = props

  return (
    <Popup
      on='click'
      position='left center'
      style={{ border: 'none', margin: 0, padding: 0 }}
      offset={[0, 9]}
      trigger={
        <div style={{ cursor: 'pointer', display: 'inline' }}>
          <span>Área: </span>
          <span className='bold'>
            {attributes.hierarchies_user
              ? attributes.hierarchies_user.region_count
              : attributes.region_count}
          </span>
        </div>
      }
      content={<CardContent {...props} />}
      {...usePopupTimeout(centeringTransitionDuration)}
    />
  )
}

export default AreaPopup
