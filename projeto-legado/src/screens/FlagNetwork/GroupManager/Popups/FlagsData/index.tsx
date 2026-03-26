import { useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { FiCamera } from 'react-icons/fi'

import { Loader } from '../../../../../components/Loader'
import Popup from '../../../../../components/ManagerColumnPopup'
import { search as SearchItem } from '../../../../../utils/Search'
import { Link } from '../../../styles'
import { DataInterface } from '../../interfaces'

import { FlagsDataProps } from './interfaces'
import * as S from './styles'

const FlagsEPIData = ({ networks, subtitle }: FlagsDataProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<DataInterface[]>([])
  const [search, setSearch] = useState<string>('')

  const loadData = async () => {
    setLoading(true)

    try {
      let temp =
        networks
          .map((net): DataInterface[] =>
            net.flags.map((flag) => ({ ...flag, parent_name: net.name })),
          )
          .flat(1) || []

      if (search) {
        temp = SearchItem(search, temp, 'name')
      }

      setData(temp)
    } catch (e) {
      console.log(e)
      alert('Erro ao buscar dados da rede')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [search])

  return (
    <S.Container>
      <S.Header>
        <div>
          <p>
            <b>Lista de Bandeiras</b>
          </p>
          <p>
            Grupo: <b>{subtitle}</b>
          </p>
        </div>

        <div>
          <SearchFilter setSearch={setSearch} size='mini' />
        </div>
      </S.Header>

      <S.Body>
        {loading ? (
          <Loader />
        ) : (
          data.map((item, index) => {
            console.log(item)
            return (
              <div key={`state-${index}`}>
                {item.avatar ? (
                  <Popup
                    trigger={
                      <Link>
                        <S.Avatar source={item.avatar.url} size='small' />
                      </Link>
                    }
                    getContent={async (): Promise<JSX.Element> => (
                      <S.Avatar source={item.avatar.url} size='large' />
                    )}
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
                  <p>{`Rede: ${item.parent_name}`}</p>
                </div>
              </div>
            )
          })
        )}
      </S.Body>
    </S.Container>
  )
}

export default FlagsEPIData
