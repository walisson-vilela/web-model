import { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { FiCamera } from 'react-icons/fi'
import { Loader } from 'semantic-ui-react'

import { Row } from './interfaces'
import { getRows } from './services'
import * as S from './styles'

interface PopupProps {
  id: number
  account: string
}

const Content = ({ account, id }: PopupProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>()
  const [rows, setRows] = useState<Row[]>([])

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const rows = await getRows(id, search)
      setRows(rows)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <S.PopupContainer>
      <S.PopupHeader>
        <S.PopupInfo>
          <strong>Lista de Responsáveis</strong>
          <span>
            Agrupamento: <strong>{account}</strong>
          </span>
        </S.PopupInfo>
        <S.PopupSearch>
          <SearchFilter setSearch={setSearch} search={search} />
        </S.PopupSearch>
      </S.PopupHeader>
      <S.PopupBody>
        {loading ? (
          <Loader active />
        ) : (
          rows.map((row) => (
            <S.PopupList key={row.id}>
              {row.avatar && row.avatar.url ? (
                <img src={row.avatar.url} />
              ) : (
                <S.RoundedImage>
                  <FiCamera size={16} color='#B2B2B2' />
                </S.RoundedImage>
              )}
              <strong>{row.name ? row.name : '-'}</strong>
            </S.PopupList>
          ))
        )}
      </S.PopupBody>
    </S.PopupContainer>
  )
}

export default Content
