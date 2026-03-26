import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { formatPeriod } from '../../../../../../../../screens/Users/Modals/EventsManager/components/Grid/components/Details/function'
import useFormContext from '../../../../context'
import { formParser } from '../../../../parser'
import Info from '../Info'
import * as S from '../styles'

const Inactive = () => {
  const {
    form: { reset },
    data,
    modal: [, setModal],
  } = useFormContext()

  const { event_user } = data
  if (!event_user) return null
  const { event } = event_user
  if (!event) return null

  const onRemove = () => {
    setModal({
      title: 'Notificação',
      size: 'tiny',
      content:
        'Você está removendo o status de inativo do usuário. Para completar esta ação, é necessário antes atualizar o cadastro. Deseja continuar?',
      buttonType: 'MwButton',
      actions: [
        {
          content: 'Cancelar',
          appearance: 'borderless',
          onClick: () => setModal(null),
        },
        {
          content: 'Sim',
          onClick: () => {
            reset(formParser(null))
            setModal(null)
          },
        },
      ],
    })
  }

  return (
    <React.Fragment>
      <MwGrid.Row>
        <S.Col>
          <div>
            Esse usuário encontra-se (<b>Inativo</b>) - Motivo:{' '}
            {event.classification?.name || event.name || '-'} - Ação realizada
            por ({event_user.creator?.name || '-'}) - Período:{' '}
            {formatPeriod(new Date(event.starts_at))} à Indeterminado
          </div>

          <S.Link onClick={onRemove} children='Remover' />
        </S.Col>
      </MwGrid.Row>

      <Info />
    </React.Fragment>
  )
}

export default Inactive
