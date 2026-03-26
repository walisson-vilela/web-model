import Popup from '../../../../../../components/Popup'
import { cepFormatter } from '../../../../../../utils/formatters'
import { CheckAddress } from '../../../../Home/components'
import { SourceStatus } from '../../../../types'

interface IPopupAddress {
  formatted: string
  postal_code: string

  source_status: SourceStatus
}

const PopupAddress = (props: IPopupAddress) => {
  const { formatted, postal_code, source_status } = props

  return (
    <Popup
      on='click'
      position='right center'
      hideOnScroll
      offset={({ placement }) => (placement === 'top-start' ? [10, 0] : [])}
      trigger={
        <Popup.TriggerContainer ellipsis={false}>
          <CheckAddress status={source_status} children={formatted} />
        </Popup.TriggerContainer>
      }
      content={
        <div style={{ width: '250px' }}>
          {formatted} <br /> {'Cep: ' + cepFormatter(postal_code)}
        </div>
      }
      inverted
    />
  )
}

export default PopupAddress
