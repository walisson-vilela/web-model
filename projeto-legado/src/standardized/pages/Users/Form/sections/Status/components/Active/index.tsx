import useFormContext from '../../../../context'
import Info from '../Info'
import Switch from '../Switch'

const Active = () => {
  const { data } = useFormContext()

  return (
    <Info>
      <Switch event_count={data.event_count} checked />
    </Info>
  )
}

export default Active
