import { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'

import PopupSelected from './components/Popup'
import * as Inputs from './components/inputs'
import CategoriesContext from './context'
import { useCheckName } from './hooks'
import { CreateProps, StatusProcess, formType } from './interfaces'
import { defaultData, formSchema } from './schemas'
import { submit } from './services'

const Create = (props: CreateProps) => {
  const { setOpen, editData, loadData } = props

  const resolver = yupResolver(formSchema) as never as Resolver<formType>

  const form = useForm<formType>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
    defaultValues: defaultData(editData),
  })

  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors, isDirty, submitCount },
  } = form

  const isValid = Object.keys(errors).length === 0

  const [statusProcess, setStatusProcess] = useState<StatusProcess>({
    name: false,
    parents: false,
    form: false,
  })

  const [validName, setValidName] = useState<boolean>(
    editData && editData.name ? true : null,
  )

  useEffect(() => {
    const fields: (keyof formType)[] = ['id', 'category', 'parent_id']
    fields.forEach((f) => {
      if (getValues(f) === undefined) register(f)
    })
  }, [editData])

  useCheckName({ watch, setValidName, setStatusProcess })

  const onSubmit: SubmitHandler<formType> = async (formData: formType) => {
    setStatusProcess({ ...statusProcess, form: true })

    try {
      delete formData.category

      const { success } = await submit(formData)

      if (success) {
        setOpen(false)
        toast(<ToasterContent color='normal' />, SuccessStyle)
        loadData()
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setStatusProcess({ ...statusProcess, form: false })
    }
  }

  const isInvalid = useCallback(
    (field: keyof formType) => field in errors && submitCount > 0,
    [errors, submitCount],
  )

  return (
    <Modal.Modal open size='small' style={{ height: '438px' }}>
      <Modal.Header color='blue'>
        {editData ? 'Editar' : 'Criar Categoria ou Subnível'}
      </Modal.Header>
      <Modal.Body>
        <CategoriesContext.Provider
          value={{
            editData,
            form,
            statusProcess: [statusProcess, setStatusProcess],
            isInvalid,
            validName: [validName, setValidName],
          }}
        >
          {statusProcess.form && <MwLoader filled />}
          <form
            id='create'
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
          >
            <MwGrid borderless rows={{ borderless: true }}>
              {!editData && (
                <>
                  <MwGrid.Row>
                    <MwGrid.Col>
                      <b>Escolha sua Categorias ou Subnível:</b>
                    </MwGrid.Col>
                  </MwGrid.Row>
                  <MwGrid.Row>
                    <MwGrid.Col width='auto'>
                      <Inputs.Category category='category' />
                    </MwGrid.Col>

                    <MwGrid.Col width='auto'>
                      <Inputs.Category category='sublevel' />
                    </MwGrid.Col>
                  </MwGrid.Row>
                </>
              )}

              <MwGrid.Row>
                <PopupSelected />

                {!editData && <Inputs.Name />}
              </MwGrid.Row>

              {editData && (
                <MwGrid.Row>
                  <Inputs.Name />
                </MwGrid.Row>
              )}
            </MwGrid>
          </form>
        </CategoriesContext.Provider>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          appearance='borderless'
          type='button'
          content='Cancelar'
          onClick={() => setOpen(false)}
        />
        <MwButton
          form='create'
          type='submit'
          color='blue'
          content='Salvar'
          disabled={
            !isDirty ||
            !isValid ||
            statusProcess.form ||
            statusProcess.name ||
            validName !== true
          }
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Create
