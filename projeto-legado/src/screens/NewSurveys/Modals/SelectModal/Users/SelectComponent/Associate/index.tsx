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

export const Associate = ({ config, hasDescription }: TabProps) => {
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
            name: notEmptyStringOrDefault(item.name),
            role: isObject(item.role) && item.role,
            link_type: notEmptyStringOrDefault(item.link_type),
          }

          return {
            data,
            content: (
              <S.ItemContainer>
                <MwEllipsisContainer
                  children={
                    <S.ItemRow>
                      {hasDescription ? (
                        <S.ItemRow>
                          <span>
                            {data.id} - {data.name}
                          </span>
                          <small>
                            <MwEllipsisContainer
                              children={data?.role.name || '-'}
                            />
                          </small>
                        </S.ItemRow>
                      ) : (
                        <span>
                          {data.id} - {data.name}
                        </span>
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

  const emptyMessage = search.length
    ? `${config.emptyMessage} para a busca realizada`
    : config.emptyMessage

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
            empty: emptyMessage,
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
