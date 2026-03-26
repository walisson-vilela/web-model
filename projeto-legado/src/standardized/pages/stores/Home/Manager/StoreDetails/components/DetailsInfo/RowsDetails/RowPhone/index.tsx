import { useContext } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { notEmptyStringOrDefault } from '../../../../../../../../../utils/formatters'
import CollDetails from '../../ColDetails'
import DetailsContext from '../../DetailsProvider'

const RowPhone = () => {
  const useDetailsContext = useContext(DetailsContext)

  const { display } = useDetailsContext

  const phones = display.phones
    .map((phone) => {
      return notEmptyStringOrDefault(phone.meta.formatted, ' - ')
    })
    .join(' | ')

  return (
    <MwGrid.Row>
      <CollDetails width='4'>
        <strong>Telefone:</strong>
      </CollDetails>

      <CollDetails width='6'>{phones}</CollDetails>
    </MwGrid.Row>
  )
}

export default RowPhone
