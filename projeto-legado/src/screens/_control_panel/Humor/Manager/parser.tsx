import React from 'react'

import { EllipsisContainer } from '@mw-kit/mw-manager'
import moment from 'moment'

import Bullet from '../../../../components/Bullet'
import Popup from '../../../../components/ManagerColumnPopup'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { parsedData } from './formaters'
import { BodyInterface, DataInterface } from './interfaces'
import { classificationColors, statusLabels } from './labels'
import * as S from './styles'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    let parsed: BodyInterface = {
      id: numberOrDefault(e.id),
      active: numberOrDefault(e.active),
      people_name: notEmptyStringOrDefault(e.people_name),
      role_name: notEmptyStringOrDefault(e.role_name),
      status: numberOrDefault(e.active),
      status_jsx: null,
      inactivation_reason: notEmptyStringOrDefault(e.inactivation_reason),
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      supervisor_hierarchy: notEmptyStringOrDefault(e.supervisor_hierarchy),
      mobile_date: moment(e.mobile_date).format('DD/MM/YYYY hh:MM:ss'),
      mobile_date_jsx: null,
      classification: notEmptyStringOrDefault(e.classification),
      classification_jsx: null,
      note: notEmptyStringOrDefault(e.note),
      note_jsx: null,
      feeling_id: numberOrDefault(e.feeling_id),
    }

    parsed.status_jsx = (
      <Bullet
        color={statusLabels[parsed.active].color}
        content={statusLabels[parsed.active].name}
      />
    )

    parsed.classification_jsx = (
      <Bullet
        color={classificationColors[parsed.feeling_id].color}
        content={classificationColors[parsed.feeling_id].name}
      />
    )

    parsed.mobile_date_jsx = (
      <React.Fragment> {parsedData(parsed.mobile_date)}</React.Fragment>
    )
    parsed.note_jsx =
      parsed.note === null ? (
        <React.Fragment>{'-'}</React.Fragment>
      ) : (
        <React.Fragment>
          <Popup
            inverted
            position='left center'
            trigger={
              <EllipsisContainer>
                <S.TextElipse> {parsed.note}</S.TextElipse>
              </EllipsisContainer>
            }
            getContent={async () => (
              <S.Container>
                <strong> Observação adicionada pelo Usuário </strong>
                <p> {parsed.note}</p>
              </S.Container>
            )}
          />
        </React.Fragment>
      )
    parsedData(parsed.mobile_date)
    return parsed
  })
}

export default parser
