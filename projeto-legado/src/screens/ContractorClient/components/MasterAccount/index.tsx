import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Table } from 'semantic-ui-react'

import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import useContext from '../../context'
import * as S from '../../styled'

import { getSpace } from './functions'

const MasterAccount = () => {
  const { data } = useContext()

  const accountMaster = data.account_master || {
    id: null,
    name: null,
  }

  return (
    <S.SubSection>
      <S.Title>Dados da Conta Master</S.Title>

      <S.Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Nome</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span style={{ color: '#192338CC' }}>
                    {notEmptyStringOrDefault(accountMaster.name, '-')}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>ID</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span style={{ color: '#192338CC' }}>
                    {numberOrDefault(accountMaster.id, '-')}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Espaço</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span style={{ color: '#192338CC' }}>
                    {[
                      getSpace(data.space_used) || '-',
                      getSpace(data.space_total) || '-',
                    ].join(' / ')}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Data da Criação</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span style={{ color: '#192338CC' }}>
                    {dateOrDefault(data.created_at, '-', 'DD/MM/YYYY - dddd')}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </S.Table>
    </S.SubSection>
  )
}

export default MasterAccount
