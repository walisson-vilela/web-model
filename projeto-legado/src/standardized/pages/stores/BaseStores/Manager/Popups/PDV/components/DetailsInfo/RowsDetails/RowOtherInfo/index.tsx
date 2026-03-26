import { useContext } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { notEmptyStringOrDefault } from '../../../../../../../../../../utils/formatters'
import CollDetails from '../../ColDetails'
import DetailsContext from '../../DetailsProvider'

const RowOtherInfo = () => {
  const useDetailsContext = useContext(DetailsContext)
  const { display } = useDetailsContext

  const { classification } = display.otherInfo

  const otherInfo = [
    `Classificação: ${notEmptyStringOrDefault(classification, ' - ')}`,
  ].join(' | ')

  return (
    <MwGrid.Row>
      <CollDetails width='4'>
        <strong>Outras informações:</strong>
      </CollDetails>
      <CollDetails width='6'>{otherInfo} </CollDetails>
    </MwGrid.Row>
  )
}

export default RowOtherInfo
