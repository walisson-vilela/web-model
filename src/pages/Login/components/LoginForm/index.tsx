import { Button, Input } from '../../../../components'

import styles from '../../styles.module.css'
import type { LoginFormProps } from '../../interfaces'

const LoginForm = (props: LoginFormProps) => {
  const {
    values,
    loading,
    onSubmit,
    // onAccountIdChange,
    onUserChange,
    onPasswordChange,
    onRememberMeChange,
  } = props

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>Dados de Acesso</h2>

      <div className={styles.fields}>
        {/* <Input
          label='ID da Conta'
          type='number'
          placeholder='000000'
          value={values.accountId}
          setValue={onAccountIdChange}
          inputMode='numeric'
        /> */}

        <Input
          label='Usuário'
          type='email'
          placeholder='Digite seu usuário'
          value={values.user}
          setValue={onUserChange}
          autoComplete='username'
        />

        <Input
          label='Senha'
          type='password'
          placeholder='Senha'
          value={values.password}
          setValue={onPasswordChange}
          autoComplete='current-password'
        />
      </div>

      <div className={styles.metaRow}>
        <Input
          type='checkbox'
          label='Manter-me conectado'
          checked={values.rememberMe}
          onChange={(event) => onRememberMeChange(event.target.checked)}
          width='auto'
        />

        <a className={styles.forgotLink} href='#' onClick={(event) => event.preventDefault()}>
          Esqueceu sua senha?
        </a>
      </div>

      <Button
        type='submit'
        content='Entrar'
        appearance='solid'
        color='blue'
        size='large'
        loading={loading}
      />
    </form>
  )
}

export default LoginForm
