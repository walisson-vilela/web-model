import React from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import moment from 'moment'

import SVG from '../../../../../../../../../assets/icons/map/marker-user-white-blue.svg?react'
import { formatCEP } from '../../../../../../../../utils/formatters/numbers'
import { BodyInterface } from '../../../../interfaces'

import * as S from './styles'

const AuditData = (props: { data: BodyInterface }) => {
  const { data } = props

  return (
    <React.Fragment>
      <S.Title>
        <S.TitleMarkerContainer>
          <MwIcon
            type='svg'
            icon={SVG}
            height='25px'
            width='17px'
            color='blue'
          />
        </S.TitleMarkerContainer>

        <div children='Dados da Auditoria' />
      </S.Title>

      <S.Container>
        <div>
          <div>
            <b>
              {data.store.id} - {data.store.nickname}
            </b>
          </div>

          <div>{data.store.address.formatted}</div>

          <div>Cep: {formatCEP(data.store.address.postal_code)}</div>
        </div>

        <div>
          <div>
            <b>Precisão GPS</b>: {data.coordinate.radius}m
          </div>

          <div>
            <b>Data/Hora</b>:{' '}
            {moment(data.created_at).format('DD/MM/YY [às] HH:mm')}
          </div>
        </div>

        <div>
          <div>
            <b>Audidado por:</b>
          </div>

          {data.creator.user ? (
            <React.Fragment>
              <div>
                <b>{data.creator.user.id}</b> - {data.creator.name}
              </div>

              <div>Função: {data.creator.user.role.name || '-'}</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>{data.creator.name}</div>

              <div>Função: -</div>
            </React.Fragment>
          )}
        </div>
      </S.Container>
    </React.Fragment>
  )
}

export default AuditData
