import AssociatedPDV from './AssociatedPDV'
import Create from './Create'

export const getCreateModal = (close: Function, reload: Function): void => {
  close(<Create setOpen={close} loadData={reload} />)
}

export const getEditModal = (
  data: any,
  close: Function,
  reload: Function,
): void => {
  data.parent_id = data.group_id
  data.parent_name = data.group_name_value

  close(<Create setOpen={close} editData={data} loadData={reload} />)
}

export const getAssociatedPDVsModal = (data: any, close: Function): void => {
  close(<AssociatedPDV setOpen={close} dataBasics={data} />)
}
