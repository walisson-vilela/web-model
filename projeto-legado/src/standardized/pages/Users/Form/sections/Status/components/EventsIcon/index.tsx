import { MwIcon } from '@mw-kit/mw-ui'

import * as S from './styles'

const EventsIcon = (props: { event_count: number }) => {
  return (
    <S.Container
      {...(props.event_count > 0
        ? { 'data-count': props.event_count > 9 ? '9+' : props.event_count }
        : {})}
    >
      <MwIcon
        type='semantic'
        icon='calendar alternate outline'
        width='18px'
        height='20px'
        color='darkBlue'
      />
    </S.Container>
  )
}

export default EventsIcon
