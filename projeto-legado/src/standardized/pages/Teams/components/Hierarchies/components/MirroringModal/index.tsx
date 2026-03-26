import { useCallback } from 'react'

import toast from 'react-hot-toast'

import GridSelector from '../../../../../../../components/GridSelector'
import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { getMirroringSubtitle } from '../../../../functions'
import { MirroringPopupProps } from '../MirroringPopup/types'

import { identify } from './components/functions'
import useLeft from './components/left'
import useRight from './components/right'
import useMirroringModalContext, { MirroringModalProvider } from './context'
import { saveMirrorings } from './service'
import * as S from './styled'

const MirroringModalComponent = () => {
  const {
    onClose,
    reload,
    hierarchyId,
    hierarchiesUser,
    structure,
    originals: [originals],
    selected: [selected, setSelected],
    loading: [loading, setLoading],
  } = useMirroringModalContext()

  const title = getMirroringSubtitle(structure, hierarchiesUser)

  const handleSave = useCallback(async () => {
    setLoading(true)

    // keep original ids
    const parsed = selected.map(
      (x) => originals.find((y) => x.user.id === y.user.id) || x,
    )

    try {
      await saveMirrorings(hierarchyId, hierarchiesUser.user.id, parsed)
      onClose()
      reload()
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.error(error)
    }

    setLoading(false)
  }, [hierarchyId, hierarchiesUser.user.id, selected, originals, reload])

  const dirty =
    selected.length !== originals.length ||
    selected.some((x) => !originals.some((y) => identify(x, y)))

  return (
    <Modal.Modal
      open
      style={{
        width: '1095px',
        // height: '612px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Espelhar</Modal.Header>

      <Modal.Body
        $paddingTop='0'
        $paddingRight='0'
        $paddingLeft='0'
        $paddingBottom='0'
      >
        <S.SubTitle>
          <div>
            <b>{title}</b>
          </div>

          <div>
            <span>
              Utilize os campos abaixo para compartilhar a visão do nível com os
              usuários
            </span>
          </div>
        </S.SubTitle>

        <GridSelector.Container
          selected={[selected, setSelected]}
          left={useLeft}
          right={useRight}
        />
      </Modal.Body>

      <Modal.Footer
        buttonType='MwButton'
        actions={[
          {
            appearance: 'borderless',
            content: 'Cancel',
            onClick: onClose,
          },
          {
            content: 'Salvar',
            loading: loading,
            disabled: !dirty,
            onClick: handleSave,
          },
        ]}
      />
    </Modal.Modal>
  )
}

const MirroringModal = (
  props: MirroringPopupProps & {
    onClose: () => void
    reload: () => void
  },
) => {
  return (
    <MirroringModalProvider {...props} children={<MirroringModalComponent />} />
  )
}

export default MirroringModal
