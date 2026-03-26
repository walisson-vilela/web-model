import axios from '../../../../../../../services/Axios/instance'

const deleteUnifiedPDV = async (id: number): Promise<void> => {
  await axios.delete(`/v1/tr/stores/${id}/unified-logs`)
}

export default deleteUnifiedPDV
