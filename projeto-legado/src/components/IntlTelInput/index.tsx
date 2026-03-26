import React, { useEffect, useRef, useState } from 'react'

import { Control, Controller } from 'react-hook-form'
import { Icon, InputOnChangeData, InputProps } from 'semantic-ui-react'
import * as yup from 'yup'

import { notEmptyString } from '../../utils/Validators'

import countries from './countries'
import { Country, DropdownDirection } from './interfaces'
import * as S from './styled'

export interface Common extends InputProps {
  direction?: DropdownDirection
  borderless?: boolean
}

interface IntlTelInputProps extends Common {
  name: string
  setValue: (value: string) => void
  value: string
  control?: Control
}

export interface IntlTelInputState extends Country {
  masked: string
  value: string
  withDDI: string
  valid: boolean
}

export const getIntlTelInputInfo = (phone: string): IntlTelInputState => {
  if (!notEmptyString(phone)) return null

  // mantendo apenas numeros e espacoes e separando por espacos
  const splitted = phone.replace(/[^0-9\s]/g, '').split(' ')
  // se tem pelo menos 2 posicoes a primeira deve ser o ddi e a segunda o restante do numero
  if (splitted.length < 2) return null

  // pegando o ddi na primeira posicao
  const ddi = parseInt(splitted.shift())
  // verificando se existe algum pais com o ddi correspondente
  const iso = Object.keys(countries).find((k) => {
    return countries[k].ddi === ddi
  })

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
  // se a validacao for do tipo regex, faz o teste
  if (validation instanceof RegExp) {
    valid = validation.test(value)
  }
  // se for do tipo funcao chama a funcao pra fazer o teste
  else if (typeof validation === 'function') {
    valid = validation(value)
  }

  return {
    ...country,
    masked,
    value,
    withDDI: `${country.ddi} ${value}`,
    valid,
  }
}

