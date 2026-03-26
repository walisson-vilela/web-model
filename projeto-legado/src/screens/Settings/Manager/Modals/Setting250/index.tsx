import React, { useEffect, useState } from 'react'

import { MwButton, MwLoader } from '@mw-kit/mw-ui'
import { Message } from 'semantic-ui-react'

import { Grid } from '../../../../../components/FormFields'
import Header from '../../../../../components/ModalHeader'
import ModalMW from '../../../../../components/MwModal'
import { keys } from '../../../../../utils/Formatters'
import { useDirty, useOnClickOutside } from '../../../../../utils/hooks'
import * as Types from '../types'

import Calendar from './components/Calendar'
import Content from './components/Content'
import OpenModalConfirm from './components/OpenModalConfirm'
import PopupAgendamento from './components/PopupAgendamento'
import { types } from './constants'
import { FormInterface, PendenciesInterface, Type } from './interfaces'
import { getCurrentSchedule, getCurrentType, getSettingData } from './services'
import * as S from './styles'

const getFormDefault = () => {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  return {
    type: 'document',
    date: [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('-'),
  }
}

const Settings250: Types.SettingComponent = ({ setModal }) => {
  //Estados do modal
  const [openedMenu, setOpenedMenu] = useState<boolean>(false)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    form: false,
    data: true,
  })

  const [form, setForm] = useState<FormInterface>(getFormDefault)
  const [currentSchedule, setCurrentSchedule] = useState<FormInterface | null>(
    null,
  )
  const [currentType, setCurrentType] = useState<Type>(types[0])

  const [originals, setOriginals] = useState<FormInterface>({ ...form })
  const { dirty: isDirty, fields: dirtyFields } = useDirty(form, originals)

  const [pendenciesInfo, setPendenciesInfo] = useState<PendenciesInterface>({
    document: [],
    people_id: [],
    re: [],
  })
  const [openNotification, setOpenNotification] = useState<JSX.Element>(
    <React.Fragment />,
  )

  const closeMenu = () => setOpenedMenu(false)
  const modalRef = useOnClickOutside(() => setOpenedMenu(false))

  const openModalConfirmation = async () => {
    setOpenNotification(
      <OpenModalConfirm
        {...{
          currentSchedule,
          currentType,
          form,
          setModal,
          setOpenNotification,
        }}
      />,
    )
  }

  const getData = async () => {
    const pendenciesInfo: PendenciesInterface = {
      document: [],
      people_id: [],
      re: [],
    }

    try {
      pendenciesInfo.document = await getSettingData({ pendence: types[0] })
    } catch (error) {
      console.error(error)
    }

    try {
      pendenciesInfo.people_id = await getSettingData({ pendence: types[1] })
    } catch (error) {
      console.error(error)
    }

    try {
      pendenciesInfo.re = await getSettingData({ pendence: types[2] })
    } catch (error) {
      console.error(error)
    }

    setPendenciesInfo({ ...pendenciesInfo })

    try {
      const currentType = await getCurrentType()
      const currentSchedule = await getCurrentSchedule()

      if (currentSchedule) {
        setForm({ ...currentSchedule })
        setOriginals({ ...currentSchedule })
      } else {
        const form = { ...getFormDefault(), type: currentType }
        setForm({ ...form })
        setOriginals({ ...form })
      }

      setCurrentSchedule(currentSchedule)
      setCurrentType(currentType)
    } catch (error) {
      console.error(error)
    }

    setLoading((prev) => ({ ...prev, data: false }))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <ModalMW
      modal={{
        size: 'large',
        title: 'Configurações Gerais',
        titleColor: 'blue',
        content: (
          <div>
            {openNotification}
            {loading.data && <MwLoader filled />}

            <Header
              title='ID: 250 - Definir Credencial do Login do Usuário'
              description='Utilize os campos para definir qual será a credencial de acesso ao sistema pelo usuário.'
            />

            <S.Container>
              {keys(pendenciesInfo).map((type, index) => (
                <Content
                  {...{
                    key: index,
                    form,
                    currentType,
                    currentSchedule,
                    type,
                    setForm,
                    item: pendenciesInfo[type],
                    modalRef,
                    setOpenedMenu,
                    openedMenu,
                    closeMenu,
                    loading,
                    setLoading,
                  }}
                />
              ))}
            </S.Container>

            <Grid.Row align='center' itemSpacing={[28, 7]}>
              <span>Agendar Data da Mudança</span>
              <PopupAgendamento />
            </Grid.Row>

            <Grid.Row itemSpacing={7}>
              <Calendar
                form={form}
                setForm={setForm}
                disabled={[
                  currentType,
                  ...(currentSchedule ? [currentSchedule.type] : []),
                ].includes(form.type)}
              />
            </Grid.Row>

            <Message
              warning
              style={{ marginTop: 21 }}
              header='Notificação:'
              content='Por impactar no acesso da operação, o agendamento só poderá ser feito no mínimo "Dia +3".'
            />
          </div>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setModal(null)}
          />,
          <MwButton
            content='Salvar'
            loading={loading.form}
            disabled={loading.form || !isDirty}
            onClick={() => openModalConfirmation()}
          />,
        ],
      }}
    />
  )
}

export default Settings250
