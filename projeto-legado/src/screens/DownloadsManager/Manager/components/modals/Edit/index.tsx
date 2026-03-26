import { useEffect, useState } from 'react'

import { SetValueConfig, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  Button,
  Loader,
  Message,
  Modal,
  Input as SemanticInput,
} from 'semantic-ui-react'

import { Input } from '../../../../../../components/ControlledInputs'
import MwModal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'

import Field from './components/Field'
import FormContext from './context'
import { Data, Form } from './interfaces'
import labels from './labels'
import { dataParser, formParser } from './parser'
import resolver from './resolver'
import { editFileProcess, getFileProcess, validateName } from './services'
import * as S from './styled'

interface EditProps {
  file_process_id: number
  closeModal: () => void
  reload: () => void
}

const Edit = (props: EditProps) => {
  const { file_process_id, closeModal, reload } = { ...props }

  const [loading, setLoading] = useState<boolean>(true)
  const [validName, setValidName] = useState<boolean>(null)
  const [loadingName, setLoadingName] = useState<boolean>(false)
  const [data, setData] = useState<Data>(dataParser(null))

  const form = useForm<Form>({
    resolver,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: formParser(null),
  })

  const {
    reset,
    handleSubmit,
    getValues,

    formState: { isDirty, dirtyFields, errors },
  } = form

  const loadData = async () => {
    setLoading(true)

    try {
      const response = await getFileProcess(file_process_id)
      const dataParsed = dataParser(response)
      setData(dataParsed)

      const formParsed = formParser(dataParsed)
      reset(formParsed)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const onSubmit = async () => {
    setLoading(true)

    const params = getValues()

    try {
      await editFileProcess(file_process_id, params)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      closeModal()
    } catch (e) {
      toast(<ToasterContent />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const setValue = (
    name: keyof Form,
    value: string,
    config: SetValueConfig = {
      shouldDirty: true,
      shouldValidate: true,
    },
  ): void => {
    form.setValue(name, value, config)
  }

  const checkName = async () => {
    setLoadingName(true)

    try {
      const name = getValues('name')

      if (!name) {
        setLoadingName(false)

        return
      }

      const { success } = await validateName(name, data.type, file_process_id)

      setValidName(success)
    } finally {
      setLoadingName(false)
    }
  }

  useEffect(() => {
    setValidName(null)

    const timeoutID = setTimeout(() => checkName(), 1500)

    return () => clearTimeout(timeoutID)
  }, [form.watch('name')])

  return (
    <Modal size='small' open>
      <MwModal.Header content='Renomear Arquivo' color='blue' />

      <Modal.Content style={{ position: 'relative' }}>
        {loading && (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        )}

        <FormContext.Provider
          value={{
            form: {
              ...form,
              setValue: setValue,
            },
            data,
          }}
        >
          <S.Form id='file_process_form' onSubmit={handleSubmit(onSubmit)}>
            <Field name='type' disabled={true}>
              <SemanticInput
                type='text'
                value={data.type_label || ''}
                placeholder={labels.type.placeholder}
                disabled={true}
                fluid
              />
            </Field>

            <Field
              name='name'
              disabled={loading}
              error={!!errors.name || validName === false}
            >
              <Input
                type='text'
                name='name'
                form={form}
                loading={loadingName}
                placeholder={labels.name.placeholder}
                disabled={loading}
                fluid
              />
            </Field>

            <Message
              color='yellow'
              content='O nome só pode conter letras (sem acento), números e os caracteres "_" e "-".'
            />
          </S.Form>
        </FormContext.Provider>
      </Modal.Content>

      <Modal.Actions>
        <Button
          basic
          className='tertiary'
          type='button'
          content='Cancelar'
          onClick={closeModal}
        />

        <S.SubmitButton
          form='file_process_form'
          type='submit'
          content='Salvar'
          color='blue'
          disabled={
            loading ||
            !validName ||
            (!isDirty && Object.keys(dirtyFields).length === 0)
          }
        />
      </Modal.Actions>
    </Modal>
  )
}

export default Edit
