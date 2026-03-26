import { useContext } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import CollDetails from '../../ColDetails'
import DetailsContext from '../../DetailsProvider'

const RowPhone = () => {
  const useDetailsContext = useContext(DetailsContext)
  const { display } = useDetailsContext

  return (
    <MwGrid.Row>
      <CollDetails width='4'>
        <strong>Contato PDV:</strong>
      </CollDetails>
      <CollDetails width='6'>{display.contact}</CollDetails>
    </MwGrid.Row>
  )
}

export default RowPhone
