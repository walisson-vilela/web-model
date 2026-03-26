import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import GridSelector from '../../../../../../components/GridSelector'
import { Rows } from '../../../../../../components/GridSelector/interfaces'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { strCmp } from '../../../../../../utils/Validators'

import { CreateByCopyProps, DataInterface } from './interface'
import { listCopy } from './services'
import * as S from './styled'

export const CreateByCopy = ({
  setCopyByItem,
  setOpenPopupCopy,
}: CreateByCopyProps) => {
  const [search, setSearch] = useState<string>('')
  const [valueSearch, setValueSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [data, setData] = useState<DataInterface[]>([])
  const [rows, setRows] = useState<Rows<DataInterface>>([])
  const [selected, setSelected] = useState<DataInterface | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getItems = useCallback(async () => {
    setLoading(true)
    try {
      const response = await listCopy(search, page)
      const { has_next_page = false, count: total_register = 0 } =
        response.pagination || {}
      setIsLastPage(!has_next_page)
      setData(page === 1 ? response.data : (prev) => prev.concat(response.data))
    } catch (error) {
      console.log(error)
      toast(<ToasterContent />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [search, page])

  const SetRows = () => {
    const parsed =
      data.length !== 0 &&
      data
        .map((item) => {
          const data: DataInterface = {
            name: notEmptyStringOrDefault(item.name),
            id: numberOrDefault(item.id),
          }

          return {
            data,
            content: (
              <S.ContentContainer>
                <MwEllipsisContainer
                  style={{
                    width: 220,
                  }}
                  children={data.id + ' - ' + data.name}
                />
              </S.ContentContainer>
            ),
          }
        })
        .filter(
          (e) => e.data.id && strCmp(e.data.name, search, { contain: true }),
        )
    setRows(parsed || [])
  }

  const onApply = () => {
    setCopyByItem(selected)
    setOpenPopupCopy(false)
  }

  useEffect(() => {
    SetRows()
  }, [data])

  useEffect(() => {
    getItems()
  }, [getItems])

  return (
    <S.Container>
      <S.Header>
        <h1>Criar pesquisa por cópia</h1>
      </S.Header>
      <S.Content>
        <MwInput
          type='search'
          placeholder='Pesquisar'
          onPressEnter={() => setSearch(valueSearch)}
          icon={{
            icon: {
              type: 'feather',
              icon: 'search',
              onClick: () => setSearch(valueSearch),
            },
          }}
          setValue={setValueSearch}
          value={valueSearch}
          clearable={
            search.length === 0 || search !== valueSearch
              ? undefined
              : () => {
                  setSearch('')
                  setValueSearch('')
                }
          }
        />

        <S.ItemsContainer>
          <GridSelector
            {...{
              type: 'radio',
              rows,
              checked: [selected, setSelected],
              loading,
              messages: {
                empty: search.length
                  ? 'Nenhuma pesquisa encontrada para a busca realizada'
                  : 'Nenhuma pesquisa encontrada',
              },
              pagination: { lastPage: isLastPage, page: [page, setPage] },
            }}
          />
        </S.ItemsContainer>
      </S.Content>
      <S.footer>
        <MwButton
          style={{ width: '50%' }}
          appearance='solid'
          content='Aplicar'
          onClick={() => onApply()}
          disabled={!selected}
        />
      </S.footer>
    </S.Container>
  )
}
