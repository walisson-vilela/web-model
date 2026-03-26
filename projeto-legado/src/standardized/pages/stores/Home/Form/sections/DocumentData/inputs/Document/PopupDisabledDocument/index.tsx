import Popup from '../../../../../../../../../components/Popup'
import { Form } from '../../../../../interfaces'

import * as S from './styled'

interface IPopupDisabledDocument {
  children: React.ReactNode
  disabled: boolean
  source_status: Form['source_status']
}

const colors: Partial<{
  [K in Exclude<Form['source_status'], null>]: string
}> = {
  VALID: 'Verde',
  UPDATED: 'Roxo',
}

const PopupDisabledDocument = (props: IPopupDisabledDocument) => {
  const { children, disabled, source_status } = props

  return (
    <Popup
      disabled={disabled}
      trigger={children}
      content={
        <S.PopupContent>
          Não é possivel editar um CNPJ Validado pela Receita Federal
          {source_status && source_status in colors
            ? ` (Selo ${colors[source_status]})`
            : ''}
        </S.PopupContent>
      }
      on='click'
      inverted
      position='right center'
    />
  )
}

export default PopupDisabledDocument
