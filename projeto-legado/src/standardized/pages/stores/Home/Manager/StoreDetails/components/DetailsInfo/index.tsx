import { MwGrid } from '@mw-kit/mw-ui'

import * as R from './RowsDetails'

const Details = () => {
  return (
    <MwGrid borderless spacing='0' rows={{ spacing: '0' }}>
      <R.RowId />
      <R.RowAdress />
      <R.RowPhone />
      <R.RowContact />
      <R.RowHistory />
      <R.RowOtherInfo />
    </MwGrid>
  )
}

export default Details
