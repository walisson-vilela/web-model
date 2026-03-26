import React, { useEffect, useState } from 'react'

import { MwButton, MwInput, MwLoader, MwTextArea } from '@mw-kit/mw-ui'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import * as ModalStyles from '../styles'

import { FavoriteFormProps, FormData } from './interfaces'
import resolver from './schema'
import { checkName } from './services'
import * as S from './styles'
import useFavoriteForm from './useFavoriteForm'

const FavoriteForm = (props: FavoriteFormProps) => {
  const { close, reload } = props

  const { title, submit, loader } = useFavoriteForm(props)
  const { save } = submit

  const [loading, setLoading] = useState<boolean>(true)
  const [nameCheck, setNameCheck] = useState<
    'pending' | 'valid' | 'invalid' | 'loading'
  >('pending')

  const form = useForm<FormData>({
    resolver,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const {
    reset,
    getValues,
    formState: { errors, isDirty, dirtyFields },
    control,
    watch,
  } = form

  const setValue = <T extends keyof FormData>(name: T, value: FormData[T]) => {
    form.setValue(name, value as never, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onLoad = async () => {
    setLoading(true)

    try {
      const data = await loader()
      reset({ ...data })
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  const validateName = async (name: string) => {
    setNameCheck('loading')

    try {
      const success = await checkName({ name, id: props.id })

      setNameCheck(success ? 'valid' : 'invalid')
    } catch (e) {
      setNameCheck('invalid')
    }
  }

  useEffect(() => {
    setNameCheck('pending')

    const name = getValues('name')
    if (name === '') return

    const timeoutId = setTimeout(() => validateName(name), 1500)

    return () => clearTimeout(timeoutId)
  }, [watch('name')])

  const submitRules = {
    errors: Object.keys(errors).length === 0,
    dirtyFields: Object.keys(dirtyFields).length > 0,
    isDirty: isDirty,
    nameCheck: nameCheck === 'valid',
  }

  const canSubmit = !Object.keys(submitRules).some((rule) => !submitRules[rule])

  const onSubmit = async () => {
    setLoading(true)

    const data = getValues()

    try {
      await save({ ...data })

      reload()
      close()

      toast(<ToasterContent color='normal' />, SuccessStyle)

      reload()

      return
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal size='small' open>
      {loading && <MwLoader filled />}

      <ModalStyles.Header color='blue'>{title}</ModalStyles.Header>

      <ModalStyles.Content>
        <S.ContentContainer>
          <div>
            <Controller
              name='name'
              control={control}
              render={(field) => {
                return (
                  <MwInput
                    {...field}
                    type='text'
                    label='Insira o nome do seu Favorito'
                    placeholder='Exemplo: Campanha de Aniversário'
                    width='331px'
                    invalid={'name' in errors || nameCheck === 'invalid'}
                    loading={nameCheck === 'loading'}
                    required
                    icon={{
                      icon: {
                        type: 'jsx',
                        icon: <React.Fragment />,
                        width: 0,
                      },
                      position: 'right',
                    }}
                  />
                )
              }}
            />

            <S.ErrorMessage>
              {nameCheck === 'invalid' &&
                'O nome informado já esta sendo utilizado.'}
            </S.ErrorMessage>
          </div>

          <Controller
            name='description'
            control={control}
            render={(field) => {
              return (
                <S.Label>
                  <div>Descrição do Favorito</div>
                  <MwTextArea {...field} width='433px' height='93px' />
                </S.Label>
              )
            }}
          />
        </S.ContentContainer>
      </ModalStyles.Content>

      <ModalStyles.Actions>
        <div>
          <MwButton
            type='button'
            appearance='borderless'
            content='Cancelar'
            onClick={close}
          />

          <MwButton
            type='button'
            content={submit.label}
            onClick={onSubmit}
            disabled={!canSubmit}
          />
        </div>
      </ModalStyles.Actions>
    </Modal>
  )
}

export default FavoriteForm
