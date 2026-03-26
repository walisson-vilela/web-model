import { ModalProps } from './interfaces'
import * as Styled from './styles'

const Notification = ({ close, open }: ModalProps) => {
  return (
    <Styled.Container open={open}>
      <Styled.Header>Políticas e Termos</Styled.Header>
      <Styled.Content>
        Para prosseguir com o seu acesso, será necessário realizar o aceite das
        políticas de acesso e termos de uso pendentes.
      </Styled.Content>
      <Styled.Footer>
        <Styled.Button onClick={close}>Ok</Styled.Button>
      </Styled.Footer>
    </Styled.Container>
  )
}

export default Notification
