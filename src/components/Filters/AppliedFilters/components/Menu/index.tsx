import React, { useEffect, useState } from 'react'

import { strCmp } from '../../../../../functions/validators'
import Icon from '../../../../Icon'
import Input from '../../../../Input'
import Link from '../../../../Link'
import ScrollContainer from '../../../../ScrollContainer'

import type { AppliedFiltersMenuProps } from './interfaces'
import * as S from './styles'

const AppliedFiltersMenu = (props: AppliedFiltersMenuProps) => {
  const {
    open,
    close,
    appliedFilters: [appliedFilters, setAppliedFilters],
  } = props

  const [search, setSearch] = useState<string>('')
  const [searched, setSearched] = useState<string>('')

  useEffect(() => {
    setSearch('')
    setSearched('')
  }, [open])

  const onClear = () => {
    setAppliedFilters([])
    close()
  }

  const onSubmitSearch = () => {
    setSearched(search)
  }

  const onClearSearch = () => {
    setSearch('')
    setSearched('')
  }

  const onRemove = (name: string) => {
    setAppliedFilters((prev) => prev.filter((e) => e.name !== name))
  }

  return (
    <S.Container
      open={open}
      width='275px'
      height='261px'
      transition={{ properties: { height: {} } }}
      {...(props.containerProps || {})}
    >
      <div>
        <S.Header>
          <div>
            <S.Title>Filtros Aplicados</S.Title>

            <Link onClick={onClear} children='Limpar Todos' />
          </div>

          <Input
            type='search'
            placeholder='Pesquisar'
            setValue={setSearch}
            value={search}
            onPressEnter={onSubmitSearch}
            icon={{
              icon: {
                type: 'feather',
                icon: 'search',
                onClick: onSubmitSearch,
              },
            }}
            clearable={
              search !== '' && search === searched ? onClearSearch : undefined
            }
          />
        </S.Header>

        <ScrollContainer>
          {appliedFilters
            .filter(
              ({
                labels: {
                  filter: { text: filter },
                  option: { text: option },
                },
              }): boolean => {
                return (
                  strCmp(filter, searched, { contain: true }) ||
                  strCmp(option, searched, { contain: true })
                )
              },
            )
            .map(
              (
                {
                  labels: {
                    filter: { element: filter },
                    option: { element: option },
                  },
                  name,
                },
                index,
              ) => {
                return (
                  <S.Item key={index}>
                    <div>
                      <div>{filter}</div>
                      <div>{option}</div>
                    </div>
                    <div>
                      <Icon
                        type='feather'
                        icon='minus_circle'
                        width='12px'
                        height='12px'
                        color='darkSilver'
                        onClick={() => onRemove(name)}
                      />
                    </div>
                  </S.Item>
                )
              },
            )}
        </ScrollContainer>
      </div>
    </S.Container>
  )
}

export default AppliedFiltersMenu
