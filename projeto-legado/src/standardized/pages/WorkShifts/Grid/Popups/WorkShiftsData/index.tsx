import Popup from '../../../../../components/Popup'
import { WeeklyRoutine } from '../../../components'
import { BodyInterface } from '../../interface'

import Content from './components/Content'

interface IWeekdays {
  weekdays: BodyInterface['weekdays']
  id: number
  electronic_point_label: string
}

const WeekDaysPopup = (props: IWeekdays) => {
  const { weekdays } = props

  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      <Popup
        trigger={
          <div>
            <WeeklyRoutine weekdays={weekdays} />
          </div>
        }
        style={{ borderRadius: '7px', padding: 0, cursor: 'pointer' }}
        hideOnScroll
        position='left center'
        offset={[0, 0]}
        on='click'
        content={
          <div style={{ padding: '0', display: 'flex', flex: 1 }}>
            <Content {...props} />
          </div>
        }
      />
    </div>
  )
}

export default WeekDaysPopup
