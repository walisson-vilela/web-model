import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowCities } from '../../interfaces'

interface ICityRowsProps {
  data: RowCities
}

const CityRow = ({ data }: ICityRowsProps) => {
  return (
    <>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
      <MwEllipsisContainer>{data.state.name}</MwEllipsisContainer>
    </>
  )
}

export default CityRow
