import { Dropdown } from '@mw-kit/mw-manager'

import Search from '../../../../standardized/components/Search'
import Subtitle from '../Subtitle'

import * as S from './styles'

const Toolbar = Object.assign(
  (
    props: React.PropsWithChildren<{
      search: Parameters<typeof Search>[0]
      dropdown: Pick<Parameters<typeof Dropdown>[0], 'items' | 'loading'>
    }>,
  ) => {
    return (
      <S.Toolbar>
        <Subtitle children={props.children} />

        <div>
          <Search {...props.search} />

          <S.DropdownContainer>
            <Dropdown axis='y' {...props.dropdown} />
          </S.DropdownContainer>
        </div>
      </S.Toolbar>
    )
  },
  { ManagerContainer: S.ManagerContainer },
)

export default Toolbar
