import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Form, Table } from 'semantic-ui-react'

import Input from '../../../../components/ControlledInputs/Input'
import useContext from '../../context'
import * as S from '../../styled'

const ComplementData = () => {
  const { form, getIntlTelInput } = useContext()
  const {
    formState: { errors, isValid },
  } = form

  return (
    <S.SubSection>
      <S.Title>Dados Complementares</S.Title>

      <S.Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={6}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Sponsor</b>
                </EllipsisContainer>

                <Form.Field error={'client_contact_6_name' in errors}>
                  <Input
                    type='text'
                    name='client_contact_6_name'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 1</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_6_phone1' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_6_phone1')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 2</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_6_phone2' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_6_phone2')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>E-mail</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_6_email' in errors && !isValid}
                >
                  <Input
                    type='email'
                    name='client_contact_6_email'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell width={6}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Ponto Focal</b>
                </EllipsisContainer>

                <Form.Field error={'client_contact_8_name' in errors}>
                  <Input
                    type='text'
                    name='client_contact_8_name'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 1</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_8_phone1' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_8_phone1')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 2</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_8_phone2' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_8_phone2')}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>E-mail</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_8_email' in errors && !isValid}
                >
                  <Input
                    type='email'
                    name='client_contact_8_email'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell width={6}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>TI</b>
                </EllipsisContainer>

                <Form.Field error={'client_contact_10_name' in errors}>
                  <Input
                    type='text'
                    name='client_contact_10_name'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 1</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_10_phone1' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_10_phone1', {
                    fluid: true,
                  })}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>Telefone 2</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_10_phone2' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_10_phone2', {
                    fluid: true,
                  })}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item>
                <EllipsisContainer>
                  <b className='lb-text'>E-mail</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_10_email' in errors && !isValid}
                >
                  <Input
                    type='email'
                    name='client_contact_10_email'
                    form={form}
                    fluid
                    className='input-text'
                  />
                </Form.Field>
              </S.Item>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell width={6}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Compras</b>
                </EllipsisContainer>

                <Form.Field error={'client_contact_12_name' in errors}>
                  <Input
                    type='text'
                    name='client_contact_12_name'
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
                  <b>Telefone 1</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_12_phone1' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_12_phone1', {
                    fluid: true,
                  })}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={3}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b>Telefone 2</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_12_phone2' in errors && !isValid}
                >
                  {getIntlTelInput('client_contact_12_phone2', {
                    fluid: true,
                  })}
                </Form.Field>
              </S.Item>
            </Table.Cell>

            <Table.Cell width={4}>
              <S.Item style={{ marginBottom: 0 }}>
                <EllipsisContainer>
                  <b className='lb-text'>E-mail</b>
                </EllipsisContainer>

                <Form.Field
                  error={'client_contact_12_email' in errors && !isValid}
                >
                  <Input
                    type='email'
                    name='client_contact_12_email'
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

export default ComplementData
