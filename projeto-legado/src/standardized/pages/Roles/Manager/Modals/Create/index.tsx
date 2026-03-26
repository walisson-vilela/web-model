import { useCallback, useState } from 'react'

import { Message, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'
import { isObject } from 'lodash'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { ErrorMessage } from '../../../../../components/form/components'
import { ValidationError } from '../../../../../components/form/modals'
import { BodyInterface } from '../../interfaces'

import * as Inputs from './Inputs'
import useModalsContext, { ModalsProvider } from './context'
import { Form } from './interfaces'
import { createEditRoles } from './service'
import * as S from './styled'

interface ICreateUserFunctionModal {
  onClose: () => void
  item?: BodyInterface
  reload: () => void
}

const Component = (props: ICreateUserFunctionModal) => {
  const { onClose, item, reload } = props

  const [modal, setModal] = useState<ModalState>(null)
  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>(null)

  const {
    form,
    loading: [loading, setLoading],

    validations: [validations],
    originals,

    dirtyFields,
    getUserLicenses,
  } = useModalsContext()

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<Form> = useCallback(
    async (values) => {
      if (Object.values(validations).some((item) => item !== true)) {
        console.error(validations)
        return
      }

      setLoading(true)
      try {
        // edit item

        const response = item
          ? await createEditRoles(values, dirtyFields, item.id)
          : await createEditRoles(values, dirtyFields)

        if (response.success === true) {
          toast(<ToasterContent color='normal' />, SuccessStyle)
          onClose()
          reload()
          return
        } else {
          setValidationErrors(response.errors)
        }
      } catch (e) {
        if (
          isAxiosError(e) &&
          isObject(e.response) &&
          e.response.status === 404
        ) {
          setModal({
            title: 'Notificação',
            content: 'Registro não encontrado.',
            actions: [
              {
                content: 'Ok',
                onClick: () => {
                  onClose()
                  reload()
                },
              },
            ],
            buttonType: 'MwButton',
          })
        } else {
          console.error(e)

          toast(<ToasterContent color='error' />, ErrorStyle)
        }
      }
      setLoading(false)
    },
    [item?.id, onClose, dirtyFields, validations],
  )

  const onSubmitFail: SubmitErrorHandler<Form> = useCallback((error) => {
    console.error(error)
  }, [])

  return (
    <Modal.Modal
      forwardedAs='form'
      open
      size='small'
      style={{ width: '669px', height: '438px' }}
      onSubmit={handleSubmit(onSubmit, onSubmitFail)}
    >
      {loading && <MwLoader filled zIndex={1000} />}

      <Modal.Header
        content={item ? 'Editar Função' : 'Criar Função'}
        color='blue'
      />

      <Modal.Body style={{ padding: '0' }}>
        <MwGrid
          borderless
          spacing={{ top: 's3', left: 's3', right: 's3', bottom: 's4' }}
          rows={{ borderless: true, spacing: '0', spacingAround: false }}
          style={{ width: '100%', height: '100%' }}
        >
          <MwGrid.Row style={{ paddingLeft: '7px' }}>
            <Inputs.FunctionNameInput />

            <Inputs.InternalsAttributsInput />
          </MwGrid.Row>
          <MwGrid.Row style={{ paddingLeft: '7px' }}>
            <ErrorMessage>
              {validations.name === false
                ? 'O nome informado já está sendo utilizado.'
                : ''}
            </ErrorMessage>
          </MwGrid.Row>

          <MwGrid.Row spacing={{ top: 's4' }}>
            <MwGrid.Col
              width='4'
              style={{ flexDirection: 'column', gap: '21px' }}
            >
              <Inputs.SelectPillarInput setModal={setModal} />

              <Inputs.SelectAccessLevelInput item={item} setModal={setModal} />
            </MwGrid.Col>

            <MwGrid.Col
              align={{
                content: { vertical: 'center', horizontal: 'right' },
              }}
              width='8'
            >
              <S.MessageContainer>
                <Message
                  warning
                  header='Informação Importante:'
                  content='A escolha do nível impacta indiretamente no custo da sua fatura.'
                />
              </S.MessageContainer>
            </MwGrid.Col>
          </MwGrid.Row>
        </MwGrid>
      </Modal.Body>

      <Modal.Footer
        actions={[
          {
            content: 'Cancelar',
            onClick: onClose,

            appearance: 'borderless',
          },
          {
            content: item ? 'Editar' : 'Criar',
            color: 'blue',
            type: 'submit',
            disabled:
              dirtyFields.length === 0 ||
              Object.values(validations).some((item) => item === null),
          },
        ]}
        buttonType='MwButton'
      />

      <Modal modal={modal} />
      {validationErrors && (
        <ValidationError
          errors={validationErrors}
          onClose={() => setValidationErrors(null)}
          fields={{
            name: {
              label: 'Nome',
              handler: () => {
                form.setValue('name', originals.name)
              },
            },
            internal_access: {
              label: 'Atributos Internos',
              handler: () => {
                form.setValue('internal_access', originals.internal_access)
              },
            },
            roles_hierarchies: {
              label: 'Pilares',
              handler: () => {
                form.setValue('hierarchies', originals.hierarchies)
              },
            },
            access_level_id: {
              label: 'Nível de Acesso',
              handler: () => {
                form.setValue('access_level_id', originals.access_level_id)
              },
            },
            licenses: {
              label: 'Cotas Disponíveis',
              handler: () => {
                form.setValue('internal_access', originals.internal_access)
                form.setValue('access_level_id', originals.access_level_id)
                form.setValue('hierarchies', originals.hierarchies)
                getUserLicenses()
              },
            },
          }}
        />
      )}
    </Modal.Modal>
  )
}

const CreateUserFunctionModal = (props: ICreateUserFunctionModal) => {
  return (
    <ModalsProvider {...props}>
      <Component {...props} />
    </ModalsProvider>
  )
}

export default CreateUserFunctionModal
