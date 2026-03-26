import { MwButton } from '@mw-kit/mw-ui'

import useHomeContext from '../../../../standardized/pages/Home/context'
import { TabComponent } from '../../types'

import * as Styles from './styles'

const Tabs: TabComponent = (props) => {
  const { tab, changeTab } = props

  const { unreadMessages } = useHomeContext()

  return (
    <Styles.Container>
      <MwButton
        type='button'
        content='Nova Mensagem'
        size='small'
        {...(tab === 'new'
          ? { disabled: true }
          : {
              onClick: () => changeTab({ tab: 'new' }),
            })}
      />

      <Styles.ItemsContainer>
        <Styles.Item
          {...(tab === ''
            ? { active: 1 }
            : {
                active: 0,
                onClick: () => changeTab({ tab: '' }),
              })}
        >
          <span children='Caixa de Entrada' />
          {unreadMessages > 0 && (
            <Styles.Counter
              children={unreadMessages > 9 ? '+9' : unreadMessages}
            />
          )}
        </Styles.Item>

        <Styles.Item
          {...(tab === 'sent'
            ? { active: 1 }
            : {
                active: 0,
                onClick: () => changeTab({ tab: 'sent' }),
              })}
        >
          <span children='Enviados' />
        </Styles.Item>

        <Styles.Item
          {...(tab === 'important'
            ? { active: 1 }
            : {
                active: 0,
                onClick: () => changeTab({ tab: 'important' }),
              })}
        >
          <span children='Importantes' />
        </Styles.Item>
      </Styles.ItemsContainer>
    </Styles.Container>
  )
}

export default Tabs
