import { useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import { PopupSettingsProps } from '../interface'

import { PopupContent } from './component/PopupContent'

const PopupSetting = ({ id, config }: PopupSettingsProps) => {
  const [settingOpened, setSettingOpened] = useState<boolean>(false)

  return (
    <div style={{ marginRight: 14 }}>
      <Popup
        wide
        trigger={
          <MwIcon
            type='semantic'
            icon='setting'
            width={12}
            height={12}
            color='#949494'
            onClick={() => setSettingOpened(true)}
          />
        }
        content={
          <PopupContent
            config={config}
            id={id}
            setSettingOpened={setSettingOpened}
          />
        }
        position='right center'
        style={{ padding: 0 }}
        open={settingOpened}
        closeOnEscape={false}
        closeOnDocumentClick={false}
        closeOnPortalMouseLeave={false}
        closeOnTriggerBlur={false}
        closeOnTriggerClick={false}
        closeOnTriggerMouseLeave={false}
      />
    </div>
  )
}

export default PopupSetting
