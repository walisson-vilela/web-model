import Input from '../../../../components/ControlledInputs/Input'
import useContext from '../../context'
import * as S from '../../styled'
import Field from '../Field'

const GeneralContact = (): JSX.Element => {
  const { getIntlTelInput, form } = useContext()

  return (
    <S.SubSection>
      <S.Title>Contatos</S.Title>

      <S.RowSection>
        <S.ItemFone style={{ marginBottom: 0 }}>
          <Field name='phone'>{getIntlTelInput('phone')}</Field>
        </S.ItemFone>

        <S.ItemFone style={{ marginBottom: 0 }}>
          <Field name='mobile_phone'>{getIntlTelInput('mobile_phone')}</Field>
        </S.ItemFone>

        <S.ItemEmail style={{ marginBottom: 0 }}>
          <Field name='email'>
            <Input
              type='email'
              name='email'
              form={form}
              fluid
              className='input-text'
            />
          </Field>
        </S.ItemEmail>
      </S.RowSection>
    </S.SubSection>
  )
}

export default GeneralContact
