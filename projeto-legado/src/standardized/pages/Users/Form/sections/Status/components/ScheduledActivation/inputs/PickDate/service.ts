import axios from '../../../../../../../../../../services/Axios'

export const userEventsUpdate = async (userId: number, dateString: string) => {
  await axios.put(`v1/tr/user-events/${userId}`, { ends_at: dateString })
}
