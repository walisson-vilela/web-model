import { MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../../../components/Popup'

import Content from './components/ContentPopup'

const Title = (
  <div
    style={{
      height: '38px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      Transferir Usuários selecionado para:{' '}
      <Popup
        on='click'
        trigger={
          <MwIcon
            type='feather'
            height={12}
            width={12}
            icon='info'
            color='black'
          />
        }
        position={'bottom right'}
        offset={[14, 0]}
        content={<Content />}
        inverted
      />
    </div>
  </div>
)

export default Title
