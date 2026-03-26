import { useCallback, useContext, useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { strCmp } from '../../../../../../../utils/Validators'
import { FormContext } from '../../context'
import PopupSetting from '../PopupSetting'
import { RelationProps, TabProps } from '../interface'
import * as S from '../styles'

export const Associate = ({ config }: TabProps) => {
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
            contractor_id: numberOrDefault(item.contractor_id),
            name: notEmptyStringOrDefault(item.name),
            products_step: numberOrDefault(item.products_step),
            require_store: booleanOrDefault(item.require_store),
            default: numberOrDefault(item.default),
          }

          return {
            data,
            content: (
              <S.ItemContainer>
                <MwEllipsisContainer
                  children={
                    <S.ItemRow>
                      <span>
                        {data.id} - {data.name}
                      </span>

                      <small>
                        Regra: {data.require_store ? 'Com' : 'Sem'} vínculo de
                        PDV, {data.products_step ? 'com' : 'sem'} vínculo de
                        produto.
                      </small>
                    </S.ItemRow>
                  }
                />
              </S.ItemContainer>
            ),
            after: <PopupSetting config={config} id={data.id} />,
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
              ? 'Nenhum Formulário encontrado para a busca realizada'
              : 'Nenhum Formulário encontrado',
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
