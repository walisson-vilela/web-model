import { useEffect, useState } from 'react'

import { MwIcon, MwInput } from '@mw-kit/mw-ui'
import { Dropdown } from 'semantic-ui-react'

import { Grid } from '../../../../../components/FormFields'
import { arrayDiff, arrayIntersection } from '../../../../../utils/ArrayDiff'
import { LevelOneGroup, LevelZeroGroup } from '../interfaces'

import { WithoutSearchProps } from './interfaces'
import * as S from './styles'

const WithoutSearch = ({
  selectedState,
  list: propList,
}: WithoutSearchProps) => {
  const [selected, setSelected] = selectedState
  const [list, setList] = useState<LevelZeroGroup[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [groupStyle, setGroupStyle] = useState<'Expandido' | 'Agrupado'>(
    'Expandido',
  )

  const getAllIds = (menus: LevelZeroGroup[]): number[] =>
    Array.from(
      new Set(
        menus.flatMap((menu) =>
          menu.children.length > 0
            ? menu.children.map((sm) => sm.id)
            : [menu.id],
        ),
      ),
    )

  useEffect(() => {
    setList(
      propList.map((menu) => ({
        ...menu,
        children: [...menu.children],
        opened: groupStyle === 'Expandido',
      })),
    )
  }, [propList])

  useEffect(() => {
    setTotalCount(list.reduce((acc, e) => acc + (e.children.length || 1), 0))
  }, [list])

  const toggleMenu = (index: number) => {
    setList((prev) => {
      const aux = [...prev]
      aux[index].opened = !prev[index].opened
      return aux
    })
  }

  const isParentChecked = (parent_id: number): boolean => {
    const menu = list.find((menu) => menu.id === parent_id)
    if (!menu) return false

    const listIDs = menu.children.map((submenu) => submenu.id)
    const selectedIDs = arrayIntersection(selected, listIDs)

    return menu.children.length > 0
      ? selectedIDs.length === listIDs.length
      : selected.includes(parent_id)
  }

  const isChildrenChecked = (id: number) => selected.includes(id)

  const checkParent = (parent_id: number) => {
    setSelected((prev) => {
      let aux = [...prev]
      const menu = list.find((menu) => menu.id === parent_id)
      if (!menu) return []

      if (menu.children.length > 0) {
        const childIds = menu.children.map((e) => e.id)
        aux =
          arrayIntersection(aux, childIds).length === childIds.length
            ? arrayDiff(aux, childIds)
            : Array.from(new Set([...aux, ...childIds]))
      } else {
        const index = aux.findIndex((id) => menu.id === id)

        index > -1 ? aux.splice(index, 1) : aux.push(menu.id)
      }
      return [...aux]
    })
  }

  const checkChildren = (id: number) =>
    setSelected((prev) => {
      const aux = [...prev]

      const index = aux.findIndex((selected_id) => selected_id === id)

      index > -1 ? aux.splice(index, 1) : aux.push(id)

      return [...aux]
    })

  const checkAll = () => {
    setSelected((prev) => {
      const allIds = getAllIds(list)
      const isEverythingChecked =
        allIds.length === prev.length && allIds.every((id) => prev.includes(id))
      return isEverythingChecked ? [] : allIds
    })
  }

  const getCheckedLength = (children: LevelOneGroup[]): number =>
    arrayIntersection(
      selected,
      children.map((e) => e.id),
    ).length

  return (
    <S.Container>
      <S.Header>
        <MwInput
          type='checkbox'
          label={`Selecionar Todos (${selected.length})`}
          checked={totalCount > 0 && selected.length === totalCount}
          onChange={checkAll}
        />

        <Dropdown
          text={`Exibição: Menu ${groupStyle}`}
          direction='left'
          selectOnBlur={false}
          value={groupStyle}
          options={[
            { value: 'Expandido', content: 'Menu Expandido' },
            { value: 'Agrupado', content: 'Menu Agrupado' },
          ]}
          onChange={(_, data) => {
            const value = data.value as 'Expandido' | 'Agrupado'
            setGroupStyle(value)
            setList((prev) =>
              prev.map((e) => ({
                ...e,
                opened: value === 'Expandido',
              })),
            )
          }}
        />
      </S.Header>

      <S.Content>
        {list.map((menu, menuIndex) => {
          const subItems =
            menu.children.length > 0
              ? menu.children
              : [{ id: menu.id, name: menu.name } as LevelOneGroup]
          return (
            <S.Accordion key={`menu-${menuIndex}`}>
              <Grid.Row align='center'>
                <MwIcon
                  type='semantic'
                  color='black'
                  icon={menu.opened ? 'caret down' : 'caret right'}
                  width={menu.opened ? 7.25 : 5.25}
                  height={menu.opened ? 5.25 : 7.25}
                  onClick={() => toggleMenu(menuIndex)}
                />

                <MwInput
                  type='checkbox'
                  checked={isParentChecked(menu.id)}
                  onChange={() => checkParent(menu.id)}
                />

                <h6 onClick={() => toggleMenu(menuIndex)}>
                  {menu.name}
                  {subItems.length > 0 &&
                    ` (${getCheckedLength(subItems)}/${subItems.length})`}
                </h6>
              </Grid.Row>

              <S.AccordionSubmenus opened={menu.opened ? subItems.length : 0}>
                <Grid.Row itemSpacing={14}>
                  <h5>Submenus</h5>
                </Grid.Row>

                {subItems.map((submenu, submenuIndex) => (
                  <Grid.Row itemSpacing={14} key={`submenu-${submenuIndex}`}>
                    <MwInput
                      type='checkbox'
                      label={submenu.name}
                      checked={isChildrenChecked(submenu.id)}
                      onChange={() => checkChildren(submenu.id)}
                    />
                  </Grid.Row>
                ))}
              </S.AccordionSubmenus>
            </S.Accordion>
          )
        })}
      </S.Content>
    </S.Container>
  )
}

export default WithoutSearch
