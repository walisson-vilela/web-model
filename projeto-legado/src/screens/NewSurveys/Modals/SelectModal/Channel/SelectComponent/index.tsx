import { Associate } from './Associate'
import { Relation } from './Relation'
import { TabProps } from './interface'
import * as S from './styles'

export const SelectComponent = ({ config }: TabProps) => {
  return (
    <S.Container>
      <Relation config={config} />
      <Associate config={config} />
    </S.Container>
  )
}
