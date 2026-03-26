import React, { useEffect, useState } from 'react'

import { isString } from '../../../../../../../functions/validators'
import EllipsisContainer from '../../../../../../EllipsisContainer'
import Input from '../../../../../../Input'

import type { HeaderProps } from './interfaces'
import * as S from './styles'

const Header = (props: HeaderProps) => {
  const {
    title,
    search: [searched, _setSearched],
    allowEmptySearch,
    withSearch,
  } = props

  const [search, setSearch] = useState<string>('')

  const setSearched = allowEmptySearch
    ? _setSearched
    : (value: string) => {
        if (value === '') return
        _setSearched(value)
      }

  useEffect(() => {
    setSearch(searched)
  }, [searched])

  const onSubmit = () => {
    setSearched(search)
  }

  const onClear = () => {
    setSearch('')
    setSearched('')
  }

  return (
    <S.Container>
      <EllipsisContainer>
        {isString(title) ? title : title.element}
      </EllipsisContainer>

      {withSearch && (
        <Input
          type='search'
          placeholder='Pesquisa'
          setValue={setSearch}
          value={search}
          onPressEnter={onSubmit}
          clearable={search !== '' && search === searched ? onClear : undefined}
          icon={{
            icon: {
              type: 'feather',
              icon: 'search',
              onClick: onSubmit,
            },
          }}
        />
      )}
    </S.Container>
  )
}

export default Header
