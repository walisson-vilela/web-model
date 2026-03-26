import Popup from '../../../../../standardized/components/Popup'
import { BodyInterface } from '../../interfaces'

import BrandList from './components/Brand'

interface IBrandPopup {
  parsedItem: Pick<BodyInterface, 'brand_count' | 'name' | 'id'>
}

const BrandPopup = (props: IBrandPopup) => {
  const { parsedItem } = props
  return (
    <Popup
      on='click'
      position='left center'
      style={{ border: 'none', margin: 0, padding: 0 }}
      offset={[0, 9]}
      trigger={
        <div style={{ cursor: 'pointer', display: 'inline' }}>
          {parsedItem.brand_count.toString().padStart(2, '0')}
        </div>
      }
      disabled={parsedItem.brand_count === 0}
      content={<BrandList name={parsedItem.name} id={parsedItem.id} />}
    />
  )
}

export default BrandPopup
