import React from 'react'

import Bullet from '../../../components/Bullet'
import Popup from '../../../components/ManagerColumnPopup'
import { Link } from '../styles'

import { getAssociatedPDVsModal } from './Modals'
import FlagsData from './Popups/FlagsData'
import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  closeModal: Function,
): BodyInterface[] => {
  return data.map((e) => {
    const status = e.hasOwnProperty('active')
      ? statusLabels[e.active ? 1 : 0]
      : null
    const groupStatus = e.group ? statusLabels[e.group.active ? 1 : 0] : null

    return {
      id: e.hasOwnProperty('id') ? e.id : null,
      active: e.active,
      active_jsx: status ? (
        <Bullet content={status.name} color={status.color} />
      ) : null,
      name: e.hasOwnProperty('name') ? e.name : null,
      group_id: e.group ? e.group.id : null,
      group_active: e.group ? e.group.active : null,
      group_name: groupStatus ? (
        <Bullet content={e.group.name} color={groupStatus.color} />
      ) : null,
      group_name_value: e.group ? e.group.name : null,
      flag_count_value: e.flags.length || null,
      flag_count:
        e.flags.length > 0 ? (
          <Popup
            position='left center'
            offset={[5, -80]}
            style={{ padding: 0 }}
            trigger={<Link>{e.flags.length}</Link>}
            getContent={async (): Promise<JSX.Element> => (
              <FlagsData
                flags={e.flags}
                subtitle={e.group ? e.group.name : '-'}
                networkName={e.name ? e.name : '-'}
              />
            )}
          />
        ) : (
          <>-</>
        ),
      store_count_value: e.hasOwnProperty('store_count') ? e.store_count : null,
      store_count:
        e.hasOwnProperty('store_count') && e.store_count > 0 ? (
          <Link
            onClick={() =>
              getAssociatedPDVsModal(
                {
                  id: e.id,
                  name: e.name,
                  count: e.store_count,
                },
                closeModal,
              )
            }
          >
            {e.store_count}
          </Link>
        ) : (
          <>-</>
        ),
    }
  })
}

export default parser
