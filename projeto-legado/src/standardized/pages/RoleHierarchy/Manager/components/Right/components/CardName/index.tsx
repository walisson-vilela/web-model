import { MwInput } from '@mw-kit/mw-ui'

import useHierarchyContext from '../../../../../context'
import { Level } from '../../../../../types'

import * as S from './styled'

interface INameLevelCard {
  level: Level
  title: string
  index: number
}

const NameLevelCard = (props: INameLevelCard) => {
  const { title, index, level } = props
  const {
    levels: [, setLevels],
    schedule: [schedule],
  } = useHierarchyContext()

  const setName = (index: number, name: string) => {
    setLevels((prev) => {
      const levels = [...prev]
      levels[index].name = name
      return levels
    })
  }
  return (
    <S.CardNameContainer>
      <S.Title>{title}</S.Title>

      <MwInput
        maxTags={1}
        borderless={true}
        paddingless={true}
        placeholder='Defina um nome'
        type='tags'
        value={level.name ? [level.name] : []}
        setValue={([value]) => setName(index, value)}
        disabled={schedule !== null}
        width={level.name ? 'auto' : '75%'}
      />
    </S.CardNameContainer>
  )
}

export default NameLevelCard
