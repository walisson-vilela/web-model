import { useState } from 'react'

import { MwAppliedFilters, MwFilters, MwGrid } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../utils/hooks'

import { CheckAll, Search } from './components'

interface Props {
  checkAll?: Parameters<typeof CheckAll>[0]
  search?: Partial<Omit<Parameters<typeof Search>[0], 'open'>>
  appliedFilters?: Parameters<typeof MwAppliedFilters>[0]
  filters?: Parameters<typeof MwFilters>[0]
  clearChecked: () => void
  clearPage: () => void
  preserveCheckedOnSearch?: boolean
}

const Toolbar = (props: Props) => {
  const [open, setOpen] = useState(false)

  const [submitted, setSubmitted] =
    (props.search && props.search.submitted) || useState<string>('')
  const [value, setValue] =
    (props.search && props.search.value) || useState<string>('')

  return (
    <MwGrid
      {...{
        borderless: true,
        rows: {
          striped: true,
          horizontalAlign: 'right',
        },
        cols: {
          spacing: 's3',
          align: {
            content: {
              vertical: 'center',
            },
            self: {
              vertical: 'center',
            },
          },
          spacingAround: true,
          bordered: true,
        },
      }}
    >
      <MwGrid.Row style={{ height: 48.6 }} borderless>
        {props.checkAll && (
          <MwGrid.Col
            width={props.search && props.search.collapse ? undefined : 'auto'}
            style={{ height: '100%' }}
          >
            <CheckAll {...props.checkAll} />
          </MwGrid.Col>
        )}

        <MwGrid.Col
          width={props.search && props.search.collapse ? 'auto' : undefined}
          spacing='0'
          style={{ height: '100%' }}
        >
          <MwGrid.Row borderless style={{ height: '100%' }}>
            {props.search && (
              <>
                {props.search.collapse && <MwGrid.Col style={{ width: 53 }} />}
                <MwGrid.Col
                  ref={useOnClickOutState(() =>
                    !submitted ? setOpen(false) : setValue(submitted),
                  )}
                  backgroundColor='white'
                  align={{
                    content: {
                      horizontal: 'right',
                      vertical: 'center',
                    },
                  }}
                  style={{
                    height: '100%',
                    ...(props.search.collapse
                      ? {
                          transitionProperty: 'border-color width',
                          transitionDuration: '.5s',
                          transitionTimingFunction: 'ease-in-out',
                          maxWidth: 'unset',
                          position: 'absolute',
                          zIndex: 5,
                          left: 0,
                          top: 0,
                          ...(open
                            ? {
                                width: '100%',
                                borderColor: 'transparent',
                              }
                            : {
                                width: '53px',
                              }),
                        }
                      : {}),
                  }}
                >
                  <Search
                    {...props.search}
                    open={[open, setOpen]}
                    submitted={[
                      submitted,
                      (s) => {
                        if (!props.preserveCheckedOnSearch) {
                          props.clearChecked()
                        }
                        props.clearPage()
                        setSubmitted(s)
                      },
                    ]}
                    value={[value, setValue]}
                  />
                </MwGrid.Col>
              </>
            )}

            {props.appliedFilters && props.filters.items.length > 0 && (
              <MwGrid.Col width='auto' style={{ height: '100%' }}>
                <MwAppliedFilters
                  {...props.appliedFilters}
                  appliedFilters={[
                    props.appliedFilters.appliedFilters[0],
                    (s) => {
                      props.clearChecked()
                      props.clearPage()
                      props.appliedFilters.appliedFilters[1](s)
                    },
                  ]}
                />
              </MwGrid.Col>
            )}

            {props.filters && props.filters.items.length > 0 && (
              <MwGrid.Col width='auto' style={{ height: '100%' }}>
                <MwFilters
                  {...props.filters}
                  {...{
                    containerProps: {
                      center: { x: 0, y: 100 },
                      zIndex: 6,
                      ...(props.filters.containerProps || {}),
                    },
                  }}
                  {...{
                    subContainerProps: {
                      center: { x: 0, y: 100 },
                      ...(props.filters.subContainerProps || {}),
                    },
                  }}
                  setAppliedFilters={(s) => {
                    props.clearChecked()
                    props.clearPage()
                    props.filters.setAppliedFilters(s)
                  }}
                />
              </MwGrid.Col>
            )}
          </MwGrid.Row>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Toolbar
