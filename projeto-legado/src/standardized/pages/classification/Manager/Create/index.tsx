import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwLoader } from '@mw-kit/mw-ui'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { BodyInterface } from '../interfaces'

import { FormProvider } from './context'
import { CheckAttachment, Name, SceneryId, Temporary } from './inputs'
import { CreateProps, Form, Scenery } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { submit } from './services'
import * as S from './styles'

const Create = ({ setOpen, editData, loadData }: CreateProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scenery, setScenery] = useState<Scenery>(() => {
    return {
      temporary: false,
      can_upload_file: false,
      ...(editData
        ? {
            temporary: editData.scenery_temporary,
            can_upload_file: editData.can_upload_file,
          }
        : {}),
    }
  })
  const [modal, setModal] = useState<ModalState>(null)

  const resolver = yupResolver(formSchema(scenery)) as never as Resolver<Form>

  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(editData || ({} as BodyInterface)),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = form

  const setValue: typeof form.setValue = (name, value, config) => {
    form.setValue(name, value as never, {
      shouldDirty: true,
      shouldValidate: true,
      ...(config || {}),
    })
  }

  const onSave = async (formData: Form) => {
    setLoading(true)
    try {
      await submit(formData, editData ? editData.id : null)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      loadData()
      setOpen(<React.Fragment />)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }

  const checkFragmentInformation = ({
    dependency_count,
    future_dependency_count,
  }: BodyInterface) => {
    const pastDependencyCount = dependency_count - future_dependency_count
    return (
      <React.Fragment>
        Ao editar este motivo/classificação, {dependency_count}
        {dependency_count !== 1
          ? ' registros serão impactados e terão seus nomes redefinidos.'
          : ' registro será impactado e terá seu nome redefinido.'}
        {future_dependency_count > 0 && (
          <React.Fragment>
            {' '}
            Sendo:{' '}
            <ul>
              <li>
                {(() => {
                  const messages: { [k: number]: string } = {
                    0: 'Nenhum registro de eventos passados',
                    1: `${pastDependencyCount} registro de evento passado.`,
                  }

                  return (
                    messages[pastDependencyCount] ||
                    `${pastDependencyCount} registros de eventos passados.`
                  )
                })()}
              </li>
              <li>
                {future_dependency_count}{' '}
                {future_dependency_count === 1
                  ? 'registro de eventos programados.'
                  : 'registros de eventos programados.'}
              </li>
            </ul>
          </React.Fragment>
        )}
        <p>Deseja continuar?</p>
      </React.Fragment>
    )
  }

  const onSubmit: SubmitHandler<Form> = async (
    formData: Form,
  ): Promise<void> => {
    if (!editData || editData.dependency_count < 1) {
      onSave(formData)
      return
    }

    const contentChoice = checkFragmentInformation(editData)
    setModal({
      title: 'Notificação',
      content: contentChoice,
      buttonType: 'MwButton',
      actions: [
        {
          appearance: 'borderless',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Salvar',

          onClick: async () => {
            onSave(formData)
            setLoading(false)
            setModal(null)
          },
        },
      ],
    })
  }

  return (
    <S.Container>
      <S.Header>
        {editData
          ? 'Editar Motivo e Classificação'
          : 'Criar Motivo e Classificação'}
      </S.Header>

      <FormProvider
        value={{
          data: editData,
          form: { ...form, setValue },
          scenery: [scenery, setScenery],
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <S.Content>
            {loading && <MwLoader filled />}

            <S.Row>
              <SceneryId />

              <div />
            </S.Row>

            <S.Row>
              <Name />

              <Temporary />
            </S.Row>

            <S.Row>
              <CheckAttachment />
            </S.Row>
          </S.Content>

          <S.Footer>
            <MwButton
              type='button'
              appearance='borderless'
              content='Cancelar'
              onClick={() => setOpen(<React.Fragment />)}
            />

            <MwButton
              type='submit'
              content='Confirmar'
              disabled={!isValid || loading}
              style={{ width: 105 }}
            />
          </S.Footer>
        </form>
      </FormProvider>
      <Modal modal={modal} />
    </S.Container>
  )
}

export default Create
