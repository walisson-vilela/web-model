import { MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../../../components/Popup'
import useFormContext from '../../../../../context'

import * as S from './styled'

const PopupInvalid = () => {
  const {
    form: { watch },
  } = useFormContext()

  const source_address = watch('source_address')

  return (
    <Popup
      trigger={
        <MwIcon type='feather' icon='alert_triangle' color='warningRed' />
      }
      content={
        <S.Container>
          <div>Endereço Incompatível</div>
          <div>{source_address ? source_address.formatted : '-'}</div>
        </S.Container>
      }
      on='click'
      inverted
      position='right center'
      hideOnScroll
    />
  )
}

export default PopupInvalid
