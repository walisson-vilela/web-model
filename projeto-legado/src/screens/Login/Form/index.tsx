import React from 'react'

import { isAxiosError } from 'axios'
import moment from 'moment'
import { Cookies } from 'react-cookie'
import { SubmitHandler } from 'react-hook-form'

import { isObject } from '../../../utils/Validators'
import { useLoginContext } from '../context'
import { LoginForm } from '../interfaces'
import { login } from '../services'

import * as C from './components'
import * as S from './styled'

const FormLogin = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>((props, ref) => {
  const {
    method,
    loading: [, setLoading],
    modal: [, setModal],
    showAccountInput: [showAccountInput],
    showAnimation: [, setShowAnimation],
  } = useLoginContext()

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    setLoading((prev) => ({ ...prev, login: true }))

    try {
      const { data } = await login(formData)

      if (formData.keep) {
        localStorage.setItem('keep_user', formData.username)
        localStorage.setItem('keep_account', formData.account)
      } else {
        localStorage.removeItem('keep_user')
        localStorage.removeItem('keep_account')
      }

      const cookies = new Cookies()

      // TODO: por agora ficar fixo para evitar problemas de redirecionamento
      // const home = data.homepage || '/main/home'
      const home = '/main/home'
      data.homepage = home

      const cookiesItems = {
        ...data,
        KEEP_CONNECTED: formData.keep,
        SUPPORT_URL: 'https://help.mundowap.com.br',
        LOGOUT_URL: location.origin,
        HOME_URL: location.origin + home,
      }

      const cookiesOptions = {
        path: '/',
        expires: moment().add(1, 'year').toDate(),
        domain: window['domain'] ? `.${window['domain']}` : location.hostname,
      }

      await cookies.set('_GIV_USER', cookiesItems, cookiesOptions)
      localStorage.setItem('_ACCOUNT_ID', formData.account)

      setShowAnimation(true)
    } catch (e) {
      if (!isAxiosError(e)) {
        console.error(e)
        return
      }

      if (e.response?.status === 403) {
        if (
          !isObject(e.response.data) ||
          !isObject(e.response.data.data) ||
          e.response.data.data.error_code !== 'INACTIVE_USER'
        ) {
          console.error(e)
          return
        }

        setModal({
          title: 'Atenção!',
          content:
            'Devido a um evento de inativação, seu acesso ao sistema está temporariamente bloqueado. Caso esse período já tenha se encerrado, contate o RH ou seu gestor para reativar seu acesso.',
          buttonType: 'MwButton',
          actions: [
            {
              type: 'button',
              content: 'OK',
              color: 'warningRed',
              onClick: () => setModal(null),
            },
          ],
        })
        return
      }

      setModal({
        title: 'Atenção!',
        content:
          'Usuário ou senha inválidos, certifique-se de que digitou os dados corretamente.',
        buttonType: 'MwButton',
        actions: [
          {
            type: 'button',
            content: 'OK',
            color: 'warningRed',
            onClick: () => setModal(null),
          },
        ],
      })
    } finally {
      setLoading((prev) => ({ ...prev, login: false }))
    }
  }

  return (
    <S.Form {...props} {...{ ref }} onSubmit={method.handleSubmit(onSubmit)}>
      <h1>Dados de Acesso</h1>

      {showAccountInput && (
        <S.AccountField>
          <C.Account />
        </S.AccountField>
      )}

      <C.Username />

      <C.Password />

      <div>
        <C.KeepConnected />

        <C.ForgotPassword />
      </div>

      <C.SubmitButton />
    </S.Form>
  )
})

export default FormLogin
