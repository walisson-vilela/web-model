import { MwIcon, MwInput } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import useFormContext from '../../context'

import * as S from './styles'

const CheckInRequired = () => {
  const { useField } = useFormContext()

  const [value, setValue] = useField('check_in_required')

  return (
    <S.Container>
      <MwInput
        type='checkbox'
        label='Check-in Obrigatório.'
        onChange={(e) => setValue(e.target.checked)}
        checked={value}
        required={false}
      />

      <Popup
        on='click'
        position='right center'
        trigger={
          <MwIcon
            type='feather'
            icon='info'
            width='12px'
            height='12px'
            color='darkBlue'
          />
        }
        content={
          <S.PopupContent>
            Todos os usuários impactados deverão fazer o check-in
            obrigatoriamente ao chegar no endereço do evento.
          </S.PopupContent>
        }
        style={{ width: 261, minWidth: 261, maxWidth: 261, padding: 0 }}
        inverted
      />
    </S.Container>
  )
}

export default CheckInRequired
