import { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import useHierarchyContext from '../../../../../../../context'

import AssociationRadioButton from './Input'
import * as S from './styled'

interface IPopupAssociationContent {
  toggleOpen: () => void
}

const PopupAssociationContent = (props: IPopupAssociationContent) => {
  const { toggleOpen } = props

  const {
    manualElements: [manualElements, setManualElements],
  } = useHierarchyContext()

  const [checked, setChecked] = useState<boolean | undefined>(manualElements)

  const handleSave = useCallback(() => {
    if (checked === undefined) return
    setManualElements(checked)
    toggleOpen()
  }, [checked, setManualElements])

  return (
    <S.Container>
      <S.Header>
        <S.Title>Opções de configuração</S.Title>
      </S.Header>

      <S.Body>
        <div>Defina o modelo de associação do supervisor direto</div>
        <AssociationRadioButton
          type='Automatico'
          checked={checked}
          setChecked={setChecked}
        />
        <AssociationRadioButton
          type='Manual'
          checked={checked}
          setChecked={setChecked}
        />
      </S.Body>
      <S.Footer>
        <MwButton appearance='borderless' onClick={() => toggleOpen()}>
          Cancelar
        </MwButton>
        <MwButton onClick={handleSave} disabled={checked === manualElements}>
          Salvar
        </MwButton>
      </S.Footer>
    </S.Container>
  )
}

export default PopupAssociationContent
