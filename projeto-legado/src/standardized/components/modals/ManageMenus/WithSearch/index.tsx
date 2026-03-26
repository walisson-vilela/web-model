import { useEffect, useState } from 'react'

import { MwIcon, MwInput } from '@mw-kit/mw-ui'

import { Grid } from '../../../../../components/FormFields'
import { arrayDiff, arrayIntersection } from '../../../../../utils/ArrayDiff'
import { LevelZeroGroup } from '../interfaces'

import { WithSearchProps } from './interfaces'
import * as S from './styles'

const WithSearch = ({
  list: propList,
  selectedState,
  sortState,
}: WithSearchProps) => {
  const [sort, setSort] = sortState
  const [selected, setSelected] = selectedState

  const [list, setList] = useState<LevelZeroGroup[]>([])

  const [totalCount, setTotalCount] = useState<number>(0)
  const [selectedCount, setSelectedCount] = useState<number>(0)

  useEffect(() => {
    setList(
      propList.map((menu) => ({
        ...menu,
        children: [...menu.children],
      })),
    )
  }, [propList])

  useEffect(() => {
    let count = 0

    list.forEach((e) => (count += e.children.length || 1))

    setTotalCount(count)
  }, [list])

  useEffect(() => {
    const allIDs: number[] = []

    list.forEach((menu) => {
      menu.children.length < 1
        ? allIDs.push(menu.id)
        : menu.children.forEach((submenu) => allIDs.push(submenu.id))
    })

    setSelectedCount(arrayIntersection(selected, allIDs).length)
  }, [list, selected])

  const isChecked = (id: number): boolean => {
    return selected.includes(id)
  }

  const check = (id: number) => {
    setSelected((prev) => {
      const aux = [...prev]

      const index = aux.findIndex((selected_id) => selected_id === id)

      index > -1 ? aux.splice(index, 1) : aux.push(id)

      return [...aux]
    })
  }

  const checkAll = () => {
    setSelected((prev) => {
      const aux = [...prev]
      const allIDs: number[] = []

      list.forEach((menu) => {
        menu.children.length < 1
          ? allIDs.push(menu.id)
          : menu.children.forEach((submenu) => allIDs.push(submenu.id))
      })

      const selectedIDs = arrayIntersection(aux, allIDs)

      return selectedIDs.length !== allIDs.length
        ? [...[...aux, ...allIDs]]
        : arrayDiff(aux, allIDs)
    })
  }

  const sortItems = (sort: 'menu' | 'submenu') => {
    setSort((prev) => {
      return prev && prev.direction === 'ASC'
        ? null
        : {
            sort: sort === 'menu' ? 'Parents.name' : 'Menus.name',
            direction: prev && prev.direction === 'DESC' ? 'ASC' : 'DESC',
          }
    })
  }

  return (
    <S.Container>
      <S.Row>
        <Grid.Column size={1}>
          <MwInput
            type='checkbox'
            checked={totalCount > 0 && selectedCount === totalCount}
            onChange={() => checkAll()}
          />
        </Grid.Column>

        <Grid.Column size={4}>
          <S.HeaderSort onClick={() => sortItems('submenu')}>
            <span>Submenu</span>

            <MwIcon
              type='semantic'
              color={sort && sort.sort === 'Menus.name' ? 'black' : 'gray'}
              icon={
                sort && sort.sort === 'Menus.name' && sort.direction === 'ASC'
                  ? 'caret up'
                  : 'caret down'
              }
              width={7.25}
              height={4.25}
              onClick={() => {}}
            />
          </S.HeaderSort>
        </Grid.Column>

        <Grid.Column>
          <S.HeaderSort onClick={() => sortItems('menu')}>
            <span>Menu</span>

            <MwIcon
              type='semantic'
              color={sort && sort.sort === 'Parents.name' ? 'black' : 'gray'}
              icon={
                sort && sort.sort === 'Parents.name' && sort.direction === 'ASC'
                  ? 'caret up'
                  : 'caret down'
              }
              width={7.25}
              height={4.25}
              onClick={() => {}}
            />
          </S.HeaderSort>
        </Grid.Column>
      </S.Row>

      <S.Content>
        {list.map((menu) =>
          menu.children.map((submenu) => (
            <S.Row key={`submenu-${submenu.id}`}>
              <Grid.Column size={1}>
                <MwInput
                  type='checkbox'
                  checked={isChecked(submenu.id)}
                  onChange={() => check(submenu.id)}
                />
              </Grid.Column>

              <Grid.Column size={4}>
                <span>{submenu.name}</span>
              </Grid.Column>

              <Grid.Column>
                <span>{menu.name}</span>
              </Grid.Column>
            </S.Row>
          )),
        )}
      </S.Content>
    </S.Container>
  )
}

export default WithSearch
