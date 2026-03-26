import { Associate } from './Associate'
import { Relation } from './Relation'
import { TabProps } from './interface'
import * as S from './styles'

export const SelectComponent = ({
  config,
  hasDescription = false,
}: TabProps) => {
  return (
    <S.Container>
      <Relation config={config} hasDescription={hasDescription} />
      <Associate config={config} hasDescription={hasDescription} />
    </S.Container>
  )
}
