import Popup from '../../../../../../components/Popup'

interface IPopupFlags {
  market_flag_name: string
  market_group_name: string
  market_network_name: string
}

const PopupFlags = (props: IPopupFlags) => {
  const { market_flag_name, market_group_name, market_network_name } = props

  const names = [market_group_name, market_network_name, market_flag_name]

  return (
    <Popup
      on='click'
      position='right center'
      style={{ border: 'none' }}
      inverted
      trigger={
        <Popup.TriggerContainer style={{ margin: 'auto' }}>
          {market_flag_name}
        </Popup.TriggerContainer>
      }
      content={
        <div style={{ maxWidth: '210px' }}>
          {' '}
          <Popup.TriggerContainer style={{ margin: 'auto' }}>
            {Object.values(names).join(' > ')}
          </Popup.TriggerContainer>
        </div>
      }
    />
  )
}

export default PopupFlags
