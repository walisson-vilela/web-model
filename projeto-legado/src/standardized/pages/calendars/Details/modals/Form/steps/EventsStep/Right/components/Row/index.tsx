import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'

import type { RowComponent } from '../../../../../../../../../../../components/GridSelector/interfaces'
import type { Row } from '../../../types'

import TimeConfig from './components/TimeConfig'
import * as S from './styles'

export const RowLabel: RowComponent<Row> = (props) => {
  const {
    data: { label },
  } = props

  return (
    <S.RowLabel>
      <MwEllipsisContainer>{label}</MwEllipsisContainer>
    </S.RowLabel>
  )
}

export const RowAfter: RowComponent<Row> = (props) => {
  const {
    data: { entire_day },
  } = props

  return (
    <S.RowAfter>
      <div>
        {!entire_day && (
          <MwIcon
            type='feather'
            icon='clock'
            width='20px'
            height='20px'
            color='darkGrey'
          />
        )}
      </div>
      <div>
        <TimeConfig {...props} />
      </div>
    </S.RowAfter>
  )
}
