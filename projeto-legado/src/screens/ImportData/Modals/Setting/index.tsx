import React, { useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import Modal from '../../../../components/MwModal'

import SubComponent from './SubComponent'
import {
  OptionsListInterface,
  SelectedInterface,
  SettingProps,
} from './interfaces'
import * as S from './styles'

const Setting = ({
  setModal,
  setForm,
  selected: selectedProp,
}: SettingProps) => {
  const options: OptionsListInterface[] = [
    {
      label: 'Hierarquias',
      value: 'hierarchies',
    },
    {
      label: 'Pessoas',
      value: 'peoples',
    },
    {
      label: 'PDVs',
      value: 'stores',
      subLabel: 'Atualizar endereços de lojas já existentes*:',
      subValue: 'update_existing_addresses',
      subOptions: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 0 },
      ],
    },
    {
      label: 'Produtos',
      value: 'products',
    },
    {
      label: 'Roteiros',
      value: 'routes',
      subLabel: 'Tipo de importação de roteiro*:',
      subValue: 'import_type',
      subOptions: [
        { label: 'Adicionar', value: 'ADD' },
        {
          label: 'Sobrescrever a partir da data informada na planilha',
          value: 'OVERWRITE_SHEET_DATE',
        },
        {
          label: 'Sobrescrever a partir da data de importação',
          value: 'OVERWRITE_IMPORT_DATE',
        },
      ],
    },
    {
      label: 'Roteiros (Semanas)',
      value: 'week_routes',
      subLabel: 'Configuração de importação de roteiro (Semanas)*:',
      subValue: 'import_type',
      subOptions: [
        { label: 'Adicionar', value: 'ADD' },
        { label: 'Sobrescrever', value: 'OVERWRITE' },
      ],
    },
    {
      label: 'Calendários',
      value: 'calendars',
      subLabel: 'Configuração de importação de calendário*:',
      subValue: 'import_type',
      subOptions: [
        { label: 'Adicionar', value: 'ADD' },
        { label: 'Sobrescrever', value: 'OVERWRITE' },
      ],
    },
    {
      label: 'Mix',
      value: 'mixes',
      subLabel: 'Configuração de importação de mix*:',
      subValue: 'import_type',
      subOptions: [
        { label: 'Adicionar', value: 'ADD' },
        { label: 'Sobrescrever', value: 'OVERWRITE' },
      ],
    },
  ]

  const [selected, setSelected] = useState<SelectedInterface>(
    selectedProp || {},
  )
  const [submitted, setSubmitted] = useState<boolean>(false)

  const checkAll = () => {
    if (Object.keys(selected).length === options.length) {
      setSelected({})
      return
    }

    const items: SelectedInterface = {}

    options.forEach((option) => {
      items[option.value] = {}
    })

    setSelected(items)
  }

  const handleSelected = (item: string) => {
    setSelected((prev) => {
      let aux = { ...prev }

      const find = Object.keys(aux).findIndex((selected) => selected === item)

      find > -1 ? delete aux[item] : (aux[item] = {})

      return aux
    })
  }

  const checkIfErrors = (): boolean => {
    if (Object.keys(selected).length < 1) return true

    const haveErrors = Object.keys(selected).filter((item) => {
      const find = options.find((e) => e.value === item)

      if (!!find.subValue) {
        return !(find.subValue in selected[item])
      }

      return false
    })

    return haveErrors.length > 0
  }

  const onSubmit = async () => {
    setSubmitted(true)

    if (checkIfErrors()) return

    setForm((prev) => ({ ...prev, settings: selected }))
    setModal(null)
  }

  return (
    <Modal
      modal={{
        size: 'large',
        title: 'Parâmetros de configuração',
        titleColor: 'blue',
        content: (
          <div style={{ height: 490 }}>
            <S.Title>
              Defina quais itens da planilha serão importados e estabeleça as
              configurações.
            </S.Title>

            <S.StyledGridRow>
              <S.Container>
                <S.Header>
                  <MwInput
                    type='checkbox'
                    label={
                      <span
                        style={{
                          opacity: Object.keys(selected).length < 1 ? 0.5 : 1,
                        }}
                      >
                        Selecionar Todos: ({Object.keys(selected).length})
                      </span>
                    }
                    color='blue'
                    onChange={checkAll}
                    checked={Object.keys(selected).length === options.length}
                  />
                </S.Header>

                <S.Content>
                  {options.map((option, index) => {
                    const isSelected = !!selected[option.value]

                    return (
                      <S.Item key={index}>
                        <MwInput
                          type='checkbox'
                          checked={isSelected}
                          label={<S.ItemLabel>{option.label}</S.ItemLabel>}
                          onChange={() => handleSelected(option.value)}
                        />

                        {isSelected && option.subOptions && (
                          <SubComponent
                            title={option.subLabel}
                            options={option.subOptions}
                            parentValue={option.value}
                            value={option.subValue}
                            selected={[selected, setSelected]}
                            isSubmitted={submitted}
                          />
                        )}
                      </S.Item>
                    )
                  })}
                </S.Content>
              </S.Container>
            </S.StyledGridRow>
          </div>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setModal(null)}
          />,
          <Popup
            on='click'
            trigger={
              <div style={{ display: 'inline' }}>
                <MwButton
                  content='Aplicar'
                  disabled={Object.keys(selected).length === 0}
                  onClick={onSubmit}
                />
              </div>
            }
            content={
              'Para prosseguir é necessário responder os campos obrigatórios sinalizados em vermelho.'
            }
            position='top right'
            className='popup-field'
            inverted
            wide
            disabled={Object.keys(selected).length === 0}
          />,
        ],
      }}
    />
  )
}

export default Setting
