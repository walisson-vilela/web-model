import { RowComponent } from '../../../../../../../../../../components/GridSelector/interfaces'
import { WeeklyRoutine } from '../../../../../../../components'
import { WorkShift } from '../../../../interfaces'

import * as S from './styled'

const Row: RowComponent<WorkShift> = ({ data }) => {
  return (
    <S.RowContainer>
      <S.RowTitle>
        ID: <b children={data.id} /> | Tipo:
        <b children={data.electronic_point_label} />
      </S.RowTitle>
      <S.RowSubtitle>
        <S.RowSubtitleItem>
          Frequência: <WeeklyRoutine weekdays={data.weekdays} />|
        </S.RowSubtitleItem>
        <S.RowSubtitleItem>
          Carga Horária: {data.workload_label} | Intervalo:{' '}
          {data.average_interval_label}
        </S.RowSubtitleItem>
      </S.RowSubtitle>
    </S.RowContainer>
  )
}

export default Row
