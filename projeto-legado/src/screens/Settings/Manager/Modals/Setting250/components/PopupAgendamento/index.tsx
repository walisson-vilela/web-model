import React from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

const PopupAgendamento = () => {
  return (
    <Popup
      on='click'
      trigger={
        <MwIcon
          type='feather'
          icon='info'
          color='black'
          width={12}
          height={12}
        />
      }
      header='Etapas do Agendamento'
      content={
        <>
          <p>
            - A mudança da credencial de login só pode ser agendada com
            antecedência de 3 dias da data atual;
          </p>

          <p>
            - Todos usuários serão informados das mudanças via Msg Inbox de
            forma destacada;
          </p>

          <p>
            - Na data agendada todas as credenciais serão substituídas de forma
            automática pelo sistema.
          </p>
        </>
      }
      position='right center'
      className='popup-field'
      inverted
      wide
    />
  )
}

export default PopupAgendamento
