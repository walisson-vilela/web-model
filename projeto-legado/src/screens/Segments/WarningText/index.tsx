import React from 'react'

import { Popup } from 'semantic-ui-react'

import * as S from './styled'

interface WarningTextProps {
  message?: string
  content: string | number | JSX.Element
}

const WarningText = (props: WarningTextProps) => (
  <Popup
    content={
      props.message ||
      'Este valor está sendo recalculado e será atualizado em breve'
    }
    trigger={<S.WarningText>{props.content}</S.WarningText>}
    inverted
  />
)

export default WarningText
