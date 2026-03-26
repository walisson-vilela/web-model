import { StrictPopupProps } from 'semantic-ui-react'

import Popup from '../../../../../../components/Popup'

const PopupDisabled = (
  props: Pick<StrictPopupProps, 'position' | 'trigger' | 'disabled'>,
) => {
  return (
    <Popup
      {...props}
      on='click'
      content='Campo indisponivel para edição na Base Unificada'
      inverted
      trigger={<div style={{ width: '100%' }}>{props.trigger} </div>}
    />
  )
}

export default PopupDisabled
