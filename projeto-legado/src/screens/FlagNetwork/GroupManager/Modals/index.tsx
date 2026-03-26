import { Modal } from 'semantic-ui-react'

import AssociatedPDV from './AssociatedPDV'
import Create from './Create'

export const getCreateModal = (close: Function, reload: Function): void => {
  close(
    <Modal
      open={true}
      size='small'
      children={<Create setOpen={close} loadData={reload} />}
    />,
  )
}

export const getEditModal = (
  data: any,
  close: Function,
  reload: Function,
): void => {
  close(
    <Modal
      open={true}
      size='small'
      children={<Create setOpen={close} editData={data} loadData={reload} />}
    />,
  )
}

export const getAssociatedPDVsModal = (data: any, close: Function): void => {
  close(<AssociatedPDV setOpen={close} dataBasics={data} />)
}
