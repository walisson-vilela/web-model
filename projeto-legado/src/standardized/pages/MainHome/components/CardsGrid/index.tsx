import type { CardRow } from '../../constants'
import CardContainer from './CardContainer'
import * as S from './styles'

type CardsGridProps = {
  layout: CardRow[]
  onOpenDetail?: (cardId: string) => void
}

const CardsGrid = ({ layout, onOpenDetail }: CardsGridProps) => {
  return (
    <S.Container>
      {layout.map((row, rowIndex) => (
        <S.Row key={`row-${rowIndex}`}>
          {row.map((column, columnIndex) => (
            <S.Column key={`row-${rowIndex}-col-${columnIndex}`}>
              {column.map((cardId) => (
                <CardContainer
                  key={cardId}
                  id={cardId}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </S.Column>
          ))}
        </S.Row>
      ))}
    </S.Container>
  )
}

export default CardsGrid
