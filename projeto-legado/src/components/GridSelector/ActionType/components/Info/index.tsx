import { MwIcon, Popup } from '@mw-kit/mw-ui'

import * as Types from '../../types'

import * as S from './styles'

const Info = (props: Pick<Types.ActionTypeProps, 'label'>) => {
  const { label } = props

  return (
    <Popup
      on='click'
      className='popup-field'
      position='right center'
      content={
        <S.Container>
          <div>Tipo de Ação</div>

          <div>
            <b>Restringir</b>: O Universo de {label} fica restrito a apenas os
            elementos associados.
          </div>

          <div>
            <b>Excluir</b>: Assume todo o universo de {label}, exceto os
            elementos associados.
          </div>
        </S.Container>
      }
      trigger={<MwIcon type='feather' icon='info' color='darkBlue' />}
      inverted
    />
  )
}

export default Info
