import type React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { WeeklyRoutine } from '../../../../../../WorkShifts/components'
import { WorkShift } from '../../../../../../WorkShifts/types'

import * as S from './styled'

type Props = {
  data: WorkShift
  checked: [
    WorkShift | null,
    React.Dispatch<React.SetStateAction<WorkShift | null>>,
  ]
}

export const Row: React.FC<Props> = ({
  data,
  checked: [checked, setChecked],
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 5,
        position: 'relative',
        marginBottom: '14px',
      }}
      onClick={() => setChecked(data)}
    >
      <MwInput
        type='radio'
        checked={checked != null && checked.id === data.id}
        onChange={(e) => e.preventDefault()}
      />
      <S.RowContainer>
        <S.RowTitle>
          ID: <b>{data.id}</b> | Tipo: <b>{data.electronic_point_label} </b>
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
    </div>
  )
}
