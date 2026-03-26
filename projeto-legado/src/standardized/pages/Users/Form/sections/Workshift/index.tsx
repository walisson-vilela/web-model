import { useState } from 'react'

import { MwButton, MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'

import { isObject } from '../../../../../../utils/Validators'
import WeekDaysPopup from '../../../../WorkShifts/Grid/Popups/WorkShiftsData'
import { WorkshiftModal } from '../../Modals/WorkshiftModal'
import useFormContext from '../../context'
import * as S from '../../styled'

import * as Inputs from './inputs'

const Workshift = () => {
  const {
    form,
    modal: [, setModal],
    disabled,
  } = useFormContext()

  const [, setRef] = useState<HTMLDivElement | null>(null)

  const { watch, setValue, isInvalid } = form

  const role = watch('role')
  const work_shift = watch('work_shift')
  const electronic_point = watch('electronic_point')

  const isRequired = isObject(role) && role.internal_access === false

  return (
    <S.Section>
      <MwGrid
        rows={{
          borderless: true,
        }}
        cols={{
          spacing: {
            top: 's1',
            left: '0',
            bottom: 's1',
            right: 's3',
          },
          spacingAround: true,
        }}
        spacing={{
          top: 's3',
          left: 's3',
          bottom: 's3',
          right: '0',
        }}
        borderless
      >
        <MwGrid.Row>
          <S.Title>Turno de Trabalho{isRequired ? ' *' : ''}</S.Title>
        </MwGrid.Row>
        <MwGrid.Row>
          <MwGrid.Col
            width='auto'
            style={{
              gap: '14px',
              alignItems: 'center',
            }}
          >
            <span>Utiliza marcação de Ponto Eletrônico como registro:</span>
          </MwGrid.Col>
          <MwGrid.Col width='1'>
            <Inputs.EletronicPointInput />
          </MwGrid.Col>
        </MwGrid.Row>
        <MwGrid.Row spacing={{ bottom: 's3', left: '0' }}>
          <MwButton
            color={isInvalid('work_shift') ? 'warningRed' : 'blue'}
            onClick={() =>
              setModal(
                <WorkshiftModal
                  checked={work_shift}
                  electronicPoint={electronic_point}
                  onClose={() => setModal(null)}
                  onSubmit={(value) => setValue('work_shift', value)}
                />,
              )
            }
            disabled={disabled}
          >
            Definir Turno
          </MwButton>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col>
            <MwGrid
              style={{
                borderRadius: 4,
              }}
            >
              <MwScrollContainer
                height='82px'
                ref={setRef}
                before={{
                  background: 'ghostWhite',
                  children: (
                    <MwGrid.Row
                      backgroundColor='ghostWhite'
                      cols={{
                        spacing: 's3',
                        spacingAround: true,
                      }}
                      style={{ fontWeight: 'bold' }}
                    >
                      <MwGrid.Col
                        width='2'
                        align={{ content: { horizontal: 'left' } }}
                        children='Id'
                      />

                      <MwGrid.Col
                        width='2'
                        align={{ content: { horizontal: 'left' } }}
                        children='Tipo de Turno'
                      />

                      <MwGrid.Col
                        width='2'
                        align={{ content: { horizontal: 'center' } }}
                        children='Frenquência'
                      />

                      <MwGrid.Col
                        width='2'
                        align={{ content: { horizontal: 'center' } }}
                        children='Carga Horária (S)'
                      />
                      <MwGrid.Col
                        width='2'
                        align={{ content: { horizontal: 'center' } }}
                        children='Intervalo'
                      />

                      <MwGrid.Col
                        width='2'
                        align={{ content: { horizontal: 'center' } }}
                        children='Ação'
                      />
                    </MwGrid.Row>
                  ),
                }}
                empty={{
                  empty: work_shift === null,
                  content: (
                    <S.EmptyMessage>
                      Não há nenhum turno associado
                    </S.EmptyMessage>
                  ),
                }}
                spacing={{ top: 's1', bottom: 's1' }}
              >
                {work_shift !== null && (
                  <MwGrid.Row
                    cols={{
                      spacing: {
                        top: 's1',
                        right: 's3',
                        bottom: 's1',
                        left: 's3',
                      },
                      spacingAround: true,
                    }}
                    borderless
                  >
                    <MwGrid.Col
                      width='2'
                      align={{
                        content: { horizontal: 'left', vertical: 'center' },
                      }}
                      children={work_shift.id}
                    />

                    <MwGrid.Col
                      width='2'
                      align={{
                        content: { horizontal: 'left', vertical: 'center' },
                      }}
                      children={work_shift.electronic_point_label || '-'}
                    />

                    <MwGrid.Col
                      width='2'
                      align={{
                        content: { horizontal: 'center', vertical: 'center' },
                      }}
                      children={<WeekDaysPopup {...work_shift} />}
                    />

                    <MwGrid.Col
                      width='2'
                      align={{
                        content: { horizontal: 'center', vertical: 'center' },
                      }}
                      children={work_shift.workload_label}
                    />

                    <MwGrid.Col
                      width='2'
                      align={{
                        content: { horizontal: 'center', vertical: 'center' },
                      }}
                      children={work_shift.average_interval_label ?? '-'}
                    />

                    <MwGrid.Col
                      width='2'
                      align={{
                        content: { horizontal: 'center', vertical: 'center' },
                      }}
                      spacing={{ right: '0' }}
                      children={
                        <MwButton
                          appearance='link'
                          onClick={() => setValue('work_shift', null)}
                          disabled={disabled}
                        >
                          Remover
                        </MwButton>
                      }
                    />
                  </MwGrid.Row>
                )}
              </MwScrollContainer>
            </MwGrid>
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>
    </S.Section>
  )
}

export default Workshift
