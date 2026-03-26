import React from 'react'

import Link from '../../../../../../../Link'
import Input from '../../../../../Input'
import { useContext } from '../../context'
import type { Option } from '../../interfaces'

import * as S from './styles'

const CheckAll = () => {
  const context = useContext()

  const {
    checked: [checked, setChecked],
    options,

    limits,
  } = context
  const { max, enabled, error } = limits

  // how many options can be checked
  const maxCheck = options.reduce((count, o, idx) => {
    if (o.disabled) return count
    const rule = o.rules?.some((rule) => rule(idx, o.data) !== true)
    if (rule) return count
    return count + 1
  }, 0)

  const maxAllowed =
    enabled && typeof max === 'number' ? Math.min(max, maxCheck) : maxCheck

  const onClick = () => {
    setChecked((prev) => {
      if (prev.length >= maxAllowed) return []
      if (maxAllowed <= 0) return []

      // check only enabled options
      const checked: Pick<Option, 'value' | 'data'>[] = []

      options.forEach((o, idx) => {
        if (checked.length >= maxAllowed) return
        if (o.disabled) return
        const rule = o.rules?.some((rule) => rule(idx, o.data) !== true)
        if (rule) return
        checked.push({ value: o.value, data: o.data })
      })

      return checked
    })
  }

  return (
    <S.SelectAllContainer>
      <b>Selecionados ({checked.length})</b>

      <Link
        children={
          checked.length >= maxAllowed ? 'Desmarcar todos' : 'Selecionar todos'
        }
        onClick={error ? undefined : onClick}
      />
    </S.SelectAllContainer>
  )
}

const Header = () => {
  const context = useContext()

  if (!context.props.search) {
    return <React.Fragment />
  }

  const {
    searchInput: [searchInput, setSearchInput],
    limits,
  } = context
  const showSelectAll = context.props.selectAll && limits.max === undefined

  return (
    <S.HeaderContainer>
      {showSelectAll && <CheckAll />}

      <Input
        type='search'
        placeholder='Pesquisa'
        setValue={setSearchInput}
        value={searchInput}
        icon={{
          icon: {
            type: 'feather',
            icon: 'search',
          },
        }}
      />
    </S.HeaderContainer>
  )
}

export default Header
