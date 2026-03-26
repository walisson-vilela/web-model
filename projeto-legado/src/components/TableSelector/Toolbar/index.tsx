import React, { useContext, useState } from 'react'

import { AppliedFilters, MenuFilters, SearchFilter } from '@mw-kit/mw-manager'
import { MwIcon } from '@mw-kit/mw-ui'
import { SemanticWIDTHS, Table } from 'semantic-ui-react'

import { booleanOrDefault } from '../../../utils/Formatters'
import TableSelectorContext from '../context'
import * as MainStyles from '../styled'

import * as S from './styled'

const Toolbar = () => {
  const { rows, selected, setSelected, setSearch, filters } =
    useContext(TableSelectorContext)

  let searchWidth: SemanticWIDTHS = 16
  let checkAll = <React.Fragment />

  const checkable = rows.filter(
    (row) => !booleanOrDefault(row.data.disabled, false),
  )

  if (Array.isArray(selected)) {
    searchWidth = 9
    checkAll = (
      <S.CheckboxCell>
        <S.Checkbox
          onChange={(_event: any, data: any) => {
            if (!data.checked) setSelected([])
            else {
              setSelected(checkable.map((row) => row.data))
            }
          }}
          checked={rows.length !== 0 && selected.length === checkable.length}
          label={`Selecionar todos (${selected.length})`}
        />
      </S.CheckboxCell>
    )
  }

  const [hideFilters, setHideFilters] = useState<boolean>(false)

  return (
    <S.StyledTable celled>
      <Table.Body>
        <MainStyles.TableRow>
          {checkAll}

          {hideFilters || !filters ? (
            <S.SearchFilterCell width={searchWidth}>
              <SearchFilter setSearch={setSearch} transparent fluid />
            </S.SearchFilterCell>
          ) : (
            <>
              <S.FiltersContainer>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setHideFilters(true)}
                >
                  <MwIcon type='feather' icon='search' width={16} height={16} />
                </div>
              </S.FiltersContainer>

              <S.FiltersContainer>
                <AppliedFilters
                  appliedFilters={filters.appliedFilters}
                  setAppliedFilters={filters.setAppliedFilters}
                />
              </S.FiltersContainer>

              <S.FiltersContainer>
                <MenuFilters
                  filters={filters.filters}
                  appliedFilters={filters.appliedFilters}
                  setAppliedFilters={filters.setAppliedFilters}
                />
              </S.FiltersContainer>
            </>
          )}
        </MainStyles.TableRow>
      </Table.Body>
    </S.StyledTable>
  )
}

export default Toolbar
