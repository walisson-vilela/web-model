import { getToken } from '../../utils'

export const isTmpPassword = (): boolean => {
  const {
    payload: { password_expired, tmp_password },
  } = getToken()

  return password_expired || tmp_password
}
