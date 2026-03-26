import axios from '../../../../../../../../../services/Axios'

interface IApproveMapping {
  id: number
  status: boolean

  coordinate?: {
    lat: number
    lng: number
    radius: number
  }
}

export const approveMapping = async ({
  id,
  status,
  coordinate,
}: IApproveMapping) => {
  const params = {
    ...(status && coordinate ? { status, coordinate } : { status }),
  }

  await axios.post(`/v1/tr/store-audits/audit/${id}`, params)
}
