import { Associate } from './Associate'
import { Relation } from './Relation'
import { TabProps } from './interface'
import * as S from './styles'

export const SelectComponent = ({
  config,
  hasDescription = false,
  hasShortName = false,
}: TabProps) => {
  return (
    <S.Container>
      <Relation
        config={config}
        hasDescription={hasDescription}
        hasShortName={hasShortName}
      />
      <Associate
        config={config}
        hasDescription={hasDescription}
        hasShortName={hasShortName}
      />
    </S.Container>
  )
}
