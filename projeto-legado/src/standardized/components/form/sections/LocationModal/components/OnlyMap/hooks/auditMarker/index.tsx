import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import moment from 'moment'

import COLORS from '../../../../../../../../../components/GoogleMap/Marker/colors'
import { MarkerInterface } from '../../../../../../../../../components/GoogleMap/interfaces'
import { AuditHistory } from '../../../../../Address/interfaces'

import * as S from './styles'

const useAuditMarker = (props: {
  audit: AuditHistory
  index: number
  active: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}): MarkerInterface => {
  const {
    audit,
    index,
    active: [active, setActive],
  } = props

  const marker: MarkerInterface = {
    lat: audit.lat,
    lng: audit.lng,
    circle: {
      radius: audit.radius,
      options: {
        fillColor: COLORS.YELLOW,
        strokeColor: COLORS.YELLOW,
      },
    },
    draggable: false,
    onClick: () => setActive((prev) => !prev),
    icon: 'user-white-blue',
    infoWindow: {
      active,
      pixelOffset: [-27, -115],
      content: (
        <S.InfoWindowContainer>
          <MwEllipsisContainer children={`Auditoria ${index + 1}`} />
          <MwEllipsisContainer
            children={`Realizada por ${audit.created_by || '-'}`}
          />
          <MwEllipsisContainer
            children={moment(audit.created_at).format('DD/MM/YYYY [às] HH:mm')}
          />
        </S.InfoWindowContainer>
      ),
    },
  }

  return marker
}

export default useAuditMarker
