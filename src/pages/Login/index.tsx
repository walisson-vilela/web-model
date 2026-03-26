import type { FormEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Modal } from '../../components'
import { useAuth } from '../../contexts'
import { PATHS } from '../../routes/paths'
import styles from './styles.module.css'
import LoginFooter from './components/LoginFooter'
import LoginForm from './components/LoginForm'
import Login from './components/Login'
import { authenticateLogin, DEFAULT_LOGIN_STATE } from './services'
import type { LoginPageState } from './interfaces'

const LEGACY_LOGIN_ERROR_MESSAGE =
  'Ocorreu um erro inesperado, o processo não foi concluído. Caso o problema persista contacte o administrador do sistema.'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, signIn } = useAuth()
  const [values, setValues] = useState<LoginPageState>(DEFAULT_LOGIN_STATE)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [errorOpen, setErrorOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.app, { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setLoading(true)
    setLoginError(null)

    try {
      await authenticateLogin(values)
      signIn(values)
      navigate(PATHS.app, { replace: true })
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro inesperado ao tentar entrar.',
      )
      setErrorOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <Login />

      <Modal
        title='Erro 597'
        children={
          <div>
            <p>{LEGACY_LOGIN_ERROR_MESSAGE}</p>
            <p>{loginError || 'Usuário e senha são obrigatórios.'}</p>
          </div>
        }
        openState={[errorOpen, setErrorOpen]}
        closeOnClickOutside
        closeOnEsc
      />

      <section className={styles.formPanel}>
        <LoginForm
          values={values}
          loading={loading}
          onSubmit={onSubmit}
          onAccountIdChange={(accountId) =>
            setValues((current) => ({ ...current, accountId }))
          }
          onUserChange={(user) => setValues((current) => ({ ...current, user }))}
          onPasswordChange={(password) =>
            setValues((current) => ({ ...current, password }))
          }
          onRememberMeChange={(rememberMe) =>
            setValues((current) => ({ ...current, rememberMe }))
          }
        />

        <LoginFooter text='' />
      </section>
    </main>
  )
}

export default LoginPage
