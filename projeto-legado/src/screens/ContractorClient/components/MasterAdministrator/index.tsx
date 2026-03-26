import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Form, Table } from 'semantic-ui-react'

import IntlTelInput from '../../../../components/IntlTelInput'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'
import { MasterAdminInterface } from '../../interfaces'
import * as S from '../../styled'

interface MasterAdministratorInterface {
  data: MasterAdminInterface
}

const MasterAdministrator = ({ data }: MasterAdministratorInterface) => {
  return (
    <S.SubSection>
      <S.Title>Administrador Master</S.Title>

      <S.Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={6}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Nome</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.name, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Telefone</b>
                </EllipsisContainer>

                <Form.Field>
                  <IntlTelInput
                    id='phone_adm_master'
                    name=''
                    fluid
                    disabled
                    borderless
                    value={notEmptyStringOrDefault(data.mobile_phone, '')}
                    setValue={() => null}
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Setor</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.sector, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>E-mail</b>
                </EllipsisContainer>

                <EllipsisContainer>
                  <span>{notEmptyStringOrDefault(data.email, '-')}</span>
                </EllipsisContainer>
              </S.Item>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </S.Table>
    </S.SubSection>
  )
}

export default MasterAdministrator
