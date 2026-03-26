import React, { useState } from 'react'

import toast from 'react-hot-toast'
import {
  DropdownItemProps,
  DropdownProps,
  Loader,
  Select,
} from 'semantic-ui-react'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'

import { toggleStatus } from './services'
import * as S from './styled'

interface RefuseAttendanceProps {
  close: () => void
  loadData: () => Promise<any>
  id: number
}

const options: DropdownItemProps[] = [
  { key: 1, value: 1, text: 'Check sem foto da self' },
  { key: 2, value: 2, text: 'Check na loja errada' },
  { key: 3, value: 3, text: 'Foto de Check fora do raio de cadastro da loja' },
]

const RefuseAttendance = (props: RefuseAttendanceProps) => {
  const { close, id, loadData } = { ...props }
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<DropdownItemProps | null>(null)

  async function onSubmit() {
    setLoading(true)
    try {
      const payload = {
        ids: [id],
        attendance_status: 4,
        justify_name: selected.text,
      }
      const response = await toggleStatus(payload)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      modal={{
        title: 'Recusar Atendimento',
        content: (
          <React.Fragment>
            {loading ? (
              <S.Container>
                <Loader active />
              </S.Container>
            ) : (
              <React.Fragment>
                <p>Defina o motivo com maior relevância</p>
                <Select
                  value={selected === null ? null : selected.value}
                  onChange={(
                    _event: React.SyntheticEvent<HTMLElement>,
                    data: DropdownProps,
                  ) => {
                    const option = options.find(
                      (option) => option.value === data.value,
                    )
                    if (option !== undefined) setSelected(option)
                    else console.error('Invalid option')
                  }}
                  options={options}
                  style={{ width: '100%' }}
                />
                <br />
                <S.RedText>
                  Recusando o atendimento, o mesmo passará a ser considerado
                  como não realizado e isso, impactará nos índices de
                  performance.
                </S.RedText>
              </React.Fragment>
            )}
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
            onClick: async () => {
              await onSubmit()
              close()
              await loadData()
            },
            loading: loading,
            disabled: selected === null || loading,
            style: { marginRight: 0 },
          },
        ],
        // size: "small" | "tiny" | "mini" | "large" | "fullscreen",
      }}
    />
  )
}

export default RefuseAttendance
