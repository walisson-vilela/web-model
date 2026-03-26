import { MwIcon } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import * as S from './styles'

const Trigger: React.FunctionComponent = (props) => {
  return (
    <MwIcon
      {...props}
      type='feather'
      icon='info'
      color='greyishBlue'
      width='17px'
      height='17px'
    />
  )
}

const Content = () => {
  return (
    <S.InfoContainer>
      <div>Atualizações Conflitantes</div>

      <div>
        Uma <b>atualização conflitante</b> acontece quando mais de um usuário
        está consumindo simultaneamente recursos conflitantes, por exemplo:
      </div>

      <S.List>
        <li>
          Um outro usuário excluíu ou inativou um item que foi selecionado no
          seu formulário;
        </li>

        <li>
          Um outro usuário utilizou um termo único que você também utilizou no
          seu formulário;
        </li>
      </S.List>
    </S.InfoContainer>
  )
}

const Info = () => {
  return (
    <Popup
      on='click'
      position='left center'
      trigger={<Trigger />}
      content={<Content />}
      inverted
    />
  )
}

export default Info
