import Popup from '../../../../components/Popup'

import * as Components from './components'

interface ResponsibleListProps {
  id: number
  quantity: number
  account: string
}

const AccountList = ({ id, account, quantity }: ResponsibleListProps) => {
  return (
    <Popup
      on='click'
      position='left center'
      hideOnScroll
      disabled={quantity === 0}
      offset={({ placement }) => (placement === 'top-end' ? [10, 0] : [])}
      trigger={
        <Components.Trigger>
          {quantity ? String(quantity).padStart(2, '0') : '-'}
        </Components.Trigger>
      }
      content={<Components.Content account={account} id={id} />}
      style={{ borderRadius: '7px' }}
    />
  )
}

export default AccountList
