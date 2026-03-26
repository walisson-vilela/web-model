import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { cepFormatter } from '../../../../../../../../../standardized/utils/formatters'
import { StoreProps } from '../../../interface'

const Row: RowComponent<StoreProps> = (props, disabled: boolean) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>
        {data.stores_contractor.nickname}
      </MwEllipsisContainer>
      <MwEllipsisContainer>
        {data.address.formatted} - {cepFormatter(data.address.postal_code)}
      </MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
