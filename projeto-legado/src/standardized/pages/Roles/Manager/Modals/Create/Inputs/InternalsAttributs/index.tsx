import { useState } from 'react'

import { MwGrid, MwIcon, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import Modal, { ModalState } from '../../../../../../../../components/MwModal'
import Popup from '../../../../../../../components/Popup'
import useModalsContext from '../../context'

import * as Modals from './Modal'
import * as S from './styled'

const messages = {
  user_count:
    'Esta função contém usuários associados. Por isso não poderá ter atributos internos desabilitados.',
  hierarchies:
    'Esta função está associada a uma hierarquia. Por isso não poderá ter atributos internos Habilitados.',
}

const InternalAttributs = () => {
  const { form, originals } = useModalsContext()

  const [modal, setModal] = useState<ModalState>(null)

  const disabled: 'user_count' | 'hierarchies' | null = (() => {
    if (originals.internal_access) {
      return originals.user_count > 0 ? 'user_count' : null
    }

    return originals.hierarchies.some((h) => h.hierarchy_structure_id !== null)
      ? 'hierarchies'
      : null
  })()

  const handleModalConfirm = () => {
    setModal(null)

    form.setValue('internal_access', true)
  }

  const handleModalCancel = () => {
    setModal(null)

    form.setValue('internal_access', false)
  }

  return (
    <MwGrid.Col align={{ content: { vertical: 'bottom' } }} width='4'>
      <S.CheckboxContainer>
        <Popup
          on='click'
          trigger={
            <div>
              <Controller
                name='internal_access'
                control={form.control}
                render={({ field: props }) => {
                  return (
                    <MwInput
                      type='checkbox'
                      label='Atributos Internos'
                      checked={props.value}
                      onChange={(e) => {
                        const isChecked = e.target.checked
                        if (isChecked && originals.user_count > 0) {
                          setModal(
                            <Modals.UnchekedModal
                              onConfirm={handleModalConfirm}
                              onCancel={handleModalCancel}
                            />,
                          )
                        } else {
                          props.onChange(e)
                          form.setValue('internal_access', isChecked)
                        }
                      }}
                      disabled={disabled !== null}
                      invalid={form.isInvalid('internal_access')}
                    />
                  )
                }}
              />
            </div>
          }
          {...(disabled === null
            ? { disabled: true }
            : { content: messages[disabled] })}
          position='bottom left'
          className='popup-field'
          inverted
          wide
        />

        {
          // popupinformativo
        }
        <Popup
          on='click'
          trigger={<MwIcon type='feather' icon='info' color='darkBlue' />}
          content={
            <div
              style={{
                width: '409px',
                height: '168px',
                padding: '14px',
                textAlign: 'left',
                lineHeight: '17px',
                fontSize: '14px',
              }}
            >
              <p>
                Função que tenha o &quot;atributo interno&quot; como
                característica poderá gerenciar subcontas e espelhar usuários.
              </p>
              <p>
                Ex.: BackOffice, Financeiro, Administradores, TI e Analistas.
              </p>
              <p>
                Obs.: Não deve ser ativada para funções com características de
                campo, como: Promotores, Supervisores, Degustadora, etc.
              </p>
            </div>
          }
          position='bottom center'
          className='popup-field'
          style={{ padding: '0' }}
          inverted
          wide
        />
      </S.CheckboxContainer>

      {<Modal modal={modal} />}
    </MwGrid.Col>
  )
}

export default InternalAttributs
