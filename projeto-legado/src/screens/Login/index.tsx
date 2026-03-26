import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwLoader } from '@mw-kit/mw-ui'
import moment from 'moment'
import { Cookies } from 'react-cookie'
import { Resolver, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import Modal, { ModalState } from '../../components/MwModal'
import { getUserCookies } from '../../utils'

import { LoginProvider } from './context'
import FormLogin from './Form'
import { ILoginBy, LoginForm } from './interfaces'
import { defaultData, formSchema } from './schemas'
import { checkSubdomain } from './services'
import * as S from './styles'

const getRandomIndex = () => Math.floor(Math.random() * 7) + 1

const defaultCopy = {
  title: 'GIV – A Solução Completa',
  subtitle: 'Tecnologia para transformar dados em execução com resultados reais',
}

const copyByImage: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'Visitas otimizadas, mais resultados.',
    subtitle: 'O Roteirizador que otimiza tempo e maximiza visitas.',
  },
  3: defaultCopy,
  4: {
    title: 'Reconhecimento de imagem é tudo',
    subtitle: 'Você no controle de sua operação',
  },
  5: {
    title: 'Melhor Performance,\nmais vendas.',
    subtitle: 'Gestão no PDV com controle total na palma da sua mão.',
  },
  6: {
    title: 'Execução visível. Decisão inteligente.',
    subtitle: 'Acompanhe em tempo real com precisão e IA.',
  },
}

const renderLines = (text: string) => {
  const lines = text.split('\n')
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ))
}

const Login = () => {
  const url = new URL(window.location.href)
  const isSupport = url.searchParams.get('support') === ''

  const [formRef, setFormRef] = useState<HTMLFormElement>()
  const [modal, setModal] = useState<ModalState>(null)
  const [showAccountInput, setShowAccountInput] = useState<boolean>(false)
  const [showAnimation, setShowAnimation] = useState<boolean>(false)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    form: false,
    login: false,
    loginType: true,
    loginAccount: false,
  })
  const [loginType, setLoginType] = useState<ILoginBy>()

  const history = useHistory()
  const videoRef = useRef<HTMLVideoElement>(null)

  const resolver = yupResolver(
    formSchema(loginType && !isSupport ? loginType.login_by : null),
  ) as Resolver<LoginForm>

  const method = useForm<LoginForm>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultData(),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const redirectIfKeepConnected = () => {
    const cookies = new Cookies()

    const {
      token = null,
      homepage = '/main/home',
      KEEP_CONNECTED = false,
    } = cookies.get('_GIV_USER') || {}

    if (token && KEEP_CONNECTED) {
      history.replace(homepage)
    }
  }

  const focusUserName = useCallback(() => {
    if (!formRef || !loginType) return

    const username = formRef.elements.namedItem('username')

    if (
      !(username instanceof HTMLInputElement) ||
      !document.body.contains(username)
    ) {
      return
    }

    username.focus()
  }, [formRef, loginType])

  const onLoad = async () => {
    setLoading((prev) => ({ ...prev, form: true }))

    localStorage.removeItem('GIV_TERMS')

    const subdomain: string = location.hostname.split('.')[0]

    if (['management','main', 'main-tests', 'localhost'].includes(subdomain)) {
      setShowAccountInput(true)
      setLoading((prev) => ({ ...prev, form: false }))
    } else {
      try {
        const { success, data } = await checkSubdomain(subdomain)
        if (success) {
          method.setValue('account', data.id.toString())
          setLoginType(data)
          setLoading((prev) => ({ ...prev, loginType: false }))
        } else {
          location.href = location.href.replace(subdomain, 'management')
        }
      } catch (e) {
        location.href = location.href.replace(subdomain, 'management')
      } finally {
        setLoading((prev) => ({ ...prev, form: false }))
      }
    }
  }

  const redirectToSupport = () => {
    const hasSupport = JSON.parse(localStorage.getItem('isSupport'))

    const url = new URL(window.location.href)
    ;[...url.searchParams.keys()].forEach((k) => {
      if (!['support', 'error', 'type'].includes(k)) url.searchParams.delete(k)
    })

    const support = url.searchParams.get('support')
    if (hasSupport && hasSupport.support && support === null) {
      url.searchParams.append('support', '')
    }

    if (support === '0') {
      localStorage.removeItem('isSupport')
      url.searchParams.delete('support')
    }

    const newUrl = url.toString()
    if (window.location.href !== newUrl) {
      window.location.href = newUrl
    }

    if (isSupport) {
      localStorage.setItem('isSupport', JSON.stringify({ support: true }))
    }
  }

  useEffect(() => {
    redirectIfKeepConnected()

    method.register('account')
    method.register('terms')

    onLoad()
    redirectToSupport()
  }, [])

  useEffect(() => {
    method.trigger()
  }, [loginType])

  useEffect(() => {
    focusUserName()
  }, [focusUserName])

  const randomIndex = useMemo(() => getRandomIndex(), [])
  const bgImage = `/assets/images/login/login_${randomIndex}.png`
  const copy = copyByImage[randomIndex] || defaultCopy

  return (
    <LoginProvider
      value={{
        method,
        loginType: [loginType, setLoginType],
        loading: [loading, setLoading],
        isSupport,
        modal: [modal, setModal],
        showAccountInput: [showAccountInput, setShowAccountInput],
        showAnimation: [showAnimation, setShowAnimation],
      }}
    >
      <S.Container>
        {showAnimation ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff', // fundo branco
              width: '100%',
              height: '100vh',
            }}
          >
            <video
              ref={videoRef}
              src="/assets/videos/animacao-giv.mp4"
              autoPlay
              playsInline
              muted
              onEnded={() => {
                const cookie = getUserCookies()
                history.push(
                  cookie.tmp_password || cookie.password_expired
                    ? '/main/user/password'
                    : cookie.homepage,
                )
              }}
              style={{
                width: '80%',
                maxWidth: '720px',
                height: '720px',
                borderRadius: '8px',
                objectFit: 'contain',
                backgroundColor: '#fff',
              }}
            />
          </div>
        ) : (
          <>
            <S.BGContainer bgImage={bgImage}>
              <img src="/assets/images/giv-logo.svg" alt="Logo" />

              <S.OverlayText>
                <h1>{renderLines(copy.title)}</h1>
                <p>{renderLines(copy.subtitle)}</p>
              </S.OverlayText>
            </S.BGContainer>

            <S.FormContainer>
              {loading.form ? <MwLoader /> : <FormLogin ref={setFormRef} />}
              <span style={{ position: 'fixed', bottom: 16, fontSize: 16 }}>
                &copy; 2015 - {moment().format('YYYY')} Mundo Wap - Todos os
                direitos reservados.
              </span>
            </S.FormContainer>
          </>
        )}

        <Modal modal={modal} />
      </S.Container>
    </LoginProvider>
  )
}

export default Login
