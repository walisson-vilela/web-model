import React, { useEffect, useState } from 'react'

import Flag from '../../../../assets/icons/flags'
import { notEmptyString } from '../../../../functions/validators'
import { useOnClickOut } from '../../../../hooks'
import Icon from '../../../Icon'
import Menu from '../../../Menu'
import type { Option } from '../../../Menu/interfaces'
import Input from '../Input'

import countries from './countries'
import type { Country, Details, IconProps, PhoneProps } from './interfaces'
import * as S from './styles'

export const getPhoneDetails = (phone: string): Details | null => {
  if (!notEmptyString(phone)) return null

  // mantendo apenas numeros e espacoes e separando por espacos
  const splitted = phone.replace(/[^0-9\s]/g, '').split(' ')
  // se tem pelo menos 2 posicoes a primeira deve ser o ddi e a segunda o restante do numero
  if (splitted.length < 2) return null

  // pegando o ddi na primeira posicao
  const ddi = parseInt(splitted[0])
  splitted.shift()

  // verificando se existe algum pais com o ddi correspondente
  const iso = (Object.keys(countries) as (keyof typeof countries)[]).find(
    (k) => {
      return countries[k].ddi === ddi
    },
  )

  const country = !iso ? countries.br : countries[iso]

  // juntando o restante do numero do telefone e mantendo apenas digitos
  let masked = splitted.join(' ').replace(/\D+/g, '')
  const value = masked
  // mantendo o limite de caracteres especificado pelo pais selecionado
  masked = masked.substring(0, country.charLimit)
  // se o pais selecionado possui mascara, aplica a mascara
  if (country.mask) masked = country.mask(masked)

  // se o pais selecionado nao tem validacao, considera valido
  let valid = true
  const validation = country.validation
  if (validation instanceof RegExp) {
    // se a validacao for do tipo regex, faz o teste
    valid = validation.test(value)
  } else if (typeof validation === 'function') {
    // se for do tipo funcao chama a funcao pra fazer o teste
    valid = validation(value)
  }

  return {
    country,
    masked,
    value,
    withDDI: `${country.ddi} ${value}`,
    valid,
  }
}

const Button = (props: IconProps) => {
  const {
    country: [country],
    open: [open, setOpen],
    disabled,
  } = props

  return (
    <S.IconContainer
      {...(disabled ? {} : { onClick: () => setOpen((prev) => !prev) })}
    >
      <Flag $iso={country.iso} />
      <Icon
        type='feather'
        icon={open ? 'chevron_up' : 'chevron_down'}
        width='14px'
        color='lightGrey'
      />
    </S.IconContainer>
  )
}

const Component = React.forwardRef(
  (props: PhoneProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { value, setValue } = props

    const [inputValue, setInputValue] = useState<string>(
      !value
        ? ''
        : () => {
            const details = getPhoneDetails(value)
            return details ? details.masked : value
          },
    )
    const [country, setCountry] = useState<Country>(countries.br)
    const [open, setOpen] = useState<boolean>(false)

    const options: Option[] = (
      Object.keys(countries) as (keyof typeof countries)[]
    ).map((iso) => ({
      label: (option) => {
        const country = option.data as Country
        return (
          <S.Label>
            <Flag $iso={iso} />
            {country.name}
            <span>+{country.ddi}</span>
          </S.Label>
        )
      },
      onClick: () => {
        setCountry(countries[iso])
      },
      data: countries[iso],
    }))

    const mask = (value: string): string => {
      value = value.replace(/\D+/g, '')
      value = value.substring(0, country.charLimit)
      if (country.mask) value = country.mask(value)
      return value
    }

    useEffect(() => {
      if (!value) {
        setInputValue('')
        return
      }

      const details = getPhoneDetails(value)
      if (details) {
        setCountry(details.country)
        setInputValue(details.masked)
      } else {
        setCountry(countries.br)
        setInputValue(value)
      }
    }, [value])

    useEffect(() => {
      setInputValue((prev) => mask(prev))
    }, [country])

    useEffect(() => {
      const v = inputValue.replace(/\D+/g, '').substring(0, country.charLimit)
      setValue(v ? `${country.ddi} ${v}` : v)
    }, [inputValue])

    const placeholder =
      props.placeholder && props.placeholder[country.iso]
        ? props.placeholder[country.iso]
        : country.placeholder

    return (
      <S.RelativeContainer
        ref={useOnClickOut<HTMLDivElement>(() => setOpen(false))}
      >
        <Input
          {...props}
          type='text'
          placeholder={placeholder}
          mask={mask}
          value={inputValue}
          setValue={setInputValue}
          icon={{
            icon: {
              icon: (
                <Button
                  country={[country, setCountry]}
                  open={[open, setOpen]}
                />
              ),
              type: 'jsx',
              width: '35px',
            },
            position: 'left',
          }}
          ref={ref}
        />

        <Menu
          open={open}
          close={() => setOpen(false)}
          options={options}
          width='100%'
          maxHeight='165px'
          bordered
          itemSpacing='s3'
          transition={{ properties: { 'max-height': {} } }}
          references={{ bottom: props.paddingless ? '21px' : '35px' }}
        />
      </S.RelativeContainer>
    )
  },
)

Component.displayName = 'Phone'

const Phone = Object.assign(Component, {
  getPhoneDetails,
})

export default Phone
