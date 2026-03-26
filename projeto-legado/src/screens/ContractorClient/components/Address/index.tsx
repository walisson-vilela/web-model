import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Table } from 'semantic-ui-react'

import { cep, notEmptyStringOrDefault } from '../../../../utils/Formatters'
import { notEmptyString } from '../../../../utils/Validators'
import useContext from '../../context'
import * as S from '../../styled'

const Address = () => {
  const { data } = useContext()

  return (
    <S.SubSection>
      <S.Title>Endereço</S.Title>

      <S.Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>
              <S.Item>
                <EllipsisContainer>
                  <b>CEP</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>
                    {notEmptyString(data.postal_code)
                      ? cep(data.postal_code)
                      : '-'}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={2}>
              <S.Item>
                <EllipsisContainer>
                  <b>Tipo Logradouro</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.street_type, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={2}>
              <S.Item>
                <EllipsisContainer>
                  <b>Endereço</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>
                    {notEmptyStringOrDefault(data.street_address, '-')}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={1}>
              <S.Item>
                <EllipsisContainer>
                  <b>Número</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>
                    {notEmptyStringOrDefault(data.street_number, '-')}
                  </span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={2}>
              <S.Item>
                <EllipsisContainer>
                  <b>Complemento</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.complement, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={7} />
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Bairro</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.sublocality, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Cidade</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.city, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>UF</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.state, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </S.Table>
    </S.SubSection>
  )
}

export default Address
