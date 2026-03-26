import axios from '../../../../../../../../../../services/Axios'

export const deleteEvent = async (
  user_id: number,
  event_id: number,
): Promise<void> => {
  await axios.delete(`v1/tr/users/${user_id}/events/${event_id}`)
}
