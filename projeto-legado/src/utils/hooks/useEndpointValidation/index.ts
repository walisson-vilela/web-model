import { useCallback, useEffect, useState } from 'react'

import { AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from '../../../services/Axios/instance'

import {
  EndpointResponse,
  EndpointValidationOptions,
  Response,
} from './interfaces'

const useEndpointValidation = <Form = {}>(
  options: EndpointValidationOptions<Form>,
): Response => {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    endpoint,
    key = 'name',
    delay = 750,
    baseURL,
    exceptID,
    minLength = 0,
    properties = null,
    messages = {},
  } = options

  const {
    valid: validMessage = '',
    invalid: invalidMessage = 'O campo enviado é inválido!',
    notVerified: notVerifiedMessage = '',
  } = messages

  const value =
    options.stateValue || options.formInstance.watch(options.formKey)

  const trigger = useCallback(() => {
    setLoading(false)

    setIsValid(null)

    let timeoutID: NodeJS.Timeout | null = null
    const abortController = new AbortController()

    const validateEndpoint = async () => {
      setLoading(true)

      try {
        const config: AxiosRequestConfig = {
          params: { [key]: value },
          signal: abortController.signal,
        }

        if (baseURL) config.baseURL = baseURL
        if (exceptID) config.params.id = exceptID
        if (properties !== null) {
          const keys = Object.keys(properties)
          keys.map(
            (name, index) =>
              (config.params[name] = Object.values(properties)[index]),
          )
        }

        const { data }: AxiosResponse<EndpointResponse> = await axios.get(
          endpoint,
          config,
        )

        setIsValid(data.success)
        setLoading(false)
      } catch (error) {
        if (!abortController.signal.aborted) {
          setIsValid(false)
          setLoading(false)
        }
      }
    }

    value && value.toString().length >= minLength
      ? (timeoutID = setTimeout(validateEndpoint, delay))
      : setIsValid(null)

    return () => {
      if (timeoutID) clearTimeout(timeoutID)

      abortController.abort()
    }
  }, [endpoint, value, ...Object.values(properties || {})])

  useEffect(trigger, [trigger])

  useEffect(() => {
    if (options.formInstance) {
      const { clearErrors, setError } = options.formInstance

      if (isValid === false) {
        setError(options.formKey, {
          type: 'check',
          message: invalidMessage,
        })
      } else if (isValid === true) {
        clearErrors(options.formKey)
      }
    }
  }, [isValid])

  const returnItems: Response = {
    isValid,
    loading,
    trigger: () => {
      const { clearErrors } = options.formInstance

      clearErrors(options.formKey)
      trigger()
    },
  }

  if (messages) {
    returnItems.message = (() => {
      if (isValid === false) return invalidMessage
      else if (isValid) return validMessage
      return notVerifiedMessage
    })()
  }

  return returnItems
}

export default useEndpointValidation
