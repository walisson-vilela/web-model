import { useContext } from 'react'

import { EllipsisContainer } from '@mw-kit/mw-manager'
import { MwGrid } from '@mw-kit/mw-ui'

import CollDetails from '../../ColDetails'
import DetailsContext from '../../DetailsProvider'

import * as S from './styled'

const RowId = () => {
  const useDetailsContext = useContext(DetailsContext)
  const { data, display } = useDetailsContext

  const breadCrumbInfo = [data?.segment?.name, ...display.markets].join(' > ')
  return (
    <MwGrid.Row>
      <CollDetails width='4'>
        <strong>ID: </strong> {display.id}
      </CollDetails>

      <CollDetails
        style={{ display: 'flex', flexDirection: 'column' }}
        width='6'
      >
        <S.BoldFlexContainer>
          <EllipsisContainer>{display.name} </EllipsisContainer>
          <div>{display.document}</div>
        </S.BoldFlexContainer>

        {breadCrumbInfo}
      </CollDetails>
    </MwGrid.Row>
  )
}

export default RowId
