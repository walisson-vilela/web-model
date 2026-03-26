import * as FormComponent from '../'

import * as Inputs from './components'
import * as S from './styled'

const FormBody = () => {
  return (
    <S.FormContainer>
      <S.Section>
        <Inputs.Status />
      </S.Section>

      <S.Section>
        <Inputs.Avatar />
      </S.Section>

      <S.Section>
        <Inputs.BasicData />
      </S.Section>

      <Inputs.AreaAndPosition />

      <FormComponent.FormFooter />
    </S.FormContainer>
  )
}

export default FormBody
