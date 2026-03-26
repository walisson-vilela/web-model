import { MwIcon, MwInput } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../Popup'

import * as S from './styles'

const AuditsSwitch = (props: {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  disabled: boolean
}) => {
  const {
    open: [open, setOpen],
    disabled,
  } = props

  return (
    <S.Container>
      <Popup
        on='click'
        position='top left'
        inverted
        content='Não existe auditoria para esse PDV.'
        disabled={!disabled}
        trigger={
          <div>
            <MwInput
              type='switch'
              onChange={(e) => setOpen(e.target.checked)}
              checked={open}
              disabled={disabled}
              label={{
                after: 'Histórico de Auditoria',
              }}
            />
          </div>
        }
      />

      <Popup
        on='click'
        position='right center'
        inverted
        content='Exibe as ultima 3 auditorias efetuadas no PDV.'
        trigger={
          <MwIcon
            type='feather'
            icon='info'
            width='14px'
            height='14px'
            color='darkBlue'
            strokeWidth='2px'
          />
        }
      />
    </S.Container>
  )
}

export default AuditsSwitch
