import Popup from '../../../../../../components/Popup'

import CountDataRow from './CountData'
import * as S from './styled'

interface ICount {
  id: number
  contractor_count: number
}

const PopupCount = (props: ICount) => {
  const { id, contractor_count } = props
  return (
    <Popup
      on='click'
      position='left center'
      hideOnScroll
      offset={({ placement }) => (placement === 'top-end' ? [10, 0] : [])}
      trigger={<S.Link>{contractor_count}</S.Link>}
      content={<CountDataRow store_id={id} />}
      style={{ borderRadius: '7px', padding: 0 }}
    />
  )
}

export default PopupCount
