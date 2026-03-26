import HierarchyFilter from './HierarchyFilter'
import LevelFilter from './LevelFilter'
import AreaFilter from './AreaFilter'
import DateFilter from './DateFilter'
import PrintMenu from './PrintMenu'
import * as S from './styles'

const FiltersBar = () => {
  return (
    <S.Container>
      <S.LeftFilters>
        <HierarchyFilter />
        <LevelFilter />
        <AreaFilter />
      </S.LeftFilters>

      <S.RightFilters>
        <DateFilter />
        <PrintMenu />
      </S.RightFilters>
    </S.Container>
  )
}

export default FiltersBar
