import Popup from '../../../../../standardized/components/Popup'

import * as Components from './components'
import { LocationDataProps, Rows } from './interfaces'

const LocationPopup = <T extends keyof Rows>(props: LocationDataProps<T>) => {
  const { count } = props
  return (
    <Popup
      on='click'
      position='left center'
      hideOnScroll
      offset={({ placement }) => (placement === 'top-end' ? [10, 0] : [])}
      trigger={
        <Components.Trigger>{count > 0 ? count : '-'}</Components.Trigger>
      }
      content={<Components.Content {...props} />}
      style={{ borderRadius: '7px', padding: 0 }}
    />
  )
}

export default LocationPopup
