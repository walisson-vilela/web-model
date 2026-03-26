import type { LoginPageState } from './interfaces'

export const LOGIN_SUBMIT_DELAY_MS = 350

export const DEFAULT_LOGIN_STATE: LoginPageState = {
  accountId: '000000',
  user: '',
  password: '',
  rememberMe: false,
}

export const authenticateLogin = async (
  values: LoginPageState,
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, LOGIN_SUBMIT_DELAY_MS))

  if (values.user.trim() === '' || values.password.trim() === '') {
    throw new Error('Usuário e senha são obrigatórios.')
  }
}
