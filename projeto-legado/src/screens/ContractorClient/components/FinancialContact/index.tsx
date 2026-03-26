import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Form, Table } from 'semantic-ui-react'

import Input from '../../../../components/ControlledInputs/Input'
import useContext from '../../context'
import * as S from '../../styled'

const FinancialContact = () => {
  const { form, getIntlTelInput } = useContext()
  const {
    formState: { errors, isValid },
  } = form

  return (
    <S.SubSection>
      <S.Title>Contato Financeiro</S.Title>

      <S.Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={6}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>Nome</b>
                </EllipsisContainer>

                <Form.Field error={'client_contact_4_name' in errors}>
                  <Input
                    type='text'
                    name='client_contact_4_name'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 1</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_4_phone1' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_4_phone1')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 2</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_4_phone2' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_4_phone2')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>E-mail</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_4_email' in errors && !isValid}
                >
                  <Input
                    type='email'
                    name='client_contact_4_email'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </S.Table>
    </S.SubSection>
  )
}

export default FinancialContact
