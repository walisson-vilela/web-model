import React, { useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'

import { Loader } from '../../../../../components/Loader'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'

import { RoutesDataProps } from './interfaces'
import { getRegionsByID as request } from './services'
import { Body, Container, Header } from './styles'

const RoutesData = ({ id, subtitle }: RoutesDataProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')

  const loadData = async () => {
    setLoading(true)

    try {
      const { data } = await request(id, search)

      setData(data.map((e) => e.name) || [])
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [search])

  return (
    <Container>
      <Header>
        <div>
          <p>
            <b>Qtde. Roteiros</b>
          </p>
          <p>
            Área de Atuação: <b>{subtitle}</b>
          </p>
        </div>

        <div>
          <SearchFilter setSearch={setSearch} size='mini' />
        </div>
      </Header>

      <Body>
        {loading ? (
          <Loader />
        ) : (
          data.map((item, index) => {
            return (
              <div key={`state-${index}`}>
                <p>{item}</p>
              </div>
            )
          })
        )}
      </Body>
    </Container>
  )
}

export default RoutesData
