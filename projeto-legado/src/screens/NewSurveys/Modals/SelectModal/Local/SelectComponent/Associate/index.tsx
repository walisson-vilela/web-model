import { useCallback, useContext, useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject, strCmp } from '../../../../../../../utils/Validators'
import { FormContext } from '../../context'
import { RelationProps, TabProps } from '../interface'
import * as S from '../styles'

export const Associate = ({
  config,
  hasDescription,
  hasShortName,
}: TabProps) => {
  const { selectedItems, setSelectedItems } = useContext(FormContext)

  const [rows, setRows] = useState<Rows<RelationProps>>([])
  const [checked, setChecked] = useState<RelationProps[]>([])

  const [search, setSearch] = useState<string>('')

  const getData = useCallback(async () => {
    const parsed =
      selectedItems &&
      selectedItems[config.label] &&
      selectedItems[config.label].items &&
      selectedItems[config.label].items
        .map((item) => {
          const data: RelationProps = {
            id: numberOrDefault(item.id),
            country_name: notEmptyStringOrDefault(item.country_name),
            name: notEmptyStringOrDefault(item.name),
            name_short: notEmptyStringOrDefault(item.name_short),
            country: isObject(item.country) && item.country,
            city: isObject(item.city) && item.city,
            state: isObject(item.state) && item.state,
            link_type: notEmptyStringOrDefault(item.link_type),
            abbreviation: notEmptyStringOrDefault(item.abbreviation),
          }

          return {
            data,
            content: (
              <S.ItemContainer>
                <MwEllipsisContainer
                  children={
                    <S.ItemRow>
                      {!hasDescription ? (
                        <span>
                          {data.id} - {data.name}
                        </span>
                      ) : hasShortName ? (
                        <>
                          <span>
                            {data.name} ({data.name_short || data.abbreviation})
                          </span>
                          <small>{data.country.name}</small>
                        </>
                      ) : (
                        <>
                          <span>{data.name}</span>
                          <small>
                            {isObject(data.city)
                              ? `${data.city.name} - ${data.state.name} - ${data.country.name}`
                              : isObject(data.state)
                              ? `${data.state.name} - ${data.country.name}`
                              : data.country.name}
                          </small>
                        </>
                      )}
                    </S.ItemRow>
                  }
                />
              </S.ItemContainer>
            ),
          }
        })
        .filter(
          (item) =>
            (item.data.id &&
              strCmp(item.data.name, search, { contain: true })) ||
            strCmp(item.data.id.toString(), search, { contain: true }),
        )

    setRows(parsed || [])
  }, [search, selectedItems])

  const RemoveItem = () => {
    setSelectedItems((prev) => {
      return {
        ...prev,
        [config.label]: {
          items: prev[config.label].items.filter(
            (item) => !checked.some((e) => e.id === item.id),
          ),
        },
      }
    })

    setChecked([])
  }
  useEffect(() => {
    getData()
  }, [getData])

  return (
    <S.GridContainer>
      <span>{config.associateTitle}</span>
      <GridSelector
        {...{
          rows,
          checked: [checked, setChecked],
          messages: {
            empty: search.length
              ? `${config.emptyMessage} para a busca realizada`
              : config.emptyMessage,
          },
          toolbar: {
            checkAll: true,
            search: {
              submitted: [search, setSearch],
            },
          },
          scrollHeight: '124px',
        }}
      />
      <S.ButtonContainer>
        <MwButton
          color='red'
          appearance='solid'
          content='Remover'
          disabled={checked.length === 0}
          onClick={RemoveItem}
        />
      </S.ButtonContainer>
    </S.GridContainer>
  )
}
