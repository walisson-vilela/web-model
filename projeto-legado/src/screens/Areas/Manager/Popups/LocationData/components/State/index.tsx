import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowStates } from '../../interfaces'

interface IStateRowsProps {
  data: RowStates
}

const StateRow = ({ data }: IStateRowsProps) => {
  return <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
}

export default StateRow
