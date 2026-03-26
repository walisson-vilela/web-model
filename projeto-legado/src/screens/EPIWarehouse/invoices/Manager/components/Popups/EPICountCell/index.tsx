import { SearchFilter } from '@mw-kit/mw-manager'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEPIQuantity } from '../../../../../../../redux/actions/EPIWarehouseActions'
import EPIQuantityTable from '../EPIQuantityTable'
import { FlagsDataProps } from './interfaces'
import * as S from './styles'


const EPICountCell = ({ subtitle, link_id }: FlagsDataProps) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await dispatch(fetchEPIQuantity({ link_id }) as any)
        console.log('response', response)
        setData(response)
        console.log('data',data)
      } catch (error) {
        console.error('Erro ao carregar quantidades:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dispatch, link_id])



  const filteredData = data.filter((item: any) =>
    item.size.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <S.Container>
      <S.Header>
        <div>
          <p><b>{subtitle}</b></p>
        </div>
        <div>
          <SearchFilter setSearch={setSearch} size='mini' />
        </div>
      </S.Header>

      <S.Body>
        <EPIQuantityTable data={filteredData} loading={loading} />
      </S.Body>
    </S.Container>
  )
}

export default EPICountCell
