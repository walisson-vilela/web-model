import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwTabs } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import { default as Modal } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { keys } from '../../../../../utils/Formatters'
import { BodyInterface } from '../../interfaces'
import { tabsFormatterValue } from '../functions'

import { ManageAreaProvider } from './context'
import { Selected } from './interface'
import * as Services from './services'
import * as S from './styles'
import tabs from './tabs'

interface IManageArea {
  close: () => void
  data: BodyInterface
  reload: () => void
}

const useTabState = <T extends keyof Selected>(
  state: [Selected, React.Dispatch<React.SetStateAction<Selected>>],
  index: T,
): [Selected[T], React.Dispatch<React.SetStateAction<Selected[T]>>] => {
  const [_state, _setState] = state

  const setState: React.Dispatch<React.SetStateAction<Selected[T]>> = (
    value,
  ) => {
    _setState((prev) => {
      const newv = typeof value === 'function' ? value(prev[index]) : value
      if (newv === prev[index]) return prev
      const newstates = { ...prev, [index]: newv }
      return newstates
    })
  }

  return [_state[index], setState]
}

const tabOptions = keys(tabs)

// TODO: IMPLEMENT useDirty to disable submit button

const ManageArea = ({ close, data, reload }: IManageArea) => {
  const [selected, setSelected] = useState<Selected>({
    states: [],
    cities: [],
    sublocalities: [],
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [tab, setTab] = useState<number>(0)

  const onSubmit = useCallback(async () => {
    setLoading(true)

    try {
      await Services.saveAreas(selected, data.id)

      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      close()
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [data.id, selected])

  const onloadSelected = useCallback(async () => {
    setLoading(true)
    try {
      const response = await Services.getAreas(data.id)
      setSelected(response)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
    setLoading(false)
  }, [data.id])

  useEffect(() => {
    onloadSelected()
  }, [])

  const Component = tabs[tabOptions[tab]]

  return (
    <Modal.Modal
      open
      size='tiny'
      style={{
        width: '1095px',
        //height: '603px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Gerenciar Área</Modal.Header>

      <Modal.Body
        $paddingTop='s4'
        $paddingBottom='0'
        $paddingLeft='0'
        $paddingRight='0'
      >
        <S.TitleContainer>
          <Modal.Subtitle>
            Área: <b>{data.name || '-'}</b> - País:{' '}
            <b>{data.country_name || '-'}</b>
          </Modal.Subtitle>
        </S.TitleContainer>

        <S.TabsContainer>
          <MwTabs
            active={[tab, setTab]}
            options={[
              tabOptions.map((key) => {
                const Component = tabs[key]
                const total = selected[key].length

                return {
                  label: `${Component.label} (${tabsFormatterValue(total)})`,
                  data: {},
                }
              }),
              () => {},
            ]}
            alwaysOpen
            internal
            spacing='0'
          />
        </S.TabsContainer>

        <ManageAreaProvider value={{ loading }}>
          <Component
            selected={
              useTabState([selected, setSelected], tabOptions[tab]) as never
            }
          />
        </ManageAreaProvider>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='link'
          content='Cancelar'
          onClick={close}
          size='large'
        />

        <MwButton
          type='button'
          content='Confirmar'
          onClick={onSubmit}
          disabled={loading}
          loading={loading}
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ManageArea
