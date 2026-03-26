import React, { useEffect, useState } from 'react'

import { Icon, Popup } from 'semantic-ui-react'

import TableSelector from '../../../../components/TableSelector'
import { Row } from '../../../../components/TableSelector/interfaces'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'
import { Store } from '../interfaces'

import * as S from './styled'

interface SelectorProps {
  data: Store[]
  checkeds: Store[]
  setCheckeds: React.Dispatch<React.SetStateAction<Store[]>>
  loading: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  lastPage: boolean
}

const Selector = (props: SelectorProps) => {
  const {
    data,
    checkeds,
    setCheckeds,
    loading,
    setSearch,
    page,
    setPage,
    lastPage,
  } = { ...props }

  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    setRows(
      data.map((store) => {
        const content = (
          <S.Container disabled={store.disabled}>
            {notEmptyStringOrDefault(store.name, '-')}
            <br />
            <S.AddressContainer>
              {notEmptyStringOrDefault(store.formatted_address, '-')}
            </S.AddressContainer>

            {store.checkIcon && <Icon name='checkmark' />}
          </S.Container>
        )

        if (store.message) {
          return {
            data: store,
            content: (
              <Popup content={store.message} trigger={content} inverted />
            ),
          }
        }

        return {
          data: store,
          content,
        }
      }),
    )
  }, [data])

  return (
    <TableSelector
      selected={checkeds}
      setSelected={setCheckeds}
      rows={rows}
      setSearch={setSearch}
      loading={loading}
      pagination={{
        page,
        setPage,
        lastPage,
      }}
      emptyMessage='Nenhum PDV encontrado'
    />
  )
}

export default Selector
