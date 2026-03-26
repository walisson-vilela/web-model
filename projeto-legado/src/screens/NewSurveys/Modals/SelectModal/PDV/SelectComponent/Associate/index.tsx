import { useCallback, useContext, useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer, Popup } from '@mw-kit/mw-ui'

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

export const Associate = ({ config, hasDetails }: TabProps) => {
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
            formatted_address: notEmptyStringOrDefault(item.formatted_address),
            document: notEmptyStringOrDefault(item.document),
            classification:
              isObject(item.classification) && item.classification,
            link_type: notEmptyStringOrDefault(item.link_type),
          }

          return {
            data,
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
