import { Associate } from './Associate'
import { Relation } from './Relation'
import { TabProps } from './interface'
import * as S from './styles'

export const SelectComponent = ({ config, edit }: TabProps) => {
  return (
    <S.Container>
      <Relation config={config} edit={edit} />
      <Associate config={config} edit={edit} />
    </S.Container>
  )
}
