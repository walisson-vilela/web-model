import { useCallback, useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'
import { Toaster, toast } from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import useRouteTabContext, { createRouteTab } from '../../../routes'
import useHomeContext from '../../../standardized/pages/Home/context'
import { getToken } from '../../../utils'
import { Logout } from '../../../utils/Auth'
import { isTmpPassword } from '../functions'

import {
  Password,
  PasswordConfirm,
  PasswordGenerator,
  PasswordRules,
} from './components'
import useFormContext, { FormProvider } from './context'
import { SubmitErrorHandler, SubmitHandler } from './interfaces'
import { renew, save } from './services'
import {
  Footer,
  FormContainer,
  PasswordContainer,
  Section,
  Title,
} from './styles'

const Component = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const { close: closeTab } = useRouteTabContext(route)
  const [loading, setLoading] = useState(false)

  const {
    form: { handleSubmit, reset, getValues },
    passwordRules: [passwordRules],
  } = useFormContext()

  const { user, contractor } = useHomeContext()

  const {
    payload: { password_expired, tmp_password },
  } = getToken()

  const onClickCancel = () => {
    closeTab()
  }

  const onSubmit: SubmitHandler = useCallback(
    async (values) => {
      setLoading(true)

      try {

        await save(values.password, user.id)

        if (isTmpPassword()) {
          await renew(contractor.account_id, user.username, values.password)
        } else {
          reset()
        }

        toast(<ToasterContent color='normal' />, SuccessStyle)
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
    },
    [user.id, contractor.account_id],
  )

  const onSubmitFail: SubmitErrorHandler = (errors) => {
    console.error(errors)
  }

  const onExit = () => Logout()

  const disabled =
    passwordRules.some((rule) => !rule.success) ||
    getValues('password') !== getValues('password_confirm')

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
      <Section>
        <Title children='Nova Senha' />

        <PasswordContainer>
          <div>
            <Password />
          </div>

          <div>
            <PasswordConfirm />
          </div>

          <div>
            <PasswordGenerator />
          </div>
        </PasswordContainer>

        <PasswordRules />
      </Section>

      <Footer
        buttons={[
          {
            type: 'button',

            appearance: 'bordered',
            ...(password_expired || tmp_password
              ? { onClick: onExit, children: 'Sair' }
              : { onClick: onClickCancel, children: 'Cancelar' }),
          },
          {
            type: 'submit',

            disabled,
            children: 'Salvar',
          },
        ]}
      />

      {loading && <MwLoader zIndex={2} filled />}
      <Toaster position='bottom-right' />
    </FormContainer>
  )
})

const Form = createRouteTab((props) => (
  <FormProvider>
    <Component {...props} />
  </FormProvider>
))

export default Form
