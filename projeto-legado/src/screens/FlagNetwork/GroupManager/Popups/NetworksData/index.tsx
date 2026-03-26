import React, { useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'

import { Loader } from '../../../../../components/Loader'
import { search as SearchItem } from '../../../../../utils/Search'
import { DataInterface } from '../../interfaces'

import { NetworksDataProps } from './interfaces'
import * as S from './styles'

const NetworksData = ({ networks, subtitle }: NetworksDataProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<DataInterface[]>([])
  const [search, setSearch] = useState<string>('')

  const loadData = async () => {
    setLoading(true)

    try {
      let temp = networks || []

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
            <b>Lista de Redes</b>
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
            return (
              <div key={`state-${index}`}>
                <p>
                  <b>{item.name}</b>
                </p>
              </div>
            )
          })
        )}
      </S.Body>
    </S.Container>
  )
}

export default NetworksData
