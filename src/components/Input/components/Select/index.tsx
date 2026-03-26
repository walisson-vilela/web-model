import React, { useCallback, useEffect, useState } from 'react'

import { filterObject } from '../../../../functions/formatters'
import { useOnClickOut } from '../../../../hooks'
import type { GenericObject } from '../../../../interfaces'
import Menu from '../../../Menu'
import Input from '../Input'
import type { InputProps } from '../Input/interfaces'

import useSelect from './hooks/Select'
import type { SelectProps as SingleSelectProps } from './hooks/Select/interfaces'
import useSelectMultiple from './hooks/SelectMultiple'
import type { SelectProps as MultipleSelectProps } from './hooks/SelectMultiple/interfaces'
import type { Option } from './hooks/interfaces'
import * as S from './styles'

export type SelectProps<T extends GenericObject = GenericObject> =
  | SingleSelectProps<T>
  | MultipleSelectProps<T>

const Select = React.forwardRef(
  <T extends GenericObject = GenericObject>(
    props: SelectProps<T>,
    ref?: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { position, loader, initialLoader } = props

    const [options, setOptions] = useState<Option[]>(initialLoader || [])
    const [highlight, setHighlight] = useState<number>(-1)
    const [open, setOpen] = useState<boolean>(false)

    const hook =
      props.type === 'select-multiple' ? useSelectMultiple : useSelect

    const {
      parsedOptions,
      inputContent,
      onReset,
      menu: menuProps,
      getContext,
      onClear,
      dirty,
    } = hook(
      props as never,
      [highlight, setHighlight],
      [options, setOptions],
      setOpen,
    )

    const [_loading, setLoading] = useState<boolean>(true)
    const [search, _setSearch] = useState<string>('')
    const [searchInput, setSearchInput] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [lastPage, setLastPage] = useState<boolean>(false)

    const loading = props.loading || _loading

    const setSearch: React.Dispatch<React.SetStateAction<string>> = (value) => {
      _setSearch(value)
      setPage(1)
    }

    const inputProps = filterObject<SelectProps, InputProps>(props, [
      'center',
      'dirty',
      'emptyContent',
      'initialLoader',
      'loader',
      'maxHeight',
      'onClear' as keyof SelectProps,
      'onScrollEnd',
      'placeholder',
      'position',
      'search',
      'selectAll' as keyof SelectProps,
      'setValue',
      'type',
      'value',
      'minSelected' as keyof SelectProps,
      'maxSelected' as keyof SelectProps,
    ])

    const _onScrollEnd = props.onScrollEnd || (() => {})

    const onScrollEnd = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (!lastPage && !loading) {
        setPage((prev) => prev + 1)
      }

      _onScrollEnd(e)
    }

    const onSubmit = useCallback(async () => {
      setLoading(true)

      const optionsResult = await loader(search, page)
      if (optionsResult === null) return

      const [options, lastPage] = Array.isArray(optionsResult)
        ? [optionsResult, true]
        : [optionsResult.options, optionsResult.lastPage]

      const initial = initialLoader ? initialLoader() : []

      const filtered = initialLoader
        ? options.filter((x) => !initial.some((y) => x.value === y.value))
        : options

      const getWithOptions = () => {
        return !search && initialLoader ? [...initial, ...filtered] : options
      }

      setOptions(
        page === 1 ? getWithOptions() : (prev) => prev.concat(filtered),
      )
      setLastPage(lastPage)

      setLoading(false)
    }, [loader, search, page, initialLoader])

    useEffect(() => {
      const timeoutId = setTimeout(() => onSubmit(), 250)
      return () => clearTimeout(timeoutId)
    }, [onSubmit])

    useEffect(() => {
      if (open) return
      setSearch('')
      onReset()
    }, [props.value, open])

    useEffect(() => {
      setSearchInput(search)
    }, [search])

    useEffect(() => {
      if (page === 1) setHighlight(-1)
    }, [page])

    useEffect(() => {
      const timeoutId = setTimeout(() => setSearch(searchInput), 1000)
      return () => clearTimeout(timeoutId)
    }, [searchInput])

    const onClick = () => {
      setOpen((prev) => !prev)
    }

    const isEmpty =
      (typeof props.value === 'string' || Array.isArray(props.value)) &&
      props.value.length === 0

    return getContext(
      {
        setOpen,
        searchInput: [searchInput, setSearchInput],
      },
      <S.RelativeContainer
        ref={useOnClickOut(() => setOpen(false))}
        $width={props.width}
      >
        <Input
          {...inputProps}
          type='search'
          htmlReadOnly
          onClick={onClick}
          loading={loading}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              setOpen((prev) => !prev)
            } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
              setOpen(true)
            }

            if (props.onKeyDown) props.onKeyDown(e)
          }}
          dirty={dirty}
          icon={{
            icon: {
              type: 'feather',
              icon: open ? 'chevron_up' : 'chevron_down',
              width: '14px',
              onClick: () => {},
            },
            position: 'right',
          }}
          ref={ref}
          {...(isEmpty
            ? {
                placeholder: props.placeholder,
              }
            : {
                clearable: onClear,
              })}
          children={inputContent}
        />

        <Menu
          {...menuProps}
          highlight={highlight}
          open={open}
          close={() => setOpen(false)}
          options={parsedOptions}
          onScrollEnd={onScrollEnd}
          scrollTabIndex={-1}
          width={props.inputWidth || '100%'}
          bordered
          position={position}
          references={{ bottom: props.paddingless ? '21px' : '35px' }}
          loading={loading}
          center={props.center || { x: 50, y: 50 }}
          transition={{
            properties: { 'max-height': {} },
          }}
          emptyContent={
            <S.EmptyContentContainer
              children={props.emptyContent || 'Nenhuma opção encontrada'}
            />
          }
        />
      </S.RelativeContainer>,
    )
  },
)

Select.displayName = 'Select'

export default Select
