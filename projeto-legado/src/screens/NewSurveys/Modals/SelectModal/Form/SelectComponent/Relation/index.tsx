import { useCallback, useContext, useEffect, useState } from 'react'

import { Icon, MwButton, MwEllipsisContainer } from '@mw-kit/mw-ui'
import { AppliedFilter } from '@mw-kit/mw-ui/types'

import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { FormContext } from '../../context'
import { RelationProps, TabProps } from '../interface'
import * as S from '../styles'

import { GetRelationsItems } from './service'

export const Relation = ({ config, edit }: TabProps) => {
  const { selectedItems, setSelectedItems } = useContext(FormContext)

  const [dataRequest, setDataRequest] = useState([])

  const [rows, setRows] = useState<Rows<RelationProps>>([])
  const [checked, setChecked] = useState<RelationProps[]>([])

  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await GetRelationsItems({
        route: config.endPoint,
        appliedFilters,
        search,
        page,
      })

      const { has_next_page = false } = response.pagination || {}

      setIsLastPage(!has_next_page)

      setDataRequest(
        page === 1 ? response.data : (prev) => prev.concat(response.data),
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [search, appliedFilters, page])

  const AddItem = () => {
    const getFirst = checked[0]
    const canAdd = checked.filter(
      (item) =>
        item.products_step === getFirst.products_step &&
        item.require_store === getFirst.require_store,
    )

    setSelectedItems((prev) => {
      return {
        ...prev,
        [config.label]: {
          items: prev[config.label].items
            .filter((item) => checked.map((i) => i.id !== item.id))
            .concat(canAdd),
        },
      }
    })

    setChecked([])
  }

  useEffect(() => {
    const parsed = dataRequest.map((item) => {
      const data: RelationProps = {
        id: numberOrDefault(item.id),
        contractor_id: numberOrDefault(item.contractor_id),
        name: notEmptyStringOrDefault(item.name),
        products_step: numberOrDefault(item.products_step),
        require_store: booleanOrDefault(item.require_store),
        default: numberOrDefault(item.default),
        display: notEmptyStringOrDefault(item.display, 'N'),
        first_attendance: notEmptyStringOrDefault(item.first_attendance, 'N'),
        complete_filling_only: notEmptyStringOrDefault(
          item.complete_filling_only,
          'N',
        ),
        first_attendance_percentage: numberOrDefault(
          item.first_attendance_percentage,
          10,
        ),
        confirmWarnign: booleanOrDefault(item.confirmWarnign, false),
      }

      const firstAdded =
        selectedItems?.Default?.items[0] ||
        selectedItems?.Personalizado?.items[0]

      const rules = firstAdded
        ? firstAdded.products_step !== data.products_step ||
          firstAdded.require_store !== data.require_store
        : false

      const selected =
        selectedItems &&
        selectedItems[config.label] &&
        selectedItems[config.label].items &&
        selectedItems[config.label].items.find((item) => item.id === data.id)
          ? true
          : false

      const disabled = selected || rules

      return {
        data,
        disabled,
        content: (
          <S.ItemContainer>
            <MwEllipsisContainer
              children={
                <S.ItemRow>
                  <span>
                    {item.id} - {item.name}
                  </span>

                  <small>
                    Regra: {item.require_store ? 'Com' : 'Sem'} vínculo de PDV,{' '}
                    {item.products_step ? 'com' : 'sem'} vínculo de produto.
                  </small>
                </S.ItemRow>
              }
            />
            {selected && <Icon disabled name='checkmark' />}
          </S.ItemContainer>
        ),
      }
    })

    setRows(parsed || [])
  }, [dataRequest, selectedItems])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <S.GridContainer>
      <span>{config.relationTitle}</span>
      <GridSelector
        {...{
          rows,
          checked: [checked, setChecked],
          loading: loading,
          messages: {
            empty:
              appliedFilters.length || search.length
                ? 'Nenhum Formulário encontrado para a busca realizada'
                : 'Nenhum Formulário encontrado',
          },
          toolbar: {
            checkAll: true,
            search: {
              collapse: config.filters.length > 0 && true,
              submitted: [search, setSearch],
            },
            filters: {
              items: config.filters,
              setAppliedFilters,
              containerProps: {
                position: 'right bottom',
              },
            },
            appliedFilters: {
              appliedFilters: [appliedFilters, setAppliedFilters],
              containerProps: {
                position: 'right bottom',
              },
            },
          },
          pagination: { lastPage: isLastPage, page: [page, setPage] },
          scrollHeight: '124px',
        }}
      />
      <S.ButtonContainer>
        <MwButton
          appearance='solid'
          content='Adicionar'
          onClick={AddItem}
          disabled={checked.length === 0}
        />
      </S.ButtonContainer>
    </S.GridContainer>
  )
}
