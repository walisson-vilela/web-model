import React, { useEffect } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { Popup, Table } from 'semantic-ui-react'
import { ValidationError } from 'yup'

import Modal from '../../../../components/MwModal'
import useExportDataContext from '../../provider'

import PDV from './components/PDV'
import { Provider } from './context'
import {
  Errors,
  GetValueFunc,
  Options,
  SetValueFunc,
  Values,
} from './interfaces'
import schema from './schema'
import * as S from './styles'

const ConfigurationsParams = (): JSX.Element => {
  const {
    modalState: [, setModal],
    selectedItems: [selectedItems, setSelectedItems],
  } = useExportDataContext()
  const [errors, setErrors] = React.useState<Errors>({})
  const [pdvError, setPDVError] = React.useState<boolean>(false)

  const verify = selectedItems.LOJAS

  const values: Options = {
    PESSOAS: {
      label: 'Pessoas',
      value: 'PESSOAS',
    },
    PRODUTOS: {
      label: 'Produtos',
      value: 'PRODUTOS',
    },
    LOJAS: {
      label: 'PDVs',
      value: 'LOJAS',
      component: () => <PDV error={pdvError} setError={setPDVError} />,
    },
    ROTEIROS: {
      label: 'Roteiros',
      value: 'ROTEIROS',
    },
    HIERARQUIAS: {
      label: 'Hierarquias',
      value: 'HIERARQUIAS',
    },
    MIX: {
      label: 'Mix',
      value: 'MIX',
    },
    CALENDARIOS: {
      label: 'Calendarios',
      value: 'CALENDARIOS',
    },
  }

  const validate = async () => {
    try {
      await schema.validate(selectedItems, { abortEarly: false })
    } catch (e) {
      if (!(e instanceof ValidationError)) {
        throw e
      }
      const newErrors: Errors = e.inner.reduce((prev, error) => {
        return { ...prev, [error.path]: error }
      }, {})
      setErrors(newErrors)
    }
  }

  useEffect(() => {
    validate()
  }, [selectedItems])

  const onChange = (value: keyof Values, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev }
      delete newSelectedItems[value]
      if (checked) newSelectedItems[value] = null
      return newSelectedItems
    })
  }

  const checkAll: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const allValues = e.target.checked
      ? (Object.keys(values) as (keyof Values)[]).reduce(
          (prev, v) => ({ ...prev, [v]: null }),
          {},
        )
      : {}
    setSelectedItems(allValues)
  }

  const setValue: SetValueFunc = (key, v) =>
    setSelectedItems((prev) => ({ ...prev, [key]: v }))
  const getValue: GetValueFunc = (key) => selectedItems[key]

  const onSubmit = () => {
    setModal(null)
  }

  return (
    <Modal
      modal={{
        title: 'Parâmetros de configuração',
        titleColor: 'blue',
        size: 'large',
        content: (
          <>
            <S.subtitle>
              Defina quais itens da planilha serão extraidos e estabeleça as
              configurações.
            </S.subtitle>
            <Provider.Provider
              value={{
                setValue,
                getValue,
              }}
            >
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell height={'45'}>
                      <MwInput
                        type='checkbox'
                        label={
                          <S.SpanSelectAll
                            selectedAll={Object.keys(selectedItems).length >= 7}
                          >
                            Selecionar Todos: (
                            {Object.keys(selectedItems).length})
                          </S.SpanSelectAll>
                        }
                        color='blue'
                        onChange={checkAll}
                        checked={Object.keys(selectedItems).length >= 7}
                      />
                    </Table.Cell>
                  </Table.Row>

                  {(Object.keys(values) as (keyof Values)[]).map((key) => {
                    const value = values[key]
                    const Component = value.component
                    const checked = Object.keys(selectedItems).includes(key)
                    return (
                      <Table.Row key={key}>
                        <Table.Cell height={'45'}>
                          <MwInput
                            type='checkbox'
                            label={
                              <b>
                                {<S.DivComponent>{value.label}</S.DivComponent>}
                              </b>
                            }
                            checked={checked}
                            onChange={(e) => onChange(key, e.target.checked)}
                            // invalid={key in errors}
                          />
                          {Component && checked && value.component()}
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Provider.Provider>
          </>
        ),

        actions: [
          <S.Footer>
            <MwButton
              appearance='borderless'
              color='grey'
              content='Cancelar'
              onClick={() => setModal(null)}
            />

            <Popup
              inverted
              on='click'
              position='top right'
              className='popup-field'
              disabled={verify !== null}
              content={
                <S.Notification>
                  <p>
                    Para prosseguir é necessário responder os campos
                    obrigatórios sinalizados em vermelho.
                  </p>
                </S.Notification>
              }
              trigger={
                <div>
                  <MwButton
                    appearance='solid'
                    color='blue'
                    content='Aplicar'
                    disabled={Object.keys(selectedItems).length === 0}
                    onClick={() => {
                      verify === null ? setPDVError(true) : onSubmit()
                    }}
                  />
                </div>
              }
            />
          </S.Footer>,
        ],
      }}
    />
  )
}

export default ConfigurationsParams
