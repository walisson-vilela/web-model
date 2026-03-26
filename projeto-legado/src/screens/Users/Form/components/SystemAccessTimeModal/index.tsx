import { useEffect, useState } from 'react'

import { MwTabs } from '@mw-kit/mw-ui'
import { Modal } from 'semantic-ui-react'

import MwModal, { ModalState } from '../../../../../components/MwModal'

import * as Components from './components'
import SystemAccessTimeContext from './context'
import { useSystemAccessTime, useWorkDate } from './hooks'
import { Props } from './interfaces'
import * as S from './styles'
import * as Tabs from './tabs'

const SystemAccessTimeModal = (props: Props) => {
  const { save, close } = props

  const {
    workDate: [workDate, setWorkDate],
    workDateForm: [workDateForm, setWorkDateForm],
    reset: resetWorkDate,
    isInvalid: isInvalidWorkDate,
  } = useWorkDate()

  const {
    systemAccessTime: [systemAccessTime, setSystemAccessTime],
    systemAccessTimeForm: [systemAccessTimeForm, setSystemAccessTimeForm],
    isInvalid: isInvalidSystemAccessTime,
  } = useSystemAccessTime({ system_access_time: props.system_access_time })

  const [activeTab, setActiveTab] = useState<number>(0)

  const [modal, setModal] = useState<ModalState>(null)

  useEffect(() => {
    resetWorkDate(activeTab)
  }, [activeTab])

  const onAdd = () => {
    if (Object.keys(workDateForm.errors).length) {
      setWorkDateForm((prev) => ({ ...prev, submits: prev.submits + 1 }))
      return
    }

    setSystemAccessTime((prev) => ({
      ...prev,
      work_dates: [...prev.work_dates, workDate],
    }))

    resetWorkDate(activeTab)
  }

  const onRemove = (index: number) => {
    setSystemAccessTime((prev) => {
      const work_dates = [...prev.work_dates]
      work_dates.splice(index, 1)
      return { ...prev, work_dates }
    })
  }

  const onSubmit = () => {
    setSystemAccessTimeForm((prev) => ({ ...prev, submits: prev.submits + 1 }))
    if (Object.keys(systemAccessTimeForm.errors).length > 0) return

    save(systemAccessTime)
    close()
  }

  return (
    <Modal
      size='large'
      open
      style={{
        width: '1095px',
      }}
    >
      <S.ModalHeader
        color='blue'
        content='Configuração do Horário de Acesso ao Sistema ou Ponto Eletrônico'
      />

      <S.Container>
        <SystemAccessTimeContext.Provider
          value={{
            workDate: {
              state: [workDate, setWorkDate],
              form: [workDateForm, setWorkDateForm],
              isInvalid: isInvalidWorkDate,
              onAdd,
              onRemove,
              reset: () => resetWorkDate(activeTab),
            },
            systemAccessTime: {
              state: [systemAccessTime, setSystemAccessTime],
              form: [systemAccessTimeForm, setSystemAccessTimeForm],
              isInvalid: isInvalidSystemAccessTime,
            },
            setModal,
          }}
        >
          <div>
            De acordo com a operação, faça a definição
            <Components.Notification />
          </div>

          <div>
            <Components.EletronicPoint />

            <Components.Tolerance />
          </div>

          <div>
            <MwTabs
              options={[
                {
                  label: 'Rotina Semanal',
                  data: {},
                },
                {
                  label: 'Período Provisório',
                  data: {},
                },
              ]}
              active={[activeTab, setActiveTab]}
              internal
              alwaysOpen
            />
          </div>

          <div>Configurações dos dias e horários</div>

          {(() => {
            const tabs = [Tabs.WeeklyRoutine, Tabs.InterimPeriod]
            const Tab = tabs[activeTab]
            return Tab && <Tab />
          })()}
        </SystemAccessTimeContext.Provider>
      </S.Container>

      <Components.Submit
        {...{
          onCancel: close,
          onSubmit,
          disabled: systemAccessTimeForm.validating,
        }}
      />

      <MwModal modal={modal} />
    </Modal>
  )
}

export default SystemAccessTimeModal
