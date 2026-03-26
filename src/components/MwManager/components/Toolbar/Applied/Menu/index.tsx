import React, { useEffect, useState } from 'react'

import EllipsisContainer from '../../../EllipsisContainer'
import SearchInput from '../../Search'
import type { AppliedFilter } from '../../interfaces'
import type { MenuProps } from '../interfaces'

import MinusIcon from './MinusCircle'
import * as S from './styled'

const getStr = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getStr).join(' ')
  }

  if (React.isValidElement(node)) {
    return getStr(node.props.children)
  }

  return ''
}

const Menu = (props: MenuProps) => {
  const { open } = { ...props }

  // recebendo os filtros aplicados e a funcao de setar os filtros aplicados
  const { appliedFilters, setAppliedFilters, loading } = { ...props }

  // criando o estado que ira controlar a string que esta sendo pesquisada, so altera quando submetido
  const [search, setSearch] = useState<string>('')
  // criando o estado que ira controlar a string que esta sendo pesquisada, altera em tempo real
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  // criando o estado que ira controlar os filtros que estao aparecendo na tela
  const [showingAppliedFilters, setShowingAppliedFilters] = useState<
    AppliedFilter[]
  >([...appliedFilters])

  // essa funcao alterar a lista de filtros que estao aparecendo na tela para que so tenha os que correspondem a string recebida
  const updateShowingFilters = (value: string): void => {
    value = value.toLocaleLowerCase()
    // setando novos filtros a serem mostrados
    setShowingAppliedFilters(
      // filtrando os filtros que devem ser mostrados
      appliedFilters.filter((appliedFilter): boolean => {
        // Acessando o nome do filtro e o valor
        const { filter, option } = appliedFilter.labels
        // Convertendo o nome do filtro
        const label = filter.toLocaleLowerCase()

        // Recuperando se o valor é uma String ou um Element
        const optionResult = getStr(option)
        // verificando se o nome ou valor do filtro contem a string recebida, se sim, retorna true para mostra-lo na tela
        return (
          label.indexOf(value) !== -1 ||
          (option !== null &&
            optionResult.toLocaleLowerCase().indexOf(value) !== -1)
        )
      }),
    )
  }

  // sempre que os filtros aplicados forem alterados, atualiza os filtros que devem ser mostrados na tela
  useEffect(() => {
    if (!open) {
      setSearch('')
      setSearchInputValue('')
    }
  }, [open])

  // sempre que os filtros aplicados forem alterados, atualiza os filtros que devem ser mostrados na tela
  useEffect(() => {
    updateShowingFilters(search)
  }, [appliedFilters])

  // sempre que a string de busca for alterada, atualiza os filtros que devem ser mostrados na tela
  useEffect(() => {
    updateShowingFilters(search)
  }, [search])

  return (
    <S.Container $open={open}>
      <S.SubContainer>
        <S.FlexContainer>
          <S.Title>Filtros aplicados</S.Title>

          <S.Link
            onClick={() => {
              setAppliedFilters([])
            }}
            disabled={loading || appliedFilters.length === 0}
          >
            Limpar todos
          </S.Link>
        </S.FlexContainer>

        <S.SearchContainer>
          <SearchInput
            setSearch={setSearch}
            inputState={[searchInputValue, setSearchInputValue]}
          />
        </S.SearchContainer>

        <S.ItemListContainer>
          <S.ItemList>
            {showingAppliedFilters.length > 0 ? (
              showingAppliedFilters.map((appliedFilter, index) => {
                return (
                  <S.FlexItem key={index}>
                    <S.FilterContainer>
                      <S.OpacityText>
                        {appliedFilter.labels.filter}
                      </S.OpacityText>{' '}
                      <br />
                      <EllipsisContainer>
                        <strong>{appliedFilter.labels.option}</strong>
                      </EllipsisContainer>
                    </S.FilterContainer>
                    <S.RemoveLink
                      onClick={() => {
                        setAppliedFilters(
                          appliedFilters.filter(
                            (appliedFilter2): boolean =>
                              appliedFilter2.name !== appliedFilter.name,
                          ),
                        )
                      }}
                      disabled={loading}
                    >
                      <MinusIcon width={14} height={14} />
                    </S.RemoveLink>
                  </S.FlexItem>
                )
              })
            ) : (
              <div style={{ textAlign: 'center' }}>
                <S.EmptyMessage>Nenhum resultado foi encontrado</S.EmptyMessage>
              </div>
            )}
          </S.ItemList>
        </S.ItemListContainer>
      </S.SubContainer>
    </S.Container>
  )
}

export default Menu
