import React, { useEffect, useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'
import JWTDecode from 'jwt-decode'
import { Cookies } from 'react-cookie'
// import { isEmpty } from 'lodash'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import { Header } from '../../../../components/Header'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { createRouteTab } from '../../../../routes'
import { Logout } from '../../../../utils/Auth'
import { dateOrDefault } from '../../../../utils/Formatters'
import { USER_COOKIE } from '../../../constants/user'
import useHomeContext from '../../Home/context'

import Notification from './Modals/Notification'
import PrivacyPolicy from './Modals/PrivacyPolicy'
import { DataTerm, ITokenDecoded } from './interfaces'
import { renewToken as request, getTerms as requestTerms } from './services'
import * as Styled from './styled'

const Terms = createRouteTab(
  () => {
    const history = useHistory()
    const [locationKeys, setLocationKeys] = useState<(string | undefined)[]>([])
    const cookies = new Cookies()

    const [notificationModal, setNotificationModal] = useState(false)
    const [privacyModal, setPrivacyModal] = useState(false)
    const [term, setTerm] = useState({ accepted: false } as DataTerm)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<DataTerm[]>([])

    const { payload } = JWTDecode<ITokenDecoded>(cookies.get(USER_COOKIE).token)
    const { contractor } = payload

    const { disabled } = useHomeContext()

    useEffect(() => {
      return history.listen((location) => {
        if (history.action === 'PUSH') {
          setLocationKeys([location.key])
        }

        if (history.action === 'POP') {
          if (locationKeys[1] === location.key) {
            setLocationKeys(([, ...keys]) => keys)

            Logout()
          }
        }
      })
    }, [locationKeys])

    const updateData = async () => {
      setLoading(true)
      try {
        // getTerms
        const terms = await requestTerms()

        setData(terms)
        setLoading(false)
        return terms
      } catch (error) {
        console.error(error)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
      return []
    }

    const handleReloadData = async () => {
      await updateData()
    }

    const handleLoadData = async () => {
      const terms = await updateData()
      if (terms.some((term) => !term.accepted && term.required)) {
        setNotificationModal(true)
      }
    }

    useEffect(() => {
      handleLoadData()
    }, [])

    const handleAcceptTerms = async () => {
      setLoading(true)
      try {
        // RenewToken
        const data = await request(contractor)

        const { token: newToken, terms } = data.data
        const previousCookie = cookies.get(USER_COOKIE)
        delete previousCookie.token

        if (data.success) {
          const cookies = new Cookies()
          const _giv_user = cookies.get(USER_COOKIE)

          _giv_user.token = newToken
          _giv_user.terms = terms

          const domain = (window as typeof window & { domain: string }).domain

          cookies.remove(USER_COOKIE)
          cookies.set(USER_COOKIE, _giv_user, {
            path: '/',
            domain: domain ? `.${domain}` : location.hostname,
          })

          const url = _giv_user.HOME_URL || '/main/home'

          await window.location.replace(url)
        }
      } catch (error) {
        toast(<ToasterContent color='error' />, ErrorStyle)
      } finally {
        setLoading(false)
      }
    }

    return (
      <React.Fragment>
        <Header description='Para prosseguir com o acesso é necessário validar os documentos abaixo' />

        <Styled.Container>
          {loading && <MwLoader filled />}

          <Styled.Grid>
            <Styled.Row>
              <Styled.Column width={8}>
                <span>Documento</span>
              </Styled.Column>

              <Styled.Column width={8}>
                <span>Status</span>
              </Styled.Column>
            </Styled.Row>

            {data.map((item: DataTerm, index: number) => {
              return (
                <Styled.Row column='equal' key={index}>
                  <Styled.Column width={8}>
                    <Styled.Wrapper
                      direction='column'
                      alignItems='flex-start'
                      justifycontent='center'
                    >
                      <p>
                        {item.title || '-'} | {item.subject || '-'}
                        {item.required ? '*' : ''}
                      </p>

                      <p>
                        Publicação em:{' '}
                        {dateOrDefault(item.created_at, '-', 'DD/MM/YYYY')}
                      </p>
                    </Styled.Wrapper>
                  </Styled.Column>

                  <Styled.Column width={8}>
                    <Styled.Wrapper
                      direction='row'
                      alignItems='center'
                      justifycontent='space-between'
                    >
                      <img
                        src={
                          item.accepted
                            ? '/assets/icons/check_green.svg'
                            : '/assets/icons/check_grey.svg'
                        }
                        alt='item não checado'
                      />

                      <button
                        onClick={() => {
                          setTerm(item)
                          setPrivacyModal(true)
                        }}
                      >
                        Visualizar
                      </button>
                    </Styled.Wrapper>
                  </Styled.Column>
                </Styled.Row>
              )
            })}
          </Styled.Grid>
        </Styled.Container>

        {disabled === 'terms' && (
          <Styled.Footer
            buttons={[
              {
                type: 'button',

                disabled: loading,
                appearance: 'bordered',
                onClick: () => Logout(),
                children: 'Sair',
              },
              {
                type: 'button',
                disabled:
                  data.length === 0 ||
                  data.some((term) => !term.accepted && term.required) ||
                  loading,
                onClick: handleAcceptTerms,
                children: 'Avançar',
              },
            ]}
          />
        )}

        <Notification
          open={notificationModal}
          close={() => setNotificationModal(false)}
        />

        {privacyModal && (
          <PrivacyPolicy
            close={() => {
              setPrivacyModal(false)
              handleReloadData()
            }}
            term={term}
          />
        )}
      </React.Fragment>
    )
  },
  (props) => <React.Fragment children={props.children} />,
)

export default Terms
