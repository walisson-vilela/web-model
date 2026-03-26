import React, { useState } from 'react'

import { DropdownItemProps, DropdownProps, Select } from 'semantic-ui-react'
import styled from 'styled-components'

import Modal from '../../../../../../../../components/MwModal'

const RedText = styled.span`
  color: #e23851;
`

interface RefuseAttendanceProps {
  close: () => void
}

const options: DropdownItemProps[] = [
  { key: 1, value: 1, text: 'Check sem foto da self' },
  { key: 2, value: 2, text: 'Check na loja errada' },
  { key: 3, value: 3, text: 'Foto de Check fora do raio de cadastro da loja' },
]

const RefuseAttendance = (props: RefuseAttendanceProps) => {
  const { close } = { ...props }
  const [selected, setSelected] = useState<DropdownItemProps | null>(null)

  return (
    <Modal
      modal={{
        title: 'Recusar Atendimento',
        content: (
          <React.Fragment>
            <p>Defina o motivo com maior relevância</p>
            <Select
              value={selected?.value ?? undefined}
              onChange={(
                _event: React.SyntheticEvent<HTMLElement>,
                data: DropdownProps,
              ) => {
                const option = options.find((option) => option.value === data.value)
                if (option !== undefined) setSelected(option)
              }}
              options={options}
              style={{ width: '100%' }}
            />
            <br />
            <RedText>
              Recusando o atendimento, o mesmo passará a ser considerado como não
              realizado e isso, impactará nos índices de performance.
            </RedText>
          </React.Fragment>
        ),
        actions: [
          {
            basic: true,
            className: 'tertiary',
            type: 'button',
            content: 'Cancelar',
            onClick: () => close(),
          },
          {
            type: 'button',
            content: 'Confirmar',
            color: 'blue',
            onClick: () => close(),
            disabled: selected === null,
            style: { marginRight: 0 },
          },
        ],
      }}
    />
  )
}

export default RefuseAttendance
