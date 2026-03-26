import { useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../components/Popup'

import PopupAssociationContent from './components/PopupAssociationContent'

const PopupAssociation = ({ disabled }: { disabled?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closePopup = () => setIsOpen(false)

  return (
    <Popup
      on={'click'}
      open={isOpen}
      closeOnTriggerBlur={false}
      closeOnDocumentClick={false}
      closeOnDocumentScroll={false}
      closeOnTriggerClick={false}
      disabled={disabled}
      trigger={
        <MwIcon
          type='semantic'
          icon='setting'
          color='darkGrey'
          width={9}
          height={9}
          {...(disabled
            ? {}
            : {
                onClick: () => setIsOpen((prev) => !prev),
              })}
        />
      }
      content={<PopupAssociationContent toggleOpen={closePopup} />}
      position='right center'
      width={519}
      height={244}
      style={{ padding: '0px' }}
    />
  )
}

export default PopupAssociation