const IntlTelInput = (props: IntlTelInputProps) => {
  const { value, setValue } = { ...props }

  const [country, setCountry] = useState<Country>(countries.br)
  const [inputValue, setInputValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [direction, setDirection] = useState<DropdownDirection>(
    props.direction || 'bottom',
  )

  const ref = useRef<HTMLDivElement>(null)

  // fecha as opcoes quando clicar fora da lista
  const close = (event: MouseEvent) => {
    const target = event.target as Node
    if (
      !ref ||
      !ref.current ||
      !document.body.contains(ref.current) ||
      ref.current.contains(target)
    )
      return

    setOpen(false)
  }

  // calcula pra qual direcao as opcoes devem abrir de acordo com a posicao na tela
  const defDirection = () => {
    if (
      props.direction ||
      !ref ||
      !ref.current ||
      !document.body.contains(ref.current)
    )
      return

    const pos = ref.current.parentElement.offsetTop
    const percent = (pos * 100) / window.innerHeight

    setDirection(percent > 50 ? 'top' : 'bottom')
  }

  useEffect(() => {
    document.body.addEventListener('click', close)
    window.addEventListener('load', defDirection)
    window.addEventListener('resize', defDirection)

    return () => {
      document.body.removeEventListener('click', close)
      window.removeEventListener('load', defDirection)
      window.removeEventListener('resize', defDirection)
    }
  }, [])

  useEffect(() => {
    let newInputValue = value

    if (notEmptyString(value)) {
      let curCountry = country

      // mantendo apenas numeros e espacoes e separando por espacos
      const splitted = value.replace(/[^0-9\s]/g, '').split(' ')
      // se tem pelo menos 2 posicoes a primeira deve ser o ddi e a segunda o restante do numero
      if (splitted.length > 1) {
        // pegando o ddi na primeira posicao
        const ddi = parseInt(splitted.shift())
        // verificando se existe algum pais com o ddi correspondente
        const iso = Object.keys(countries).find((k) => {
          return countries[k].ddi === ddi
        })

        // caso exista
        if (iso) curCountry = countries[iso]
        setCountry(curCountry)
      }

      // juntando o restante do numero do telefone e mantendo apenas digitos
      newInputValue = splitted.join(' ').replace(/\D+/g, '')
      // mantendo o limite de caracteres especificado pelo pais selecionado
      newInputValue = newInputValue.substring(0, curCountry.charLimit)
      // se o pais selecionado possui mascara, aplica a mascara
      if (curCountry.mask) newInputValue = curCountry.mask(newInputValue)
    }

    setInputValue(newInputValue)
  }, [value])

  // deletando props que nao serao usadas ou serao substituidas no input
  const inputProps = { ...props }
  delete inputProps.control
  delete inputProps.setInfo
  delete inputProps.setValue
  delete inputProps.direction
  delete inputProps.onChange
  inputProps.$borderless = inputProps.borderless
  delete inputProps.borderless

  inputProps.value = inputValue
  inputProps.placeholder = props.placeholder || country.placeholder

  const onClickOption = (iso: string) => {
    const newCountry = countries[iso]
    // mantendo apenas numeros
    let newValue = inputValue.replace(/\D+/g, '')

    if (newValue === '') {
      setCountry(newCountry)
    } else {
      // mantendo o limite de caracteres especificado pelo pais selecionado
      newValue = newValue.substring(0, newCountry.charLimit)
      newValue = `${newCountry.ddi} ${newValue}`
    }

    setValue(newValue)
    setOpen(false)
  }

  return (
    <S.Container fluid={inputProps.fluid}>
      <div ref={ref}>
        <S.SelectBtn
          type='button'
          onClick={() => setOpen((prev) => !prev)}
          disabled={inputProps.disabled}
          tabIndex={-1}
        >
          <S.Img
            name={country.iso}
            className='flag-input-tel'
            title={`${country.name}: +${country.ddi}`}
          />

          <Icon name={open ? 'caret up' : 'caret down'} />
        </S.SelectBtn>

        <S.Options open={open} direction={direction}>
          <S.OptionsContainer tabIndex={-1}>
            {Object.keys(countries).map((key) => {
              const { iso, name, ddi } = countries[key]
              return (
                <div key={iso} onClick={() => onClickOption(iso)}>
                  <S.Img
                    name={iso}
                    className='flag-input-tel'
                    title={`${name}: +${ddi}`}
                  />

                  {name}

                  <span>+{ddi}</span>
                </div>
              )
            })}
          </S.OptionsContainer>
        </S.Options>
      </div>

      {props.control ? (
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => {
            return (
              <S.Input
                {...field}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  data: InputOnChangeData,
                ) => {
                  if (props.onChange) props.onChange(event, data)

                  // mantendo apenas numeros
                  let newValue = event.target.value.replace(/\D+/g, '')
                  // mantendo o limite de caracteres especificado pelo pais selecionado
                  newValue = newValue.substring(0, country.charLimit)
                  if (newValue !== '') newValue = `${country.ddi} ${newValue}`

                  event.target.value = newValue
                  field.onChange(event)
                }}
                {...inputProps}
              />
            )
          }}
        />
      ) : (
        <S.Input
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            data: InputOnChangeData,
          ) => {
            if (props.onChange) props.onChange(event, data)

            // mantendo apenas numeros
            let newValue = event.target.value.replace(/\D+/g, '')
            // mantendo o limite de caracteres especificado pelo pais selecionado
            newValue = newValue.substring(0, country.charLimit)
            if (newValue !== '') newValue = `${country.ddi} ${newValue}`

            setValue(newValue)
          }}
          {...inputProps}
        />
      )}
    </S.Container>
  )
}

interface IntlTelInputControlProps extends Common {
  name: string
  setValue: (
    name: any,
    value: string,
    config?: Partial<{
      shouldValidate: boolean
      shouldDirty: boolean
    }>,
  ) => void
  watch: Function
  control: Control
}

export const IntlTelInputControl = (props: IntlTelInputControlProps) => {
  const { watch, name } = props

  const value = watch(name)
  const inputProps: IntlTelInputProps = {
    ...props,
    setValue: (v: string) =>
      props.setValue(name, v, {
        shouldDirty: true,
        shouldValidate: true,
      }),
    value,
  }
  delete inputProps.watch

  return <IntlTelInput {...inputProps} />
}

export const IntlTelInputValidator = (required: boolean = false) => {
  const validate = (phone: string): boolean => {
    const info = getIntlTelInputInfo(phone)

    if (!info) return false

    const { valid } = info

    return valid
  }

  return required
    ? yup
        .string()
        .required()
        .test('valid_phone', 'Invalid phone number!', validate)
    : yup
        .string()
        .notRequired()
        .test('valid_phone', 'Invalid phone number!', (phone: string) => {
          return phone === '' ? true : validate(phone)
        })
}

export default IntlTelInput
