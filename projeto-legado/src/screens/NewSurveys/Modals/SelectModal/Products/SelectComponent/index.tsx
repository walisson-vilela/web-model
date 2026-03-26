import { Associate } from './Associate'
import { Relation } from './Relation'
import { TabProps } from './interface'
import * as S from './styles'

export const SelectComponent = ({
  config,
  hasParentLabel = false,
  hasProductLine = false,
}: TabProps) => {
  return (
    <S.Container>
      <Relation
        config={config}
        hasParentLabel={hasParentLabel}
        hasProductLine={hasProductLine}
      />
      <Associate
        config={config}
        hasParentLabel={hasParentLabel}
        hasProductLine={hasProductLine}
      />
    </S.Container>
  )
}
