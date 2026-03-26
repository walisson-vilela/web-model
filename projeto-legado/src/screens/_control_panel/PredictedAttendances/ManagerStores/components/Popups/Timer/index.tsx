import React, { useCallback, useEffect, useState } from 'react'

import { Loader, Table } from 'semantic-ui-react'

import { ComponentProps, HttpResponse } from './interface'
import { request } from './services'
import * as S from './styles'

export function Timer({ params, checkType }: ComponentProps) {
  const [data, setData] = useState<HttpResponse>({} as HttpResponse)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    try {
      const response = await request(245)
      setData(response)
    } catch (error) {
      return <h1> Erro ao Encontrar o registro</h1>
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])
  return (
    <S.Container>
      {loading ? (
        <S.LoaderContainer>
          {' '}
          <Loader active />
        </S.LoaderContainer>
      ) : (
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell
                width={4}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E2E2E2',
                  borderBottomType: 'solid',
                }}
              >
                <strong>
                  Código: <span> {data.store_id || '-'} </span>
                </strong>
              </Table.Cell>
              <Table.Cell width={12}>
                <strong>{data.store_name || '-'}</strong>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell width={4}>
                <strong> Dados do registro </strong>
              </Table.Cell>
              <Table.Cell width={12}>
                <p>
                  Check In realizado via{' '}
                  {checkType === 'check-in'
                    ? data.check_in_type_srt || '-'
                    : data.check_out_type_srt || '-'}
                </p>
                <p>
                  Condição:{' '}
                  {checkType === 'check-in'
                    ? data.check_in_notification || '-'
                    : data.check_out_notification || '-'}
                </p>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </S.Container>
  )
}
