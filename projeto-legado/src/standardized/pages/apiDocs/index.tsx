import React, { useEffect, useState } from 'react'

import { MwLoader, MwScrollContainer } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { Cookies } from 'react-cookie'
import SwaggerUI from 'swagger-ui-react'
import SwaggerUIProps from 'swagger-ui-react/swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

import { createRouteTab } from '../../../routes'
import axios from '../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import * as S from './styles'

const setDefaults = (spec: GenericObject): GenericObject => {
  if (isObject(spec.components)) {
    if (isObject(spec.components.parameters)) {
      if (isObject(spec.components.parameters['Accept-Timezone'])) {
        if (isObject(spec.components.parameters['Accept-Timezone'].schema)) {
          const value = Intl.DateTimeFormat().resolvedOptions().timeZone
          spec.components.parameters['Accept-Timezone'].schema.default = value
        }
      }

      if (isObject(spec.components.parameters['Accept-Language'])) {
        if (isObject(spec.components.parameters['Accept-Language'].schema)) {
          const value = (
            localStorage.getItem('_GIV_LOCALE') || navigator.language
          ).split('-')
          if (value.length === 2) {
            value[1] = value[1].toUpperCase()
            spec.components.parameters['Accept-Language'].schema.default =
              value.join('-')
          }
        }
      }
    }
  }

  return spec
}

const ApiDocs = createRouteTab(
  () => {
    const [spec, setSpec] = useState<SwaggerUIProps['spec']>()
    const [loading, setLoading] = useState<boolean>(true)

    const loadData = async () => {
      setLoading(true)

      try {
        const { data: response } = await axios.get('/docs')

        if (isObject(response)) {
          setSpec(setDefaults(response))
        }
      } catch (e) {
        console.error(e)
      }

      setLoading(false)
    }

    useEffect(() => {
      loadData()
    }, [])

    const requestInterceptor: SwaggerUIProps['requestInterceptor'] = (req) => {
      const cookies = new Cookies()
      const user = cookies.get('_GIV_USER')
      if (!isObject(user)) return req
      const token = notEmptyStringOrDefault(user.token)

      const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }

      req.headers = {
        ...headers,
        ...(req.headers || {}),
      }

      return req
    }

    return (
      <MwScrollContainer>
        <S.MainContainer>
          {spec ? (
            <SwaggerUI {...{ spec, requestInterceptor }} />
          ) : (
            <S.Error children='Não foi possível carregar a documentação da API, tente novamente mais tarde.' />
          )}
          {loading && <MwLoader filled />}
        </S.MainContainer>
      </MwScrollContainer>
    )
  },
  (props) => <React.Fragment children={props.children} />,
)

export default ApiDocs
