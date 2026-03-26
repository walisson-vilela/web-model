import React from 'react'

import toast from 'react-hot-toast'
import { Checkbox } from 'semantic-ui-react'

import { Loader } from '../../../../../components/Loader'
import Header from '../../../../../components/ModalHeader'
import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { save, view } from '../services'
import { Button } from '../styles'
import * as Types from '../types'

import * as S from './styles'

const Setting280: Types.SettingComponent = ({ setModal }) => {
  const [loading, setLoading] = React.useState(true)
  const [active, setActive] = React.useState<null | boolean>(null)
  const [initialValue, setInitialValue] = React.useState<null | boolean>(null)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    try {
      const { settings_decoded } = await view(280)
      const { enable_buttons } = settings_decoded
      setActive(enable_buttons)
      setInitialValue(enable_buttons)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadData()
  }, [])

  const onSubmit = async () => {
    setLoading(true)
    try {
      const payload: any = {
        setting_id: 280,
        settings: {
          enable_buttons: active,
        },
      }
      const { success } = await save(payload)
      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
      setModal(null)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  return (
    <Modal
      modal={{
        size: 'small',
        title: 'Aprovar/Reprovar Justificativa pelo Inbox',
        titleColor: 'blue',
        content: (
          <div style={{ height: 330 }}>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                <Header
                  title='ID:280 - Aprovar/Reprovar Justificativa | Referência: Inbox'
                  description='Ative ou Desative abaixo a Aprovação/Reprovação das justificativas pelo inbox'
                />
                <S.DivContainer>
                  <S.SpanContainer>
                    Habitar Botões de Justificativa:
                  </S.SpanContainer>
                  <Checkbox
                    toggle
                    defaultChecked={active}
                    onChange={() => {
                      setActive((prev) => !prev)
                    }}
                    className='settings280-toggle'
                  />
                </S.DivContainer>
              </React.Fragment>
            )}
          </div>
        ),
        actions: [
          {
            content: 'Cancelar',
            className: 'tertiary',
            onClick: () => setModal(null),
          },
          <Button
            primary
            content='Salvar'
            color='blue'
            loading={loading}
            onClick={() => onSubmit()}
            disabled={loading || initialValue === active}
          />,
        ],
      }}
    />
  )
}

export default Setting280
