import React, { useCallback, useEffect, useState } from 'react'

import { isString, strCmp } from '../../../../../functions/validators'
import type { SpacingOrZero } from '../../../../../interfaces'
import Menu from '../../../../Menu'
import type { Option as MenuOption } from '../../../../Menu/interfaces'
import type {
  Option as FilterOption,
  Label,
  OptionsReturn,
} from '../../interfaces'

import Header from './components/Header'
import type { SubmenuProps } from './interfaces'
import * as S from './styles'

interface Instance {
  getOptions: (
    value: string,
    page: number | undefined,
  ) => Promise<OptionsReturn>
  open: boolean
  isDynamic: boolean
  itemSpacing: SpacingOrZero
  label: Label
  allowEmptySearch?: boolean
}

const getInstance = (props: SubmenuProps): Instance => {
  const { item } = props

  if (!item) {
    return {
      open: false,
      isDynamic: false,
      itemSpacing: 's3',
      label: {
        element: '',
        text: '',
      },
      getOptions: async () => ({ options: [], lastPage: true }),
    }
  }

  const open = true
  const allowEmptySearch = item.allowEmptySearch
  const label = isString(item.label)
    ? {
        element: item.label,
        text: item.label,
      }
    : item.label

  if (Array.isArray(item.options)) {
    const intialOptions = [...item.options]

    const getOptions = async (value: string): Promise<OptionsReturn> => {
      const options = intialOptions.filter((option) => {
        const label = isString(option.label) ? option.label : option.label.text

        return strCmp(label, value, { contain: true })
      })

      return {
        options,
        lastPage: true,
      }
    }

    return {
      open,
      isDynamic: false,
      itemSpacing: item.optionSpacing || 's1',
      label,
      allowEmptySearch,
      getOptions,
    }
  }

  const loader = item.options

  const getOptions = async (
    value: string,
    page: number | undefined,
  ): Promise<OptionsReturn> => {
    const options = await loader(value, page)

    if (!Array.isArray(options)) return options

    return {
      options,
      lastPage: true,
    }
  }

  return {
    open,
    isDynamic: true,
    itemSpacing: item.optionSpacing || 's3',
    label,
    allowEmptySearch,
    getOptions,
  }
}

const Submenu = (props: SubmenuProps) => {
  const { item, close, setAppliedFilters, closeParent } = props

  const { open, isDynamic, itemSpacing, label, allowEmptySearch, getOptions } =
    getInstance(props)

  const [options, setOptions] = useState<FilterOption[]>([])
  const [page, setPage] = useState<number>(1)
  const [search, _setSearch] = useState<string>('')
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [, setFirstRender] = useState<boolean>(true)

  const onSearch = useCallback(async () => {
    const { options: newOptions, lastPage } = await getOptions(search, page)

    setLastPage(lastPage)

    setOptions([...newOptions])
    setLoading(false)
  }, [item, search, page])

  const setSearch = (value: string, force = true) => {
    const changed = search !== value || page !== 1

    _setSearch(value)
    setPage(1)

    if (force && changed === false) {
      setLoading(true)
      onSearch()
    }
  }

  useEffect(() => {
    setOptions([])
    setSearch('', false)
    setFirstRender(true)
  }, [item])

  useEffect(() => {
    setFirstRender((firstRender) => {
      if (!item || (isDynamic && firstRender)) {
        setLoading(false)
      } else {
        setLoading(true)
        onSearch()
      }

      return false
    })
  }, [onSearch])

  const onClickOption = item
    ? (index: number) => {
        const option = options[index]

        setAppliedFilters((prev) => {
          const newState = [...prev]

          const index = newState.findIndex(
            (filter) => filter.name === item.name,
          )

          if (index !== -1) {
            if (newState[index].value === option.value) return prev
            newState.splice(index, 1)
          }

          newState.push({
            name: item.name,
            labels: {
              filter: label,
              option: isString(option.label)
                ? {
                    text: option.label,
                    element: option.label,
                  }
                : option.label,
            },
            value: option.value,
          })

          return newState
        })

        !item.keepOpen && closeParent()
      }
    : undefined

  const optionsParser = (option: FilterOption): MenuOption => {
    return {
      label:
        typeof option.label === 'string' ? option.label : option.label.element,
      onClick: onClickOption,
      data: {},
    }
  }

  const onScrollEnd = () => {
    if (lastPage) return
    setPage((prev) => prev + 1)
  }

  return (
    <Menu
      open={open}
      axis='x'
      options={options.map(optionsParser)}
      close={close}
      width={isDynamic ? '275px' : '160px'}
      height='261px'
      containerSpacing={{
        top: 's3',
        left: 's1',
        bottom: isDynamic ? 's3' : 's1',
      }}
      onScrollEnd={onScrollEnd}
      itemSpacing={{
        top: itemSpacing,
        left: 's1',
        bottom: itemSpacing,
      }}
      bordered={isDynamic}
      before={
        <Header
          title={label}
          search={[search, setSearch]}
          allowEmptySearch={allowEmptySearch}
          withSearch={isDynamic}
        />
      }
      loading={loading}
      emptyContent={
        isDynamic && options.length === 0 ? (
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
                  {label.text}
                </React.Fragment>
              )
            })()}
          </S.EmptyMessage>
        ) : undefined
      }
      transition={{
        properties: {
          width: {},
        },
      }}
      {...(props.containerProps || {})}
    />
  )
}

export default Submenu
