import React, { useState } from 'react'

import { MwButton, MwLoader, MwScrollContainer } from '@mw-kit/mw-ui'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

import MwModal, { ModalState } from '../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import useRouteTabContext, { createRouteTab } from '../../../routes'

import useContext, { Provider } from './context'
import { Form } from './interfaces'
import * as Section from './sections'
import { saveProduct } from './services'
import * as S from './styles'

const ProductsForm = createRouteTab<{ id: string }>((props) => {
  const {
    data: { route },
  } = props

  const { close: closeTab } = useRouteTabContext(route)

  const {
    form,
    data,
    loading: [loading, setLoading],
    loadData,
  } = useContext()
  const { getValues, reset, handleSubmit, formState } = form
  const { dirtyFields } = formState

  const [modal, setModal] = useState<ModalState | null>(null)

  const createAfterSaveModal = (mode: 'create' | 'update', id: number) => {
    setModal({
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          <p>
            Seu cadastro foi {mode === 'update' ? 'editado' : 'realizado'} com
            sucesso.
          </p>
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Ir para Home',
          secondary: true,
          onClick: () => {
            closeTab('/main/products/home')
          },
        },
        {
          content: 'Continuar edição',
          secondary: true,
          onClick: () => {
            if (mode === 'create') {
              closeTab(`/main/products/home/edit/${id}`)
            } else {
              setModal(null)
              loadData()
            }
          },
        },
        {
          primary: true,
          content: 'Novo Cadastro',
          onClick: () => {
            if (mode === 'create') {
              setModal(null)
              reset()
            } else {
              closeTab('/main/products/home/create')
            }
          },
        },
      ],
    })
  }

  const onSubmit: SubmitHandler<Form> = async (form) => {
    setLoading(true)

    try {
      if (!data) {
        const id = await saveProduct(form, dirtyFields)
        createAfterSaveModal('create', id)
      } else {
        await saveProduct(form, dirtyFields, data.id)
        reset(getValues())
        createAfterSaveModal('update', data.id)
      }
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }

  const onSubmitFail: SubmitErrorHandler<Form> = (error) => {
    console.error({ error })
    setModal(
      <MwModal
        modal={{
          size: 'tiny',
          title: 'Notificação',
          titleColor: 'white',
          content:
            'Para salvar, é necessário preencher todos os campos obrigatórios deste formulário! Os campos obrigatórios estão sinalizados em vermelho.',
          actions: [
            <MwButton
              content='Entendi'
              color='red'
              onClick={() => setModal(null)}
            />,
          ],
        }}
      />,
    )
  }

  const disabled = Object.values(dirtyFields).length === 0

  return (
    <React.Fragment>
      <MwScrollContainer>
        <form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
          {loading && <MwLoader filled zIndex={2} />}

          <S.Section children={<Section.Status />} />
          <S.Section children={<Section.BasicData />} />
          <S.Section children={<Section.ComplementaryData />} />
          <S.Section children={<Section.Guidelines />} />
          <S.Section children={<Section.Planogram setModal={setModal} />} />

          <Section.Submit disabled={disabled} closeTab={closeTab} />
        </form>

        <MwModal modal={modal} />
        <Toaster position='bottom-right' />
      </MwScrollContainer>
    </React.Fragment>
  )
}, Provider)

export default ProductsForm
