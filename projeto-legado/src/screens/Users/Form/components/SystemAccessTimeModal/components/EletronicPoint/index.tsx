import React, { useContext } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../context'

const EletronicPoint = () => {
  const {
    workDate: { reset: resetWorkDate },
    systemAccessTime: {
      state: [systemAccessTime, setSystemAccessTime],
      isInvalid,
    },
    setModal,
  } = useContext(SystemAccessTimeContext)

  const setEletronicPoint = (electronic_point: boolean) => {
    if (systemAccessTime.electronic_point === electronic_point) return

    const close = () => setModal(null)

    const onConfirm = () => {
      setSystemAccessTime(
        electronic_point === true
          ? {
              electronic_point,
              tolerance_max: '',
              tolerance_min: '',
              work_dates: [],
            }
          : {
              electronic_point,
              work_dates: [],
            },
      )

      resetWorkDate()

      close()
    }

    if (systemAccessTime.work_dates.length === 0) {
      onConfirm()
      return
    }

    setModal({
      title: 'Notificação',
      content: (
        <React.Fragment>
          Você está prestes a trocar a configuração de{' '}
          {electronic_point === true ? (
            <React.Fragment>
              <b>Horário de acesso ao sistema</b> para <b>Ponto Eletrônico</b>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <b>Ponto Eletrônico</b> para <b>Horário de acesso ao sistema</b>
            </React.Fragment>
          )}
          . Ao finalizar esta configuração, a anterior será deletada. Deseja
          realmente alterar?
        </React.Fragment>
      ),
      actions: [
        {
          type: 'button',
          content: 'Cancelar',
          secondary: true,
          onClick: close,
        },
        {
          type: 'button',
          content: 'Sim',
          primary: true,
          onClick: onConfirm,
        },
      ],
    })
  }

  return (
    <MwInput
      type='select'
      label='Tipo de Configuração'
      loader={async () => [
        { label: 'Horário de acesso ao sistema', value: '0', data: {} },
        { label: 'Ponto Eletrônico', value: '1', data: {} },
      ]}
      setValue={(v) => {
        if (v === '') return
        setEletronicPoint(v === '1')
      }}
      value={systemAccessTime.electronic_point ? '1' : '0'}
      invalid={isInvalid('electronic_point')}
      inputWidth='230px'
    />
  )
}

export default EletronicPoint
