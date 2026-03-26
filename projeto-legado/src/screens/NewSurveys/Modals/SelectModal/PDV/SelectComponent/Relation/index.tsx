import { useCallback, useContext, useEffect, useState } from 'react'

import { Icon, MwButton, MwEllipsisContainer, Popup } from '@mw-kit/mw-ui'
import { AppliedFilter } from '@mw-kit/mw-ui/types'
import { isObject } from 'lodash'

import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { FormContext } from '../../context'
import { RelationProps, TabProps } from '../interface'
import * as S from '../styles'

import { GetRelationsItems } from './service'

export const Relation = ({ config, hasDetails }: TabProps) => {
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

      response.data.map((item) => {
        item.link_type = config.linkType
      })

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
    setSelectedItems((prev) => {
      return {
        ...prev,
        [config.label]: {
          items: prev[config.label]?.items
            ? prev[config.label].items
                .filter((item) => checked.map((i) => i.id !== item.id))
                .concat(checked)
            : checked,
        },
      }
    })

    setChecked([])
  }

  useEffect(() => {
    const parsed = dataRequest.map((item) => {
      const data: RelationProps = {
        id: numberOrDefault(item.id),
        name: notEmptyStringOrDefault(item.name),
        formatted_address: notEmptyStringOrDefault(item.formatted_address),
        document: notEmptyStringOrDefault(item.document),
        classification: isObject(item.classification) && item.classification,
        link_type: notEmptyStringOrDefault(item.link_type),
      }

      const disabled =
        selectedItems &&
        selectedItems[config.label] &&
        selectedItems[config.label].items &&
        selectedItems[config.label].items.find((item) => item.id === data.id)
          ? true
          : false

      return {
        data,
        disabled,
        content: (
          <S.ItemContainer>
            <MwEllipsisContainer
              children={
                <S.ItemRow>
                  {hasDetails ? (
                    <Popup
                      on='hover'
                      inverted
                      position='left center'
                      trigger={
                        <S.ItemRow>
                          <span>
                            {data.name} | ID: {data.id}
                          </span>
                          <small>
                            <MwEllipsisContainer
                              children={data.formatted_address}
                            />
                          </small>
                        </S.ItemRow>
                      }
                      content={
                        <S.PopupContainer>
                          <strong>{data.name}</strong>
                          <div>
                            <span>Endereço: {data.formatted_address}</span>
                            <span>Cep:</span>
                          </div>
                          <span>CNPJ: ({data.document})</span>
                          <span>
                            ID: {data.id} | {data?.classification?.name}
                          </span>
                        </S.PopupContainer>
                      }
                    />
                  ) : (
                    <span>
                      {data.id} - {data.name}
                    </span>
                  )}
                </S.ItemRow>
              }
            />
            {disabled && <Icon disabled name='checkmark' />}
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
                ? `${config.emptyMessage} para a busca realizada`
                : config.emptyMessage,
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
