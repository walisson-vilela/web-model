import React from 'react'

import Bullet from '../../../components/Bullet'
import { Link } from '../styles'

import { getAssociatedPDVsModal } from './Modals'
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
    const networkStatus = e.network
      ? statusLabels[e.network.active ? 1 : 0]
      : null
    const groupStatus =
      e.network && e.network.group
        ? statusLabels[e.network.group.active ? 1 : 0]
        : null

    return {
      id: e.hasOwnProperty('id') ? e.id : null,
      active: e.active,
      active_jsx: status ? (
        <Bullet content={status.name} color={status.color} />
      ) : null,
      name: e.hasOwnProperty('name') ? e.name : null,
      network_id: e.network && e.network.id ? e.network.id : null,
      network_active: e.network && e.network ? e.network.active : null,
      network_name: networkStatus ? (
        <Bullet content={e.network.name} color={networkStatus.color} />
      ) : null,
      network_name_value: e.network && e.network.name ? e.network.name : null,
      group_id: e.network && e.network.group ? e.network.group.id : null,
      group_active:
        e.network && e.network.group ? e.network.group.active : null,
      group_name: groupStatus ? (
        <Bullet content={e.network.group.name} color={groupStatus.color} />
      ) : null,
      group_name_value:
        e.network && e.network.group ? e.network.group.name : null,
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
      avatar: e.avatar && e.avatar.url ? e.avatar.url : null,
    }
  })
}

export default parser
