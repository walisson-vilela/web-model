import { Popup, StrictPopupProps } from 'semantic-ui-react'

import useHomeContext from '../../context'
import { HeaderItemComponent } from '../../types'

const messages = {
  terms:
    'Durante o processo de validação das políticas de acesso e termos de uso você não poderá acessar esses recursos. Valide as políticas de acesso e termos de uso pendentes.',
  password:
    'Durante o processo de alteração de senha, você não poderá acessar esses recursos, conclua a alteração de senha.',
  auth: 'Você não está autenticado',
}

const DisabledPopup = (
  props: Omit<StrictPopupProps, 'trigger'> & {
    trigger: HeaderItemComponent
  },
) => {
  const { disabled } = useHomeContext()

  const { trigger: Trigger } = props

  return (
    <Popup
      inverted
      wide
      on='click'
      {...(disabled
        ? {
            content: messages[disabled],
          }
        : {
            disabled: true,
          })}
      disabled={!disabled}
      {...props}
      trigger={<Trigger disabled={!!disabled} />}
    />
  )
}

export default DisabledPopup
