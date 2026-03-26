import { useCallback, useState } from 'react'

import { MwButton, MwTabs } from '@mw-kit/mw-ui'

import { default as Modal } from '../../../../../../../../../../../../components/MwModal'
import { keys } from '../../../../../../../../../../../../utils/Formatters'
import { tabsFormatterValue } from '../../../../../../../../../../../Areas/Manager/Modals/functions'

import { ManageAreaProvider } from './context'
import { Rule, Selected } from './interface'
import * as S from './styles'
import tabs from './tabs'

interface IManageArea {
  close: () => void
  onSubmit: (selected: Selected, rule: Rule) => void
  selected: Selected
  rule: Rule
  country_name: string
}

const useTabState = <T extends keyof Selected, S extends Selected | Rule>(
  state: [S, React.Dispatch<React.SetStateAction<S>>],
  index: T,
): [S[T], React.Dispatch<React.SetStateAction<S[T]>>] => {
  const [_state, _setState] = state

  const setState: React.Dispatch<React.SetStateAction<S[T]>> = (value) => {
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

const ManageArea = (props: IManageArea) => {
  const { close } = props

  const [selected, setSelected] = useState<Selected>({ ...props.selected })
  const [rule, setRule] = useState<Rule>({ ...props.rule })
  const [tab, setTab] = useState<number>(0)

  const onSubmit = useCallback(() => {
    props.onSubmit(selected, rule)
    close()
  }, [props.onSubmit, selected, rule])

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
            País: <b>{props.country_name || '-'}</b>
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

        <ManageAreaProvider
          value={{
            rule: useTabState([rule, setRule], tabOptions[tab]) as never,
          }}
        >
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
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ManageArea
