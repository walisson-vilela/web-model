import React, { Fragment, useEffect, useRef, useState } from 'react'

import { getElementByXPath } from '../../../../functions'
import { TransparentButton } from '../../../../styled'
import EllipsisContainer from '../../../EllipsisContainer'
import CaretRightIcon from '../../../Icons/CaretRight'
import Spinner from '../../../Spinner'
import SearchInput from '../../Search'
import type * as GlobalInterfaces from '../../interfaces'
import type * as I from '../interfaces'

// import SearchInput from '../SearchInput'
import * as S from './styled'

const List = (props: I.ListProps) => {
  const { appliedFilters, setAppliedFilters, filters, loading, open, setOpen } =
    { ...props }

  const [opened, setOpened] = useState<number>(-1)
  const [selected, setSelected] = useState<GlobalInterfaces.Filter | null>(null)
  const [options, setOptions] = useState<GlobalInterfaces.Option[]>([])
  const [, setDirection] = useState<string>('left')
  const [inputValue, setInputValue] = useState<string>('')

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [inputLoading, setInputLoading] = useState<boolean>(false)

  const [lastPagination, setLastPagination] = useState<Date>(new Date())

  const ref = useRef<HTMLDivElement>(null)

  const clearSearch = () => {
    setSearch('')
    setInputValue('')
  }

  // fecha o menu de opcoes
  const closeOpened = (event: MouseEvent) => {
    if (
      ref.current instanceof Element &&
      document.body.contains(event.target as HTMLElement) &&
      !ref.current.contains(event.target as HTMLElement)
    ) {
      setOpened(-1)
      clearSearch()
      if (selected && typeof selected.options === 'function') setOptions([])
    }
  }

  const loadPage = async (pageIndex: number, searchStr?: string) => {
    if (searchStr === undefined) searchStr = search

    if (inputLoading) return
    if (!selected) return
    if (typeof selected.options !== 'function') return

    // ativando o loading do input de busca
    setInputLoading(true)
    const results = await selected.options(searchStr, pageIndex)

    // setando o indidice da pagina que foi carregada
    setPage(pageIndex)

    /**
     * se o resultado nao for a lista de opcoes, considera a paginacao,
     * se for, apenas seta as opcoes e seta como ultima pagina para nao disparar o evento no fim do scroll
     */
    if (!Array.isArray(results)) {
      // se a pagina nao e a primeira, concatena as opcoes, se nao, apenas seta as opcoes
      if (pageIndex > 1) {
        setOptions((prev) => prev.concat(results.options))
      } else setOptions(results.options)

      setLastPage(!!results.lastPage)
    } else {
      setOptions(results)
      setLastPage(true)
    }

    // deativando o loading do input de busca
    setInputLoading(false)
  }

  const nextPage = async () => {
    // se for a ultima pagina, nao ha nada a fazer
    if (lastPage) return
    // chamando a funcao para carregar a proxima pagina
    loadPage(page + 1)
  }

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const target = event.nativeEvent.target as HTMLElement
    const scrollTopMax =
      target.scrollHeight - target.getBoundingClientRect().height - 10 // -10 is a workaround to work with Chrome zoom
    const scrollTop = target.scrollTop

    if (scrollTopMax > 0 && scrollTop >= scrollTopMax) {
      const now = new Date()

      const diff = Math.abs((now.getTime() - lastPagination.getTime()) / 1000)

      if (diff < 0.5) return

      setLastPagination(new Date())

      nextPage()
    }
  }

  // calcula pra qual direcao os filtros devem abrir de acordo com a posicao na tela
  const changeDirection = () => {
    if (ref.current) {
      const pos = ref.current.offsetLeft
      const percent = (pos * 100) / window.innerWidth
      setDirection(percent > 50 ? 'right' : 'left')
    }
  }

  useEffect(() => {
    changeDirection()

    // adicionando no documento inteiro o evento que ira fechar o menu de opcoes
    document.addEventListener('mousedown', closeOpened)
    window.addEventListener('resize', changeDirection)

    return () => {
      // removendo o evento que ira fechar o menu de opcoes
      document.removeEventListener('mousedown', closeOpened)
      window.removeEventListener('resize', changeDirection)
    }
  }, [])

  // faz o scroll top quando fecha o dropdown
  useEffect(() => {
    if (open || !ref || !ref.current || !document.body.contains(ref.current)) {
      return
    }

    try {
      const element = getElementByXPath('div/div', ref.current)
      if (!(element instanceof HTMLElement)) return
      element.scrollTo({ top: 0 })
    } catch (e) {}
  }, [open])

  const onSubmitSearch = (value: string) => {
    if (!selected) return
    if (typeof selected.options !== 'function') return

    // limpa as opcoes caso o input de busca esteja vazio
    // caso contrario, carrega a pagina 1
    if (selected.allowEmptyString === false && value.trim() === '') {
      setOptions([])
    } else loadPage(1, value)
  }

  // trata o evento de quando um item do menu de filtros for clicado
  const handleOnClickFilter = (
    item: GlobalInterfaces.Filter,
    index: number,
  ) => {
    // limpando o input de busca
    clearSearch()

    // se o menu de filtros ja esta aberto neste item, fecha o menu, caso contrario, abre
    if (opened === index) {
      setOpened(-1)
      if (selected && typeof selected.options === 'function') setOptions([])
    } else {
      // setando o item escolhido
      setSelected(item)
      // setando o indicie aberto
      setOpened(index)
      setOptions(typeof item.options !== 'function' ? item.options : [])
    }
  }

  const getFilterValue = (
    name: string,
  ): Pick<GlobalInterfaces.AppliedFilter, 'value'> | null => {
    for (let i = 0; i < appliedFilters.length; i++) {
      if (appliedFilters[i].name === name) {
        return { value: appliedFilters[i].value }
      }
    }

    return null
  }

  // trata o evento de quando um filtro for clicado
  const onClickFilter = (
    option: GlobalInterfaces.Option,
    filter: GlobalInterfaces.Filter,
  ) => {
    // removendo o filtro caso ele exista
    const newAppliedFilters = appliedFilters.filter(
      (e) => e.name !== filter.name,
    )
    // adicionando o novo filtro
    newAppliedFilters.push({
      name: filter.name,
      labels: { filter: filter.label, option: option.label },
      value: option.value,
    })
    // setando os novos filtros
    setAppliedFilters(newAppliedFilters)

    clearSearch()

    if (selected && typeof selected.options === 'function') setOptions([])
    setOpened(-1)
    setOpen(false)
  }

  // retorna o html com a lista de opcoes
  const printOptions = (filter: GlobalInterfaces.Filter) => {
    const selectedValue = selected ? getFilterValue(selected.name) : null

    let fullHeight = false
    let bordered = false
    let title: JSX.Element = <React.Fragment />
    let thin = true
    if (typeof filter.options === 'function') {
      fullHeight = true
      bordered = true
      thin = false
      title = (
        <Fragment>
          <S.SearchContainer>
            <SearchInput
              setSearch={setSearch}
              loading={inputLoading}
              inputState={[inputValue, setInputValue]}
              onSubmit={onSubmitSearch}
              size='small'
            />
          </S.SearchContainer>

          {inputLoading && (
            <S.LoaderContainer>
              <Spinner />
            </S.LoaderContainer>
          )}

          {options.length === 0 && (
            <div style={{ textAlign: 'center' }}>
              {
                <S.EmptyMessage>
                  {(() => {
                    if (search !== '') {
                      return (
                        <React.Fragment>
                          Nenhum resultado foi encontrado
                        </React.Fragment>
                      )
                    }
                    return (
                      <React.Fragment>
                        Utilize a busca para pesquisar por <br />
                        {filter.label}
                      </React.Fragment>
                    )
                  })()}
                </S.EmptyMessage>
              }
            </div>
          )}
        </Fragment>
      )
    }

    return (
      <React.Fragment>
        <S.OptionsLabelContainer>
          <S.OptionsTitle>{filter.label}</S.OptionsTitle>
          {title}
        </S.OptionsLabelContainer>

        <S.OptionsList onScroll={onScroll} $fullHeight={fullHeight}>
          {options.map((option, index) => (
            <S.Option
              key={index}
              onClick={() => {
                onClickFilter(option, filter)
              }}
              disabled={
                selectedValue !== null && selectedValue.value === option.value
              }
              $thin={option.thin || thin}
              $bordered={bordered}
            >
              <EllipsisContainer>{option.label}</EllipsisContainer>
            </S.Option>
          ))}
        </S.OptionsList>
      </React.Fragment>
    )
  }

  return (
    <div ref={ref}>
      <S.FiltersContainer $open={open}>
        <div>
          {filters.map((filter, index) => (
            <React.Fragment key={index}>
              <TransparentButton
                onClick={() => {
                  handleOnClickFilter(filter, index)
                }}
                disabled={loading || inputLoading || filter.disabled}
              >
                <EllipsisContainer>{filter.label}</EllipsisContainer>
                <CaretRightIcon />
              </TransparentButton>

              {filter.delimiter && <S.Delimiter />}
            </React.Fragment>
          ))}
        </div>
      </S.FiltersContainer>

      {(() => {
        let options = null
        let width: number | undefined
        if (selected) {
          options = printOptions(selected)

          if (typeof selected.options === 'function') {
            width = 275
          }
        }

        return (
          <S.OptionsContainer $open={opened !== -1} $width={width}>
            {options}
          </S.OptionsContainer>
        )
      })()}
    </div>
  )
}

export default List
