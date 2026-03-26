import React, { useCallback, useState } from 'react'

import { MwButton, MwIcon, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import { Grid } from '../../../../components/FormFields'
import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { Permissions } from '../../Home/tabs/Favorites/interfaces'

import Manager from './Manager'
import { FavoriteShareProps } from './interfaces'
import { shareTypes, users } from './labels'
import { edit } from './services'
import * as S from './styles'

const FavoriteShare = ({ setModal, reload, item }: FavoriteShareProps) => {
  const [loading, setLoading] = useState({
    users: false,
    form: false,
  })

  const [addForm, setAddForm] = useState<{
    users: string[]
    share_type: string
  }>({
    users: [],
    share_type: '',
  })

  const [itemsList, setItemsList] = useState([...item.permissions])
  const [checkeds, setCheckeds] = useState<Permissions[]>([])

  const getShareTypesOptions = useCallback(shareTypes, [])
  const getUsersOptions = useCallback(
    (search, page) => users(search, page, itemsList),
    [],
  )

  const onSubmit = async () => {
    setLoading((prev) => ({ ...prev, form: true }))

    const data = itemsList
      .map((e) => ({
        people_id: e.people_id,
        role: e.role,
      }))
      .filter((e) => e.role !== 'owner')

    try {
      const { success } = await edit(data, item.favorite_id)

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)

        setModal(null)
        reload()
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, form: false }))
    }
  }

  const onAdd = async () => {
    setItemsList((prev) => {
      const aux = [...prev]

      addForm.users.forEach((user) => {
        const splitted = user.split(' - ')

        aux.push({
          people_id: parseInt(splitted[0]),
          people_name: splitted[1],
          role: addForm.share_type,
        })
      })

      return aux
    })

    setAddForm({ users: [], share_type: '' })
  }

  return (
    <Modal
      modal={{
        size: 'large',
        title: 'Compartilhar',
        titleColor: 'blue',
        content: (
          <S.Container>
            <Grid.Row justify='between' align='center'>
              <S.Title>
                <b>Lista de Favoritos:</b> Código {item.favorite_id} -{' '}
                {item.favorite_name} |{' '}
                {item.image_count === 0
                  ? 'Nenhuma imagem'
                  : item.image_count === 1
                  ? '1 imagem'
                  : `${item.image_count} imagens`}
              </S.Title>
            </Grid.Row>

            <Grid.Row itemSpacing={21} align='bottom'>
              <Grid.Column size={8}>
                <MwInput
                  type='select-multiple'
                  label={<b>Usuários:</b>}
                  placeholder='Selecione'
                  value={addForm.users}
                  setValue={(value) =>
                    setAddForm((prev) => ({ ...prev, users: value }))
                  }
                  loader={getUsersOptions}
                  search
                  selectAll
                />
              </Grid.Column>

              <Grid.Column size={6}>
                <Grid.Row align='center'>
                  <span>
                    <b>Tipo de Compartilhamento:</b>
                  </span>

                  <Popup
                    on='click'
                    trigger={
                      <MwIcon type='feather' icon='info' color='black' />
                    }
                    content={
                      <S.PopupText>
                        <p>
                          O modo de compartilhamento pode apresentar três tipos:
                        </p>
                        <p>
                          - Gerenciamento de Imagens: O usuário tem permissão
                          geral: Visualizar, adicionar, remover, aprovar e
                          reprovar imagens.
                        </p>
                        <p>
                          - Visualização: O usuário tem permissão apenas para
                          visualizar as imagens.
                        </p>
                        <p>
                          - Aprovar/Reprovar: O usuário tem permissão apenas
                          para visualizar, aprovar e reprovar as imagens.
                        </p>
                      </S.PopupText>
                    }
                    position='right center'
                    className='popup-field'
                    inverted
                    wide
                  />
                </Grid.Row>

                <S.GridRow>
                  <MwInput
                    type='select'
                    placeholder='Selecione'
                    value={addForm.share_type}
                    setValue={(value) =>
                      setAddForm((prev) => ({ ...prev, share_type: value }))
                    }
                    loader={getShareTypesOptions}
                  />
                </S.GridRow>
              </Grid.Column>

              <Grid.Column>
                <MwButton
                  content='Adicionar'
                  size='small'
                  onClick={onAdd}
                  loading={loading.form}
                  disabled={
                    loading.form ||
                    addForm.users.length < 1 ||
                    !addForm.share_type
                  }
                />
              </Grid.Column>
            </Grid.Row>

            <S.ManagerContainer>
              <Manager
                listState={[itemsList, setItemsList]}
                checkedsState={[checkeds, setCheckeds]}
              />
            </S.ManagerContainer>
          </S.Container>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setModal(null)}
          />,
          <MwButton
            style={{ width: '105px', marginLeft: '7px' }}
            content='Salvar'
            loading={loading.form}
            onClick={() => onSubmit()}
          />,
        ],
      }}
    />
  )
}

export default FavoriteShare
