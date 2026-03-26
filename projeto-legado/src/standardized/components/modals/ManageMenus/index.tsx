import { ReactNode, useCallback, useEffect, useState } from 'react'

import {
  AppliedFilters,
  FiltersInterfaces,
  MenuFilters,
  SearchFilter,
  SortState,
} from '@mw-kit/mw-manager'
import { MwButton, MwLoader } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { toast } from 'react-hot-toast'

import { Grid } from '../../../../components/FormFields'
import Modal from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../utils/validators'

import WithSearch from './WithSearch'
import WithoutSearch from './WithoutSearch'
import filters from './filters'
import { LevelOneGroup, LevelZeroGroup } from './interfaces'
import { getMenus } from './services'
import * as S from './styles'

type ManageMenusProps = {
  loadSelectedMenus: () => Promise<number[]>
  onSubmit: (ids: number[]) => Promise<void>
  onClose: () => void
  title: ReactNode
}

const ManageMenus = (props: ManageMenusProps) => {
  const { loadSelectedMenus, onClose, onSubmit } = props

  const [loading, setLoading] = useState({
    form: false,
    data: false,
  })

  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortState | null>(null)

  const [menusList, setMenusList] = useState<LevelZeroGroup[]>([])

  const [selectedMenus, setSelectedMenus] = useState<number[]>([])

  const loadData = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, data: true }))

      const data = await getMenus(search, sort, appliedFilters)

      if (data.success) {
        let levelZeroGroup: LevelZeroGroup[] = []

        if (!search) {
          levelZeroGroup = data.data.map(
            (menu: GenericObject): LevelZeroGroup => ({
              id: numberOrDefault(menu.id),
              name: notEmptyStringOrDefault(menu.name),
              children: menu.children.map(
                (submenu: GenericObject): LevelOneGroup => ({
                  id: numberOrDefault(submenu.id),
                  name: notEmptyStringOrDefault(submenu.name),
                  parent_id: numberOrDefault(menu.id),
                  parent_name: notEmptyStringOrDefault(menu.name),
                }),
              ),
            }),
          )
        } else {
          const levelOneGroup: LevelOneGroup[] = []

          data.data.forEach((e: GenericObject) => {
            if (e.level === 0) {
              levelZeroGroup.push({
                id: numberOrDefault(e.id),
                name: notEmptyStringOrDefault(e.name),
                children: [],
              })
            } else {
              levelOneGroup.push({
                id: numberOrDefault(e.id),
                name: notEmptyStringOrDefault(e.name),
                parent_id: numberOrDefault(e.parent_id),
                parent_name: isObject(e.parent)
                  ? notEmptyStringOrDefault(e.parent.name)
                  : '-',
              })
            }
          })

          levelOneGroup.forEach((menu) => {
            const index = levelZeroGroup.findIndex(
              (e) => e.id === menu.parent_id,
            )

            if (index > -1) {
              levelZeroGroup[index].children.push(menu)
            } else {
              levelZeroGroup.push({
                id: menu.parent_id,
                name: menu.parent_name,
                children: [menu],
              })
            }
          })
        }

        setMenusList([...levelZeroGroup])
      }
    } catch (error) {
      console.error(error)
    }

    setLoading((prev) => ({ ...prev, data: false }))
  }, [search, sort, appliedFilters])

  useEffect(() => {
    loadData()
  }, [loadData])

  const loadSelected = async () => {
    try {
      const ids = await loadSelectedMenus()

      setSelectedMenus(ids)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadSelected()
  }, [])

  return (
    <Modal.Modal open size='large'>
      <Modal.Header content='Gerenciar Menus' color='blue' />
      <Modal.Body $height='400px' $maxHeight='400px' $minHeight='400px'>
        <Grid.Row justify='between' align='center'>
          <S.Title>{props.title}</S.Title>

          <S.FiltersContainer>
            <SearchFilter transparent {...{ search, setSearch }} />
            <AppliedFilters {...{ appliedFilters, setAppliedFilters }} />
            <MenuFilters {...{ filters, appliedFilters, setAppliedFilters }} />
          </S.FiltersContainer>
        </Grid.Row>

        <S.GridRowStyled itemSpacing={18}>
          {loading.data && <MwLoader filled />}

          <div style={{ width: '100%', display: 'flex' }}>
            {menusList.length < 1 ? (
              <S.EmptyMessage
                children={
                  search
                    ? 'Nenhum resultado encontrado para a busca realizada'
                    : 'Nenhum resultado encontrado'
                }
              />
            ) : search ? (
              <WithSearch
                list={menusList}
                selectedState={[selectedMenus, setSelectedMenus]}
                sortState={[sort, setSort]}
              />
            ) : (
              <WithoutSearch
                list={menusList}
                selectedState={[selectedMenus, setSelectedMenus]}
              />
            )}
          </div>
        </S.GridRowStyled>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          content='Cancelar'
          appearance='borderless'
          onClick={onClose}
        />
        <MwButton
          content='Salvar'
          loading={loading.form}
          disabled={loading.form || loading.data}
          onClick={async () => {
            setLoading((prev) => ({ ...prev, form: true }))
            try {
              await onSubmit(selectedMenus)
              onClose()
            } catch (e) {
              console.error(e)
              toast(<ToasterContent color='error' />, ErrorStyle)
              setLoading((prev) => ({ ...prev, form: false }))
            }
          }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ManageMenus
