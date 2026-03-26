import React from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import { formatInterval } from '../../../../../../functions'
import type { Card } from '../../../../types'

import { DateContainer } from './styles'

export const DateField = ({
  data,
  showChildData: [showChildData, setShowChildData],
}: {
  data: Card
  showChildData: [boolean, (newState: boolean) => void]
}) => {
  if (data.children.length > 0) {
    return (
      <React.Fragment>
        <div>
          <span>Próxima Data:</span>
          <DateContainer onClick={() => setShowChildData(!showChildData)}>
            <span>
              {formatInterval(
                data.starts_at.toString(),
                data.ends_at.toString(),
              )}
            </span>
            <MwIcon
              type='semantic'
              icon={showChildData ? 'caret down' : 'caret right'}
              width='14px'
              height='14px'
              color='silver'
            />
          </DateContainer>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div>
      <span>Data:</span>
      <span>
        {formatInterval(data.starts_at.toString(), data.ends_at.toString())}
      </span>
    </div>
  )
}
