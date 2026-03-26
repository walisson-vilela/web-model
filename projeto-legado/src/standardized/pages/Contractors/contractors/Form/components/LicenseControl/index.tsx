import React, { useCallback } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import useContext from '../../context'
import * as S from '../../styled'
import { ContractorLicenses } from '../../types'

import * as Popups from './popups'

type ValueIndex = keyof ContractorLicenses['values']

type Value = Omit<
  ContractorLicenses['values'][ValueIndex],
  'hierarchy_id' | 'license_id'
>

const name = 'licenses'

const LicenseControl = () => {
  const {
    form: { watch, setValue: setFormValue, setValueOptions },
    viewMode,
    isMaster,
  } = useContext()

  const data = watch(name)
  const setData: React.Dispatch<React.SetStateAction<typeof data>> =
    useCallback(
      (prevState) => {
        setFormValue(
          name,
          typeof prevState === 'function' ? prevState(data) : prevState,
          setValueOptions,
        )
      },
      [data],
    )

  const empty = Object.keys(data.values).length < 1

  const setValue = (
    id: ValueIndex,
    value: Partial<Value> | ((prevState: Value) => Partial<Value>),
  ) => {
    setData((prev) => {
      if (!(id in prev.values)) return prev
      const v = typeof value === 'function' ? value(prev.values[id]) : value
      return {
        ...prev,
        values: {
          ...prev.values,
          [id]: {
            ...prev.values[id],
            ...v,
          },
        },
      }
    })
  }

  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's1',
          right: 's3',
        },
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col spacing='0'>
          <S.Title>
            Tipo de acesso e controle de licenças
            {viewMode ? (
              ` na ${isMaster ? 'Conta Master' : 'Conta Dependente'}`
            ) : (
              <Popups.Info />
            )}
          </S.Title>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row spacing={{ left: '0', right: '0', top: '0' }}>
        <MwGrid.Col spacing='0'>
          {viewMode
            ? `Quantidade de licença por Tipo de Acesso e Pilar na ${
                isMaster ? 'Conta Master' : 'Conta Dependente'
              }.`
            : 'Defina a quantidade de licenças por tipo de Acesso e Pilar.'}
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <MwGrid
            rows={{
              spacing: {
                top: 's4',
                left: '0',
                bottom: 's4',
                right: '0',
              },
            }}
            cols={{
              spacing: {
                top: '0',
                left: 's3',
                bottom: '0',
                right: 's3',
              },
            }}
            spacing='0'
            borderless
          >
            <MwGrid.Row
              style={{ fontWeight: 'bold' }}
              spacing={{
                top: 's3',
                left: '0',
                bottom: '0',
                right: '0',
              }}
              borderless
            >
              <MwGrid.Col children='Tipo de Acesso' />

              <MwGrid.Col
                align={{ content: { horizontal: 'center' } }}
                children={!viewMode && 'Disponibilidade'}
              />

              {data.hierarchies.map((hierarchy, key) => {
                return (
                  <MwGrid.Col
                    {...{
                      align: viewMode
                        ? { content: { horizontal: 'center' } }
                        : undefined,

                      width: '2',
                      children: hierarchy.name,
                    }}
                    key={key}
                  />
                )
              })}

              <MwGrid.Col
                align={{ content: { horizontal: 'center' } }}
                children='Total Distribuído'
              />

              <MwGrid.Col
                align={{ content: { horizontal: 'center' } }}
                children='Total Utilizado'
              />
            </MwGrid.Row>

            {empty ? (
              <MwGrid.Row>
                <MwGrid.Col
                  align={{
                    content: {
                      vertical: 'center',
                      horizontal: 'center',
                    },
                  }}
                  children='Não há nenhuma definição estabelecida até o momento'
                />
              </MwGrid.Row>
            ) : (
              data.licenses.map((license, key) => {
                const total = Object.entries(data.values).reduce(
                  (total, [id, value]) => {
                    return id.endsWith(`|${license.id}`)
                      ? (total += value.value)
                      : total
                  },
                  0,
                )

                return (
                  <MwGrid.Row key={key}>
                    <MwGrid.Col
                      align={{
                        content: { vertical: 'center', horizontal: 'left' },
                      }}
                    >
                      <b>{license.name}:</b>
                    </MwGrid.Col>

                    <MwGrid.Col
                      align={{
                        content: { vertical: 'center', horizontal: 'center' },
                      }}
                      children={
                        !viewMode &&
                        license.available + license.reserved - total
                      }
                    />

                    {data.hierarchies.map((hierarchy, key) => {
                      const id: ValueIndex = `${hierarchy.id}|${license.id}`

                      const { value, min } = data.values[id]

                      const max =
                        license.available + license.reserved - total + value

                      return (
                        <MwGrid.Col
                          {...{
                            align: viewMode
                              ? { content: { horizontal: 'center' } }
                              : undefined,

                            width: '2',
                          }}
                          key={key}
                        >
                          <MwInput
                            type='range'
                            name='licenses[]'
                            setValue={(v) => {
                              setValue(
                                id,
                                typeof v === 'function'
                                  ? (prev) => ({
                                      value: v(prev.value),
                                    })
                                  : { value: v },
                              )
                            }}
                            markers={{
                              markers: [min, max],
                              position: 'bottom',
                              strict: false,
                            }}
                            value={
                              value < min ? min : value > max ? max : value
                            }
                            step='1'
                          />
                        </MwGrid.Col>
                      )
                    })}

                    <MwGrid.Col
                      align={{
                        content: { vertical: 'center', horizontal: 'center' },
                      }}
                      children={total}
                    />

                    <MwGrid.Col
                      align={{
                        content: { vertical: 'center', horizontal: 'center' },
                      }}
                      children={license.consumed}
                    />
                  </MwGrid.Row>
                )
              })
            )}
          </MwGrid>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default LicenseControl
