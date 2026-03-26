import { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { MwScrollContainer } from '@mw-kit/mw-ui'
import { FiCamera } from 'react-icons/fi'

import Popup from '../../../../../../../components/Popup'
import { Link } from '../styled'

import { CountData, CountDataProps } from './interfaces'
import { getContractors } from './service'
import * as S from './styles'

const CountDataRow = ({ store_id }: CountDataProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<CountData[]>([])
  const [search, setSearch] = useState<string>('')
  const [paginate, setPaginate] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data, pagination } = await getContractors(
        store_id,
        search,
        paginate.page,
      )

      setData((prev) => (pagination.page === 1 ? data : [...prev, ...data]))
      setPaginate(pagination)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [paginate.page, search, store_id])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Container>
      <S.Header>
        <div>
          <p>
            <b>Contas Associadas</b>
          </p>
          <p>
            Qtd de contas: <b>{paginate.count}</b>
          </p>
        </div>

        <div>
          <SearchFilter setSearch={setSearch} size='mini' />
        </div>
      </S.Header>

      <MwScrollContainer
        height='198px'
        loading={loading}
        onScrollEnd={() =>
          setPaginate((prev) =>
            prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev,
          )
        }
      >
        {data.map((item, index) => {
          return (
            <S.Row key={index}>
              {item.image ? (
                <Popup
                  trigger={
                    <Link>
                      <S.Avatar source={item.image} size='small' />
                    </Link>
                  }
                  content={<S.Avatar source={item.image} size='large' />}
                  on='hover'
                  position='right center'
                  style={{ padding: 7 }}
                />
              ) : (
                <S.Avatar source='' size='small'>
                  <FiCamera size={14} color='#B2B2B2' />
                </S.Avatar>
              )}

              <div>
                <p>
                  <b>{item.name}</b>
                </p>
              </div>
            </S.Row>
          )
        })}
      </MwScrollContainer>
    </S.Container>
  )
}

export default CountDataRow
