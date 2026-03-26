import * as S from './styles'

type DetailPlaceholderProps = {
  title: string
  description: string
}

const DetailPlaceholder = ({ title, description }: DetailPlaceholderProps) => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Header>

      <S.Body>
        <S.PlaceholderCard>
          <p>O detalhamento deste card estará disponível em breve.</p>
        </S.PlaceholderCard>
      </S.Body>
    </S.Container>
  )
}

export default DetailPlaceholder
