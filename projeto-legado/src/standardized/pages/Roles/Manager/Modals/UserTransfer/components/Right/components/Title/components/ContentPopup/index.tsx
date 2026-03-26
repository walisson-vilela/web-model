import * as S from './styled'

const Content = () => {
  return (
    <S.Container>
      <S.Content $bolder>Notificação</S.Content>
      <S.SubContainer>
        <S.Content $bolder>Função com atributos internos:</S.Content>
        <S.Content>
          - Só poderão ser transferidas pra outras funções com atributos
          internos.
        </S.Content>
      </S.SubContainer>

      <S.SubContainer>
        <S.Content $bolder>Função sem atributos internos:</S.Content>
        <S.Content>
          - Só poderão ser transferidas pra outras funções com mesmos pilares.
        </S.Content>
        <S.Content>
          - Não será possível transferir se houver ao menos um pilar que não
          exista na Função de origem.
        </S.Content>
      </S.SubContainer>
    </S.Container>
  )
}

export default Content
