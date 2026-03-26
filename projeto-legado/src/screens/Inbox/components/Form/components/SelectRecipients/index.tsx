import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import { Header } from '../../../../../../components'
import { Grid } from '../../../../../../components/FormFields'
import Modal from '../../../../../../components/MwModal'
import { Recipients } from '../../interfaces'

import UsersInserted from './UsersInserted'
import UsersList from './UsersList'
import { SelectRecipientsProps } from './interfaces'
import * as S from './styles'

const SelectRecipients = (props: SelectRecipientsProps) => {
  const { setModal, recipientType, save, getData } = props

  const recipientTypes = {
    P: 'Usuários',
    S: 'PDVs',
  }

  const [selected, setSelected] = useState<Recipients[]>(getData || [])

  return (
    <Modal
      modal={{
        size: 'large',
        title: recipientTypes[recipientType],
        titleColor: 'blue',
        modalStyles: { width: '1095px' },
        content: (
          <S.ModalContent>
            <Header
              description={`Selecione abaixo os ${recipientTypes[
                recipientType
              ].toLocaleLowerCase()} para o envio de mensagem.`}
              borderless
              style={{ padding: 0, margin: 0 }}
            />

            <Grid.Row itemSpacing={16}>
              <Grid.Column>
                <S.Title>Relação de {recipientTypes[recipientType]}</S.Title>
              </Grid.Column>

              <Grid.Column>
                <S.Title>{recipientTypes[recipientType]} Associados</S.Title>
              </Grid.Column>
            </Grid.Row>

            <S.GridRowStyled itemSpacing={10}>
              <S.Col>
                <UsersList
                  recipientType={recipientType}
                  selected={[selected, setSelected]}
                />
              </S.Col>

              <S.Col>
                <UsersInserted selected={[selected, setSelected]} />
              </S.Col>
            </S.GridRowStyled>
          </S.ModalContent>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            style={{ width: '130px', height: '41px' }}
            onClick={() => setModal(null)}
          />,
          <MwButton
            content='Confirmar'
            style={{ width: '130px', height: '41px', marginLeft: '7px' }}
            onClick={() => {
              save(
                selected.map((data) => ({
                  name: data.name,
                  formatted_address: data.formatted_address,
                  id: data.id,
                  link_type: recipientType === 'P' ? 'peoples' : 'stores',
                })),
              )

              setModal(null)
            }}
          />,
        ],
      }}
    />
  )
}

export default SelectRecipients
