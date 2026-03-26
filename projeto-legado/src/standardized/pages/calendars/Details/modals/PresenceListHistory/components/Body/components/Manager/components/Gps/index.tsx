import Popup from '../../../../../../../../../../../components/Popup'

import { ContentPopup } from './components/ContentPopup'

export const GpsPopup = () => {
  return (
    <div>
      <Popup
        on='click'
        position='left center'
        trigger={<span style={{ cursor: 'pointer' }}>10</span>}
        content={<ContentPopup />}
        style={{
          padding: '0px',
        }}
      />
    </div>
  )
}
