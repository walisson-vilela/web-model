import React, { useCallback, useEffect, useState } from 'react'

import { MwGrid, MwIcon, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import {
  getClient,
  getClientId,
} from '../../../../../../../../../screens/ContractorClient/services'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'
import useContext from '../../../../context'
import labels from '../../../../labels'
import { getContractorBySubdomain } from '../../../../services'

import * as S from './styles'

const name = 'subdomain'

const Label = () => {
  return (
    <S.Label>
      {labels[name].label} *
      <Popup
        on='click'
        position='top left'
        trigger={<MwIcon type='feather' icon='info' color='darkBlue' />}
        offset={[6, 0]}
        content='O termo escolhido esta sujeito a revisão.'
        inverted
        onOpen={(e) => {
          e.preventDefault()
        }}
      />
    </S.Label>
  )
}

const Subdomain = () => {
  const {
    data,
    setModal,
    form: {
      control,
      formState: { dirtyFields, errors },
      setValue,
      setValueOptions,
      isInvalid,
    },
    viewMode,
    isMaster,
  } = useContext()

  const [loading, setLoading] = useState(false)

  const [identifier, setIdentifier] = useState('')

  const loadIdentifier = useCallback(async () => {
    if (isMaster) {
      setIdentifier('')
      return
    }

    try {
      const clientId = await getClientId()
      const { data } = await getClient(clientId)
      const identifier = notEmptyStringOrDefault(
        data.identifier,
        '',
      ).toLowerCase()
      if (identifier) {
        setIdentifier(
          identifier.startsWith('-') ? identifier : `-${identifier}`,
        )
      } else {
        setIdentifier('')
      }
    } catch (error) {
      console.error(error)
    }
  }, [isMaster])

  useEffect(() => {
    loadIdentifier()
  }, [loadIdentifier])

  const createUsedSubdomainModal = (subdomain: string) => {
    setModal({
      title: 'Notificação',
      actions: [
        {
          primary: true,
          content: 'OK',
          onClick: () => {
            setModal(null)
            setValue(name, '', setValueOptions)
          },
        },
      ],
      content: (
        <React.Fragment>
          <p style={{ marginBottom: '3.5px' }}>
            O subdomínio informado <b>{subdomain}</b> não pode ser utilizado.{' '}
            {isObject(errors[name]) &&
              name in errors &&
              subdomain &&
              errors[name].message}
          </p>
        </React.Fragment>
      ),
    })
  }

  const sufix = (() => {
    if (window.location.hostname.endsWith('traderesult.app')) {
      return 'traderesult.app'
    }

    if (window.location.hostname.endsWith('traderesult.ninja')) {
      return 'traderesult.ninja'
    }

    return 'xpto.ninja'
  })()

  const fullIdentifier = `${identifier}.${sufix}`

  return (
    <MwGrid
      rows={{ borderless: true, spacing: '0' }}
      cols={{ spacing: '0' }}
      spacing='0'
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col>
          <Controller
            control={control}
            name={name}
            render={({ field: props }) => {
              const { value } = props

              const invalid = name in errors
              const dirty = name in dirtyFields

              const id = data ? numberOrDefault(data.id) : null

              const checkSubdomain = useCallback(async () => {
                if (!value || !dirty) return

                if (value && dirty && invalid) {
                  createUsedSubdomainModal(value)
                  return
                }

                setLoading(true)

                try {
                  const response = await getContractorBySubdomain(value)
                  if (!response.success) createUsedSubdomainModal(value)
                } catch (e) {
                  toast(<ToasterContent color='error' />, ErrorStyle)
                }

                setLoading(false)
              }, [value, invalid, dirty])

              return (
                <MwInput
                  {...props}
                  type='text'
                  label={viewMode ? labels[name].label : <Label />}
                  placeholder={labels[name].placeholder}
                  disabled={loading || id !== null}
                  loading={loading}
                  onBlur={checkSubdomain}
                  invalid={isInvalid(name)}
                />
              )
            }}
          />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <S.TextEllipsis children={fullIdentifier} title={fullIdentifier} />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Subdomain
