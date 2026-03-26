import React, { useCallback, useState } from 'react'

import * as GlobalStyles from '../../../styled'

import SearchFeatherIcon from './icons/SearchFeather'
import XIcon from './icons/X'
import * as S from './styled'

interface SearchProps {
  /** Seta o valor inicial do input */
  search?: string
  /** funcao que ira controlar o valor do input de busca, alterado quando faz submit */
  setSearch: (search: string) => void
  /** indicador de input desabilitado */
  disabled?: boolean
  /** indicador de input carregando */
  loading?: boolean

  /** funcao que ira controlar o input de busca, alterado quando em tempo real */
  inputState?: [string, React.Dispatch<React.SetStateAction<string>>]

  /** funcao que sera chamada após fazer o submit do formulario */
  onSubmit?: (value: string) => void

  width?: string
  fluid?: boolean
  transparent?: boolean
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive'
  icon?: 'feather'
}

const icons = {
  feather: <SearchFeatherIcon />,
}

const Search = (props: SearchProps) => {
  const { loading, search } = { ...props }

  const { width, fluid, transparent, size } = { ...props }

  const icon = icons[props.icon || 'feather']

  const setSearchState = props.setSearch

  const disabled = props.disabled !== undefined ? props.disabled : loading

  const onSubmit = props.onSubmit || (() => {})

  const [submitted, setSubmitted] = useState<string>(search || '')
  const [localValue, setLocalValue] = useState<string>(search || '')
  const [value, setValue] = props.inputState || [localValue, setLocalValue]
  const [ref, setRef] = useState<HTMLFormElement | null>(null)

  const setSearch = (value: string) => {
    setSearchState(value)
    setValue(value)
    setSubmitted(value)
  }

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setSearch(value)
    onSubmit(value)
  }

  const clear = () => {
    setSearch('')
    onSubmit('')
  }

  const reset: Exclude<
    React.HTMLAttributes<HTMLInputElement>['onBlur'],
    undefined
  > = useCallback(
    (e) => {
      if (ref && ref.contains(e.relatedTarget)) {
        return
      }
      setValue(submitted)
    },
    [ref, setValue, submitted],
  )

  return (
    <GlobalStyles.ThemeContainer>
      <S.Container $width={width}>
        <form onSubmit={onSubmitForm} ref={setRef}>
          <GlobalStyles.Input
            type='search'
            name='search'
            icon={(() => {
              if (loading) return
              if (value !== '' && value === submitted) {
                return (
                  <S.SearchButton
                    type='button'
                    onClick={clear}
                    disabled={disabled}
                  >
                    <XIcon />
                  </S.SearchButton>
                )
              }

              return (
                <S.SearchButton type='submit' disabled={disabled}>
                  {icon}
                </S.SearchButton>
              )
            })()}
            placeholder='Pesquisar'
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            disabled={disabled || loading}
            loading={loading}
            fluid={fluid}
            transparent={transparent}
            size={size}
            onBlur={reset}
          />
        </form>
      </S.Container>
    </GlobalStyles.ThemeContainer>
  )
}

export default Search
