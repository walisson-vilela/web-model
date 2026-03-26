import {
  MwGrid,
  MwIcon,
  MwInput,
  MwScrollContainer,
  Popup,
} from '@mw-kit/mw-ui'

import ActionType from './ActionType'
import Container from './Container'
import Toolbar from './Toolbar'
import { GridSelectorProps } from './interfaces'
import * as S from './styles'
import { ActionTypeLabel } from './styles'

const VoidPopUp = (props: { trigger: React.ReactNode }) => {
  return <>{props.trigger}</>
}

const useProps = <T,>(
  props: GridSelectorProps<T>,
  identify: GridSelectorProps<T>['identify'],
): {
  onChange: (checked: boolean, row: T) => void
  clearChecked: () => void
  getIsChecked: (row: T) => boolean
  checkAll?: Parameters<typeof Toolbar>[0]['checkAll']
} => {
  if (props.type === 'radio') {
    const {
      checked: [checked, setChecked],
    } = props

    return {
      onChange: (checked: boolean, row: T) => {
        setChecked(row)
      },
      getIsChecked: (row: T) => checked && identify(checked, row),
      clearChecked: () => setChecked(null),
    }
  }

  const {
    rows,
    checked: [checked, setChecked],
  } = props

  const checkable = rows.filter((row) => !row.disabled)

  return {
    onChange: (checked: boolean, row: T) => {
      setChecked((prev) => {
        const newState = [...prev].filter((r) => !identify(r, row))
        if (checked) newState.push(row)
        return [...newState]
      })
    },

    getIsChecked: (row: T) => checked.some((e) => identify(e, row)),
    checkAll:
      props.toolbar && !props.toolbar.checkAll
        ? undefined
        : {
            checkAll: () =>
              setChecked((prev) => {
                const newState = prev.filter(
                  (e) => !checkable.some((row) => identify(e, row.data)),
                )
                return [...newState, ...checkable.map((row) => row.data)]
              }),
            unCheckAll: () =>
              setChecked((prev) => {
                const newState = prev.filter(
                  (e) => !checkable.some((row) => identify(e, row.data)),
                )
                return [...newState]
              }),
            count: checked.length,
            checked:
              checkable.length > 0 && checkable.length === checked.length,
          },
    clearChecked: () => setChecked([]),
  }
}

const GridSelector = Object.assign(
  <T,>(props: GridSelectorProps<T>) => {
    const {
      rows,
      type,
      checked: [checked],
    } = props
    const getRowProps = props.getRowProps || (() => ({}))

    const identify = props.identify || ((x, y) => x.id === y.id)
    const { onChange, checkAll, getIsChecked, clearChecked } = useProps(
      props,
      identify,
    )

    const clearPage = props.pagination
      ? () => props.pagination.page[1](1)
      : () => {}

    const messages = {
      empty: '',
      ...(props.messages || {}),
    }

    const onScrollEnd = !props.pagination
      ? () => {}
      : () => {
          const {
            lastPage,
            page: [, setPage],
          } = props.pagination
          if (lastPage) return
          setPage((prev) => prev + 1)
        }

    return (
      <S.Container $scrollHeight={props.scrollHeight}>
        {props.toolbar && (
          <Toolbar
            {...{
              ...props.toolbar,
              checkAll,
              clearChecked,
              clearPage,
            }}
          />
        )}
        <MwScrollContainer
          onScrollEnd={onScrollEnd}
          style={{ height: '100%' }}
          loading={props.loading}
        >
          {rows.length === 0 ? (
            <S.EmptyMessageContainer children={messages.empty} />
          ) : (
            <MwGrid
              {...(props.grid || {
                borderless: true,
                rows: {
                  spacing: {
                    top: 's1',
                    left: 's3',
                    bottom: 's1',
                    right: 's3',
                  },
                  striped: true,
                  spacingAround: true,
                },
                cols: {
                  align: {
                    content: {
                      vertical: 'center',
                    },
                  },
                },
              })}
            >
              {rows.map((row, index) => {
                const {
                  data,
                  content: Content,
                  disabled,
                  onClick = undefined,
                } = {
                  ...getRowProps(row, checked as never),
                  ...row,
                }

                const After =
                  'after' in row ? (
                    row.after
                  ) : 'checked' in row && row.checked ? (
                    <MwIcon type='feather' icon='check' />
                  ) : undefined
                const isChecked = !disabled && getIsChecked(data)
                const [PopupComponent, popupProps] = row.popup
                  ? [Popup, row.popup]
                  : [VoidPopUp, {}]

                return (
                  <PopupComponent
                    {...popupProps}
                    key={index}
                    trigger={
                      <MwGrid.Row key={index} onClick={onClick}>
                        <S.Col spacing='0'>
                          <MwInput
                            type={type ? type : 'checkbox'}
                            label={
                              typeof Content === 'function' ? (
                                <Content
                                  {...{ data, disabled, checked: isChecked }}
                                />
                              ) : (
                                Content
                              )
                            }
                            onChange={(e) =>
                              onChange(e.target.checked, row.data)
                            }
                            checked={isChecked}
                            disabled={disabled}
                          />
                          {typeof After === 'function' ? (
                            <After
                              {...{ data, disabled, checked: isChecked }}
                            />
                          ) : (
                            After
                          )}
                        </S.Col>
                      </MwGrid.Row>
                    }
                  />
                )
              })}
            </MwGrid>
          )}
        </MwScrollContainer>
      </S.Container>
    )
  },
  { Container: Container, ActionType, ActionTypeLabel },
)

export default GridSelector
