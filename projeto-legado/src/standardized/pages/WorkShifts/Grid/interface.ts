import { WorkShift } from '../types'

export type BodyInterface = WorkShift & {
  active_jsx: JSX.Element // <Bullet color={data[].active} label={data[].active_label} />
  weekdays_jsx: JSX.Element // <Popup {/* ... */} />
  user_count_jsx: JSX.Element | null // <Popup {/* ... */} />
}
