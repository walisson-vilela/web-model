import Popup from '../../../../../../../../../components/Popup'
import type { Card } from '../../../../types'

import { InpactedUsersPopupContent } from './components/content'

export const InpactedUsersPopup = ({
  subordinateCount,
  userCount,
  data,
}: {
  subordinateCount: string
  userCount: string
  data: Card
}) => {
  return (
    <Popup
      style={{ border: 'none', margin: 0, padding: 0 }}
      offset={[0, 9]}
      on={'click'}
      position={'right center'}
      content={<InpactedUsersPopupContent data={data} />}
      trigger={
        <span style={{ cursor: 'Pointer' }}>
          Usuários Impactados: {subordinateCount}/{userCount}
        </span>
      }
    />
  )
}
