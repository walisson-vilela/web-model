import { Associate } from './Associate'
import { Relation } from './Relation'
import { TabProps } from './interface'
import * as S from './styles'

export const SelectComponent = ({ config, hasDetails = false }: TabProps) => {
  return (
    <S.Container>
      <Relation config={config} hasDetails={hasDetails} />
      <Associate config={config} hasDetails={hasDetails} />
    </S.Container>
  )
}
