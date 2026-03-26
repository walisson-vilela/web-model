import { MwIcon, StrictPopupProps } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../../components/Popup'
import { CheckAddress } from '../../../../../components'

import * as S from './styled'

const Trigger: React.FC = (props) => {
  return (
    <MwIcon
      {...props}
      width='14px'
      height='14px'
      type='feather'
      icon='info'
      color='greyishBlue'
    />
  )
}

const Content = (props: React.PropsWithChildren) => {
  return (
    <S.Container>
      <div>Tipos de Selo de Qualificação</div>

      <div>
        <CheckAddress
          status='VALID'
          children='Cadastro validado pela Receita Federal.'
          inverted
        />

        <CheckAddress
          status='UNKNOWN'
          children='Cadastro com CNPJ ainda não validado pela Receita Federal.'
          inverted
        />

        <CheckAddress
          status={null}
          children='Cadastro sem CNPJ, sem possibilidade de validação com a Receita Federal.'
          inverted
        />

        <CheckAddress
          status='INVALID'
          children='Cadastro com CNPJ incompatível com o endereço após validação da Receita Federal.'
          inverted
        />

        <CheckAddress
          status='UPDATED'
          children='Cadastro validado que tiveram alteração pela Receita Federal.'
          inverted
        />
      </div>

      {props.children && <div children={props.children} />}
    </S.Container>
  )
}

const PopupSealQuality = (
  props: React.PropsWithChildren<Pick<StrictPopupProps, 'position'>>,
) => {
  return (
    <Popup
      on='click'
      trigger={<Trigger />}
      content={() => <Content children={props.children} />}
      position={props.position || 'right center'}
      hideOnScroll
      inverted
      style={{ minWidth: '556px', padding: 0 }}
    />
  )
}

export default PopupSealQuality
