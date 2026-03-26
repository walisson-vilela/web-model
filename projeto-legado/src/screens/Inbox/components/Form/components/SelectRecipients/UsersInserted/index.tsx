import React, { useCallback, useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { strCmp } from '../../../../../../../utils/Validators'
import { Recipients } from '../../../interfaces'
import { RowProps } from '../interfaces'
import * as S from '../styles'

const UsersInserted = (props: {
  selected: [Recipients[], React.Dispatch<React.SetStateAction<Recipients[]>>]
}) => {
  const {
    selected: [selected, setSelected],
  } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<RowProps>>([])
  const [checked, setChecked] = useState<RowProps[]>([])

  const [search, setSearch] = useState('')

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const parsed = selected
        .map((e) => {
          const name = notEmptyStringOrDefault(e.name)

          const data = {
            id: numberOrDefault(e.id),
            name,
            subtitle: notEmptyStringOrDefault(e.subtitle),
            formatted_address: notEmptyStringOrDefault(e.formatted_address),
          }
          return {
            data,
            content: (
              <S.ContentContainer>
                <MwEllipsisContainer
                  children={
                    <S.Row>
                      <span>{data.name}</span>
                      <small>{data.subtitle}</small>
                    </S.Row>
                  }
                />
              </S.ContentContainer>
            ),
          }
        })
        .filter(
          (e) => e.data.id && strCmp(e.data.name, search, { contain: true }),
        )

      setRows([...parsed])
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [search, selected])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.id]: e }
      }, {} as { [key: Recipients['id']]: Recipients })

      checked.forEach((e) => {
        delete newState[e.id]
      })

      return Object.keys(newState).map((k) => newState[k])
    })
    setChecked([])
  }

  return (
    <>
      <div>
        <GridSelector
          {...{
            rows,
            checked: [checked, setChecked],
            loading,
            messages: {
              empty: search.length
                ? 'Nenhum PDV encontrado para a busca realizada'
                : 'Nenhum PDV encontrado',
            },
            toolbar: {
              checkAll: true,
              search: {
                submitted: [search, setSearch],
              },
            },
          }}
        />
      </div>
      <div>
        <MwButton
          type='button'
          content='Remover'
          color='red'
          onClick={onSubmit}
          disabled={checked.length === 0}
        />
      </div>
    </>
  )
}

export default UsersInserted
