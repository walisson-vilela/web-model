import { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../../../../components/MwModal'
import * as Types from '../interface'

import Flags from './Flags'
import { ManageAreaProvider } from './context'
import * as S from './styles'

interface IManageArea {
  close: () => void
  onSubmit: (selected: Types.Flags[], rule: Types.Rule) => void
  selected: Types.Flags[]
  rule: Types.Rule
  country_name: string
}

const FlagsManager = (props: IManageArea) => {
  const { close } = props

  const [selected, setSelected] = useState<Types.Flags[]>([...props.selected])

  const [rule, setRule] = useState<Types.Rule>(props.rule)

  const onSubmit = useCallback(() => {
    props.onSubmit(selected, rule)
    close()
  }, [props.onSubmit, selected, rule])

  return (
    <Modal.Modal
      open
      size='tiny'
      style={{
        width: '1095px',
        //height: '603px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Bandeira</Modal.Header>

      <Modal.Body
        $paddingTop='s4'
        $paddingBottom='0'
        $paddingLeft='0'
        $paddingRight='0'
      >
        <S.TitleContainer>
          <Modal.Subtitle>
            País: <b>{props.country_name || '-'}</b>
          </Modal.Subtitle>
        </S.TitleContainer>

        <ManageAreaProvider
          value={{
            rule: [rule, setRule],
          }}
        >
          <Flags selected={[selected, setSelected]} />
        </ManageAreaProvider>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='link'
          content='Cancelar'
          onClick={close}
          size='large'
        />

        <MwButton
          type='button'
          content='Confirmar'
          onClick={onSubmit}
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default FlagsManager
