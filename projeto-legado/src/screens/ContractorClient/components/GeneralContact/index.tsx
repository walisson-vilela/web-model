import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Form, Table } from 'semantic-ui-react'

import Input from '../../../../components/ControlledInputs/Input'
import useContext from '../../context'
import * as S from '../../styled'

const GeneralContact = () => {
  const { form, getIntlTelInput } = useContext()
  const {
    formState: { errors },
  } = form

  return (
    <S.SubSection>
      <S.Title>Contato Geral</S.Title>

      <S.Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 1</b>
                </EllipsisContainer>

                <Form.Field error={'phone1' in errors} className='input-field'>
                  {getIntlTelInput('phone1')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 2</b>
                </EllipsisContainer>

                <Form.Field error={'phone2' in errors} className='input-field'>
                  {getIntlTelInput('phone2')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>E-mail</b>
                </EllipsisContainer>

                <Form.Field error={'email' in errors} className='input-field'>
                  <Input
                    type='email'
                    name='email'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={6} />
          </Table.Row>
        </Table.Body>
      </S.Table>
    </S.SubSection>
  )
}

export default GeneralContact
