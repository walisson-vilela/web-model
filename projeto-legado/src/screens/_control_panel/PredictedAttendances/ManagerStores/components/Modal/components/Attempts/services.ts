import axios from '../../../../../../../../services/Axios'

export const getAttempts = async (
  attendance_id: number,
  provided: string,
): Promise<any> => {
  let params: any = {
    statistic_attendance_id: attendance_id,
    provided,
  }
  const { data } = await axios.get(
    `/v1/tr/stores/statistic-attendances/confirmation-check-attempts`,
    { params },
  )

  return data.data
}
