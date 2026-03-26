import React from 'react'

import { MwIcon, Popup } from '@mw-kit/mw-ui'

import * as S from './styles'

const Notification = () => {
  return (
    <Popup
      on='click'
      trigger={<MwIcon type='feather' icon='alert_circle' color='darkBlue' />}
      content={
        <S.NotificationContainer>
          <div children='Notificação' />

          <div>
            <div>
              <div>Horário de Acesso ao Sistema</div>
              <div>
                A operação controlar apenas o acesso do usuário ao sistema
                através de uma janela de inicio e fim.
              </div>
            </div>

            <div>
              <div>Ponto Eletrônico</div>
              <div>
                Para este tipo de operação o Ideal é que o mesmo esteja alinhado
                ao seu respectivo sindicato. O Usuário será controlado pela sua
                jornada de trabalho e intervalo através do Ponto Eletrônico.
              </div>
            </div>
          </div>
        </S.NotificationContainer>
      }
      position='right center'
      style={{ maxWidth: 572 }}
      inverted
    />
  )
}

export default Notification
