import React, { useMemo } from 'react'

import { MwButton, MwGrid, MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../components/Popup'
import useFormContext from '../../context'
import type { AuxForm } from '../../interfaces'
import { PopupContentWrapper, PopupTriggerWrapper } from '../Definition/style'

import Flag from './inputs/Flag'
import Frequency from './inputs/Frequency'
import Interval from './inputs/Interval'
import Name from './inputs/Name'
import Period from './inputs/Period'
import StartLimit from './inputs/StartLimit'
import { ButtonWrapper, TitleWrapper } from './style'
import { useUpdateWeekDays } from './useUpdateWeekDays'

const DayConfigFields = () => {
  const {
    auxForm,
    errors: [errors],
  } = useFormContext()
  const auxFormValues = auxForm.getValues()

  const updateWeekDays = useUpdateWeekDays()

  const isDisabled = useMemo(() => {
    if (errors && Object.entries(errors).length > 0) return true
    if (auxFormValues.weekdays.length === 0) return true

    let auxFields: (keyof AuxForm)[] = ['interval', 'starts_at', 'ends_at']

    if (auxFormValues.interval) {
      auxFields = [
        'interval',
        'starts_at',
        'ends_at',
        'name',
        'start_limit',
        'flag',
      ]
    }

    return auxFields.some((f) => {
      return auxFormValues[f] === '' || auxFormValues[f] === null
    })
  }, [errors, auxFormValues])

  return (
    <MwGrid
      borderless
      rows={{
        spacing: { left: '0', right: '0' },
        verticalAlign: 'center',
        borderless: true,
      }}
      cols={{ spacing: { top: '0', bottom: '0', left: 's1', right: 's1' } }}
      style={{ paddingBottom: 14 }}
    >
      <MwGrid.Row>
        <TitleWrapper>
          <Popup
            inverted
            position='right center'
            on='click'
            style={{ minWidth: 470 }}
            trigger={
              <PopupTriggerWrapper>
                Configurações dos dias e horários
                <MwIcon type='feather' icon='info' color='darkBlue' />
              </PopupTriggerWrapper>
            }
            content={
              <PopupContentWrapper>
                <ul>
                  <li>Só é possível ter uma(1) jornada por dia</li>
                  <li>
                    Se a jornada for maior que 4h, será obrigatório definir o
                    intervalo
                  </li>
                  <li>
                    Intervalos não podem ser menores que 1h e nem maiores de 2h
                  </li>
                  <li>
                    É necessária ao menos uma jornada de 4h para salvar um turno
                  </li>
                </ul>
              </PopupContentWrapper>
            }
          />
        </TitleWrapper>
      </MwGrid.Row>
      <MwGrid.Row style={{ alignItems: 'end' }}>
        <Interval />
        <Frequency />
        <Period name='starts_at' />
        <Period name='ends_at' />
        {auxFormValues.interval && (
          <React.Fragment>
            <Name />
            <StartLimit />
            <Flag />
          </React.Fragment>
        )}
        <ButtonWrapper>
          <MwButton
            appearance='bordered'
            onClick={() => updateWeekDays()}
            disabled={isDisabled}
          >
            {auxFormValues.interval === true ? 'Adicionar' : 'Atualizar'}
          </MwButton>
        </ButtonWrapper>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default DayConfigFields
