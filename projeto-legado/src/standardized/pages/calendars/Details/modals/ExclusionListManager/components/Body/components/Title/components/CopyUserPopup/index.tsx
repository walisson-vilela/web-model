import Popup from '../../../../../../../../../../../components/Popup'
import { Link } from '../../../../../../../../styles'

import { Component } from './components/content'

export const CopyUserPopup = () => {
  return (
    <Popup
      on='click'
      position='left center'
      style={{ border: 'none', margin: 0, padding: '14' }}
      offset={[0, 9]}
      trigger={<Link>Associar Usuários por Cópia</Link>}
      content={<Component />}
    />
  )
}
