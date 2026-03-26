import React, { useContext } from 'react'

import { MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'
import { Period, WorkDate } from '../../../../interfaces'

import * as S from './styles'

const Grid = () => {
  const {
    systemAccessTime: {
      state: [systemAccessTime, setSystemAccessTime],
    },
  } = useContext(SystemAccessTimeContext)

  const onRemoveWorkDate = (index: number) => {
    setSystemAccessTime((prev) => {
      const work_dates = prev.work_dates
      work_dates.splice(index, 1)
      return { ...prev, work_dates }
    })
  }

  // filtering renderable and keeping keys
  const renderable = systemAccessTime.work_dates.reduce(
    (prev, work_date, index) => {
      return 'days' in work_date ? { ...prev, [index]: work_date } : prev
    },
    {} as { [key: number]: Exclude<WorkDate, Period> },
  )

  return (
    <React.Fragment>
      <MwGrid
        rows={{
          striped: Object.keys(renderable).length > 0 || undefined,
          spacing: 's1',
          spacingAround: true,
        }}
        cols={{
          spacingAround: true,
        }}
        style={{
          borderRadius: 4,
        }}
      >
        <MwGrid.Row>
          <MwGrid.Col width='1' align={{ content: { horizontal: 'center' } }}>
            <b>Hora Início</b>
          </MwGrid.Col>

          <MwGrid.Col width='1' align={{ content: { horizontal: 'center' } }}>
            <b>Hora Fim</b>
          </MwGrid.Col>

          <MwGrid.Col width='auto'>
            <S.XMark content='D' />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <S.XMark content='S' />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <S.XMark content='T' />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <S.XMark content='Q' />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <S.XMark content='Q' />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <S.XMark content='S' />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <S.XMark content='S' />
          </MwGrid.Col>

          <MwGrid.Col>
            <b>Tipo</b>
          </MwGrid.Col>

          <MwGrid.Col width='1'>
            <b>Ação</b>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwScrollContainer height='120px'>
          {Object.keys(renderable).length === 0 ? (
            <MwGrid.Row>
              <MwGrid.Col
                width='12'
                align={{
                  content: {
                    vertical: 'center',
                    horizontal: 'center',
                  },
                }}
                children='Não há nenhuma definição estabelecida até o momento'
              />
            </MwGrid.Row>
          ) : (
            Object.keys(renderable).map((i) => {
              const index = parseInt(i)
              const work_date = renderable[index]

              return (
                <MwGrid.Row key={index}>
                  <MwGrid.Col
                    width='1'
                    align={{ content: { horizontal: 'center' } }}
                  >
                    {work_date.start_time}
                  </MwGrid.Col>

                  <MwGrid.Col
                    width='1'
                    align={{ content: { horizontal: 'center' } }}
                  >
                    {work_date.end_time}
                  </MwGrid.Col>

                  {[...Array(7).keys()].map((weekday) => {
                    return (
                      <MwGrid.Col key={weekday} width='auto'>
                        <S.XMark
                          content={
                            work_date.days.includes(weekday + 1)
                              ? undefined
                              : ''
                          }
                        />
                      </MwGrid.Col>
                    )
                  })}

                  <MwGrid.Col>
                    {{
                      J: 'Jornada',
                      I: 'Intervalo',
                    }[work_date.type] || '-'}
                  </MwGrid.Col>

                  <MwGrid.Col width='1'>
                    <S.Link
                      children='Remover'
                      onClick={() => onRemoveWorkDate(index)}
                    />
                  </MwGrid.Col>
                </MwGrid.Row>
              )
            })
          )}
        </MwScrollContainer>
      </MwGrid>
    </React.Fragment>
  )
}

export default Grid
