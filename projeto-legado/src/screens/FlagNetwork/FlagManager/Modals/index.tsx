import { BodyInterface } from '../interfaces'

import AssociatedPDV from './AssociatedPDV'
import Create from './Create'
import ManagePDVs from './ManagePDVs'

export const getCreateModal = (close: Function, reload: Function): void => {
  close(<Create setOpen={close} loadData={reload} />)
}

export const getEditModal = (
  data: any,
  close: Function,
  reload: Function,
): void => {
  data.parent_id = data.network_id
  data.parent_name = data.network_name_value
  data.grandparent_id = data.group_id
  data.grandparent_name = data.group_name_value

  close(<Create setOpen={close} editData={data} loadData={reload} />)
}

export const getAssociatedPDVsModal = (data: any, close: Function): void => {
  close(<AssociatedPDV setOpen={close} dataBasics={data} />)
}

export const getManagePDVModal = (
  data: BodyInterface,
  close: React.Dispatch<React.SetStateAction<JSX.Element>>,
  reload: () => void,
): void => {
  close(<ManagePDVs setOpen={close} areaBasics={data} loadData={reload} />)
}
