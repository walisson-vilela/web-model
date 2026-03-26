import { useContext } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import CollDetails from '../../ColDetails'
import DetailsContext from '../../DetailsProvider'

const RowAdress = () => {
  const useDetailsContext = useContext(DetailsContext)
  const { display } = useDetailsContext
  return (
    <MwGrid.Row>
      <CollDetails width='4'>
        <strong>Endereço:</strong>
      </CollDetails>

      <CollDetails width='7'>
        {display.address &&
          `${display.address.formatted} - Cep: ${display.address.postal_code}`}
      </CollDetails>
    </MwGrid.Row>
  )
}

export default RowAdress
