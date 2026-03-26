import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../components/MwModal'
import { ModalProps } from '../../interfaces'

const HeaderError = ({ setModal }: ModalProps) => (
  <Modal
    modal={{
      size: 'tiny',
      title: 'Erro ao Enviar Arquivo',
      titleColor: 'blue',
      content: (
        <>
          <p>Existe um erro no cabeçalho do arquivo enviado!</p>
          <p>
            Baixe o modelo disponível acima, corrija o seu arquivo e tente
            novamente.
          </p>
        </>
      ),
      actions: [<MwButton content='Ok' onClick={() => setModal(null)} />],
    }}
  />
)

export default HeaderError
