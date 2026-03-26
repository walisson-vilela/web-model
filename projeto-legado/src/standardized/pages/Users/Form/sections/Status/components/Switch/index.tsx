import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { EventsManager } from '../../../../../../../../screens/Users/Modals'
import useFormContext from '../../../../context'
import EventsIcon from '../EventsIcon'

import * as S from './styles'

const Switch = (props: { event_count: number; checked: boolean }) => {
  const {
    modal: [, setModal],
    loadData,
    data,
    originals,
  } = useFormContext()

  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {}
  return (
    <React.Fragment>
      <S.Col>
        <MwInput
          type='switch'
          label={{ label: 'Status:', before: 'Inativo', after: 'Ativo' }}
          onChange={(e) => {
            if (originals.status === 'AP' || originals.status === 'A') {
              setModal(
                <EventsManager
                  name={data.name}
                  reload={loadData}
                  close={() => setModal(null)}
                  user_id={data.id}
                />,
              )
            }
            onChange(e)
          }}
          checked={props.checked}
        />
      </S.Col>

      <S.Col
        onClick={() =>
          setModal(
            <EventsManager
              name={data.name}
              reload={loadData}
              close={() => setModal(null)}
              user_id={data.id}
            />,
          )
        }
        style={{ cursor: 'pointer' }}
      >
        Gerenciar Eventos
        <EventsIcon event_count={data.event_count} />
      </S.Col>
    </React.Fragment>
  )
}

export default Switch
