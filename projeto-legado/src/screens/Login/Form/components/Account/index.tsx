import { useEffect } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useLoginContext } from '../../../context'
import { loginByService } from '../../../services'

import * as S from './styled'

const Account = () => {
  const {
    loading: [loading, setLoading],
    loginType: [, setLoginType],
    method,
  } = useLoginContext()

  const loginBy = async (accountId: number) => {
    setLoading((prev) => ({ ...prev, loginAccount: true }))

    try {

      const response = await loginByService(accountId)

      setLoginType(response)

      setLoading((prev) => ({ ...prev, loginType: false }))
    } catch (error) {
      method.setError('account', {
        type: 'custom',
        message: 'ID da Conta informado inválido',
      })

      console.error(error)
    } finally {
      setLoading((prev) => ({ ...prev, loginAccount: false }))
    }
  }
  const account = method.watch('account')

  useEffect(() => {
    setLoading((prev) => ({ ...prev, loginType: true }))

    method.setValue('password', '')
    if (account.length !== 6) {
      method.clearErrors()
      method.setValue('username', '')
      return
    }

    if (account == localStorage.getItem('keep_account')) {
      method.setValue('username', localStorage.getItem('keep_user') || '')
    } else {
      method.setValue('username', '')
    }

    const timeoutId = setTimeout(() => loginBy(Number(account)), 500)
    return () => clearTimeout(timeoutId)
  }, [account])

  return (
    <>
      <Controller
        name='account'
        control={method.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            autoFocus
            type='text'
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/[^0-9]/g, '')
                .substring(0, 6)
            }}
            label={<b>ID da Conta</b>}
            loading={loading.loginAccount}
            arrows={false}
            placeholder='000000'
            invalid={props.name in method.formState.errors}
          />
        )}
      />
      {method.formState.errors.account?.message &&
        method.formState.errors?.account?.message.length > 2 && (
          <S.ErrorMessage
            children={method.formState.errors?.account?.message}
          />
        )}
    </>
  )
}

export default Account
