import React, { useState } from 'react'

import Icon from '../../../Icon'

import * as S from './styles'

type SearchProps = {
  menuId: string
  value: [string, (input: string) => void]
  activeIndex: number
} & Required<Pick<React.HTMLAttributes<HTMLInputElement>, 'onKeyDown'>>

// eslint-disable-next-line react/display-name
const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ menuId, onKeyDown, value: [value, setValue], activeIndex }, ref) => {
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

    return (
      <S.SearchContainer>
        <input
          ref={(node) => {
            setInputRef(node)
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder='Buscar...'
          role='searchbox'
          aria-controls={menuId}
          aria-activedescendant={
            activeIndex >= 0 ? `${menuId}-option-${activeIndex}` : undefined
          }
        />

        <Icon
          type='feather'
          {...(value.length > 0
            ? {
                icon: 'x',
                onClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => {
                  e.preventDefault()
                  setValue('')
                  inputRef?.focus()
                },
                strokeWidth: '4px',
              }
            : {
                icon: 'search',
                onClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => {
                  e.preventDefault()
                  e.stopPropagation()
                  inputRef?.focus()
                },
              })}
        />
      </S.SearchContainer>
    )
  },
)

export default Search
