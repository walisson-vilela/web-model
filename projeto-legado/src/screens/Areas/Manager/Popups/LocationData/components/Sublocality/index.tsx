import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowSublocalities } from '../../interfaces'

interface ISublocalityRowsProps {
  data: RowSublocalities
}

const SublocalityRow = ({ data }: ISublocalityRowsProps) => {
  return (
    <>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
      <MwEllipsisContainer>
        {data.city.name} - {data.city.state.name}
      </MwEllipsisContainer>
    </>
  )
}

export default SublocalityRow
