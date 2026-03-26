import React, { useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'
import toast from 'react-hot-toast'
import { Message } from 'semantic-ui-react'

import { Grid } from '../../../../components/FormFields'
import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { DataInterface } from '../../Manager/interfaces'
import { ModalProps } from '../../interfaces'

import { save } from './services'
import * as S from './styles'

interface ApproveProps extends ModalProps {
  editData: DataInterface
}

const Approve = ({ setModal, editData }: ApproveProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [approve, setApprove] = useState<number>(null)

  const onSubmit = async () => {
    setLoading(true)

    try {
      const { success } = await save(editData.id, approve === 1)

      if (success) {
        setModal(null)
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      modal={{
        size: 'small',
        title: 'Situação do Arquivo',
        titleColor: 'blue',
        content: (
          <>
            <Grid.Row>
              <S.Title>
                Processo: ID: {editData.id} -{' '}
                {moment(editData.fetched).format('DD/MM/YYYY [às] HH:mm:ss')}
              </S.Title>
            </Grid.Row>

            <Grid.Row itemSpacing={14}>
              <S.Subtitle>
                Com base no arquivo de LOG, defina uma ação abaixo.
              </S.Subtitle>
            </Grid.Row>

            <Grid.Row itemSpacing={14}>
              <MwInput
                type='radio'
                name='approve'
                label='Aprovado (Iniciar a importação)'
                value={1}
                onClick={() => setApprove(1)}
              />
            </Grid.Row>

            <Grid.Row itemSpacing={14}>
              <MwInput
                type='radio'
                name='approve'
                label='Reprovado (Descartar a importação)'
                value={0}
                onClick={() => setApprove(0)}
              />
            </Grid.Row>

            <Grid.Row itemSpacing={21}>
              <Message
                warning
                header='Atenção'
                content='Antes de definir uma ação, faça a verificação dos resultados dos arquivos CSV e LOG.'
                style={{ width: '100%' }}
              />
            </Grid.Row>
          </>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setModal(null)}
          />,
          <MwButton
            size='small'
            content='Aplicar'
            loading={loading}
            disabled={loading || approve === null}
            onClick={() => onSubmit()}
          />,
        ],
      }}
    />
  )
}

export default Approve
