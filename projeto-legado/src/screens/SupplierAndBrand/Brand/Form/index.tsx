import React, { useCallback } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { createRouteTab } from '../../../../routes'

import * as Modals from './Modals'
import * as FormComponent from './components'
import useContext, { Provider } from './context'
import { Form as FormInterface } from './interfaces'
import { formParser } from './parser'
import { saveBrand } from './services'
import * as S from './styled'

const BrandForm = createRouteTab<{ id: string }>((props) => {
  const {
    form,
    dirtyFields,
    data,
    loadData,
    modal: [modal, setModal],
    loading: [loading, setLoading],
    closeTab,
  } = useContext()

  const { getValues, handleSubmit, reset } = form

  const createAfterSaveModal = (mode: 'create' | 'update', id: number) => {
    setModal({
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          Seu cadastro foi {mode === 'update' ? 'editado' : 'realizado'} com
          sucesso.
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Ir para Home',
          secondary: true,
          size: 'large',
          onClick: () => {
            closeTab('/main/products/suppliers/brands')
          },
        },
        {
          content: 'Continuar edição',
          secondary: true,
          size: 'large',
          onClick: () => {
            if (mode === 'create') {
              closeTab(`/main/products/suppliers/brands/edit/${id}`)
            } else {
              setModal(null)
              loadData(id)
            }
          },
        },
        {
          content: 'Novo Cadastro',
          primary: true,
          size: 'large',
          onClick: () => {
            if (mode === 'create') {
              setModal(null)
              reset(formParser(null))
            } else {
              closeTab(`/main/products/suppliers/brands/create`)
            }
          },
        },
      ],
      size: 'small',
    })
  }

  const onSubmit: SubmitHandler<FormInterface> = useCallback(
    async (values) => {
      const haveBlock = values.countries.filter((e) => {
        const { cities, states } = e
        if (e.occupation === 'REGIONAL') {
          return cities && cities.length === 0 && states && states.length === 0
        }

        return false
      })

      if (haveBlock.length > 0) {
        setModal(<Modals.SubmitFail setModal={() => setModal(null)} />)

        return
      }

      setLoading(true)

      try {
        if (data === null) {
          const id = await saveBrand(values, dirtyFields)
          createAfterSaveModal('create', id)
        } else {
          await saveBrand(values, dirtyFields, data.id)
          reset(values)
          createAfterSaveModal('update', data.id)
        }
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
    },
    [data, dirtyFields],
  )

  const onSubmitFail: SubmitErrorHandler<FormInterface> = (errors) => {
    console.error({ errors, values: getValues() })
    setModal(<Modals.SubmitFail setModal={() => setModal(null)} />)
  }

  return (
    <React.Fragment>
      <S.Form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
        {loading && <MwLoader zIndex={3} filled />}
        <FormComponent.FormBody />
      </S.Form>

      <Modal modal={modal} />
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}, Provider)

export default BrandForm
