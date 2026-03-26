import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import TextEditor from '../../../../../../../../../components/TextEditor'
import { Term } from '../../../../types'
import { labels } from '../../constants'

import { uploadImage } from './services'
import { Main, Modal, ModalActions, ModalHeader, Text, Title } from './styles'

interface TermsProps {
  mode: 'termsOfUse' | 'privacyPolicy'
  initialValue?: Partial<Omit<Term, 'id'>>
  save: (term: Omit<Term, 'id'>) => void
  close: () => void
}

const messages = {
  termsOfUse: {
    empty: 'Você não pode confirmar um termo de uso vazio',
  },
  privacyPolicy: {
    empty: 'Você não pode confirmar uma política de privacidade vazia',
  },
} as const

const TermsModal = (props: TermsProps) => {
  const { mode, save, close } = props

  const initialValue: Pick<Term, 'term'> = {
    term: '',
    ...(props.initialValue || {}),
  }

  const [text, setText] = useState<string>(initialValue.term)

  const onConfirm = () => {
    save({
      title: labels[mode],
      term: text,
      updated: new Date().toISOString(),
    })
    close()
  }

  return (
    <Modal open>
      <ModalHeader
        content={`${props.initialValue ? 'Editar' : 'Incluir'} ${labels[
          mode
        ].toLowerCase()}`}
      />

      <Modal.Content>
        <Main>
          <Title>Orientações gerais</Title>
          <span>Inclua o texto de {labels[mode]} e confirme para salvar</span>
          <Text>
            <TextEditor
              state={[text, setText]}
              imageHandle={{ upload: uploadImage }}
            />
          </Text>
        </Main>
      </Modal.Content>

      <ModalActions>
        <MwButton
          type='button'
          size='large'
          content='Cancelar'
          onClick={close}
          appearance='borderless'
        />

        <Popup
          on='click'
          position='left center'
          className='popup-field'
          content={messages[mode].empty}
          trigger={
            <div>
              <MwButton
                type='button'
                size='large'
                content='Confirmar'
                onClick={onConfirm}
                disabled={text.length < 1}
              />
            </div>
          }
          disabled={text.length > 0}
          pinned
          inverted
        />
      </ModalActions>
    </Modal>
  )
}

export default TermsModal
