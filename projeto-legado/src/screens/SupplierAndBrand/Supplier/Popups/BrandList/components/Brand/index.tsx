import { useCallback, useEffect, useState } from 'react'

import { MwScrollContainer } from '@mw-kit/mw-ui'
import { FiCamera } from 'react-icons/fi'

import Search from '../../../../../../../standardized/components/Search'

import { BrandListProps } from './interface'
import { brandsCount } from './service'
import * as S from './styles'

const BrandList = (props: BrandListProps) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState<BrandListProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState<boolean>(false)

  const paginator = useCallback(() => {
    if (lastPage) return
    setPage((prev) => prev + 1)
  }, [lastPage])

  const getData = useCallback(async () => {
    setLoading(true)

    try {
      const { data, pagination } = await brandsCount(search, props.id, page)
      setData(page === 1 ? data : (prev) => [...prev, ...data])
      setLastPage(!pagination.has_next_page)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [search, page])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <S.Container>
      <S.Header>
        <div>
          <div>Lista de Marcas</div>

          <div>
            Fabricante: <strong>{props.name}</strong>
          </div>
        </div>

        <Search submitted={[search, setSearch]} />
      </S.Header>

      <MwScrollContainer
        loading={loading}
        spacing={{
          left: 's1',
        }}
        onScrollEnd={paginator}
      >
        {data.map((item) => (
          <S.Item key={item.id}>
            <S.Avatar source={item.file ? item.file.url : ''} size='small'>
              {!item.file && <FiCamera size={14} color='#B2B2B2' />}
            </S.Avatar>

            <strong>{item.name}</strong>
          </S.Item>
        ))}
      </MwScrollContainer>
    </S.Container>
  )
}

export default BrandList
