import React from 'react'

import Bullet from '../../../components/Bullet'
import Popup from '../../../components/ManagerColumnPopup'
import { Link } from '../styles'

import { getAssociatedPDVsModal } from './Modals'
import FlagsData from './Popups/FlagsData'
import NetworksData from './Popups/NetworksData'
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

    let networks: any[] =
      e.networks.map((net) => {
        net.flags &&
          net.flags.map((e) => {
            return { ...e, parent_name: net.name }
          })

        return net
      }) || []

    const flags = networks
      ? [].concat.apply(
          [],
          networks.map((e) => e.flags),
        )
      : []

    return {
      id: e.hasOwnProperty('id') ? e.id : null,
      active: e.active,
      active_jsx: status ? (
        <Bullet content={status.name} color={status.color} />
      ) : null,
      name: e.hasOwnProperty('name') ? e.name : null,
      network_count_value: (e.networks && e.networks.length) || null,
      network_count:
        e.networks && e.networks.length > 0 ? (
          <Popup
            position='left center'
            offset={[5, -80]}
            style={{ padding: 0 }}
            trigger={<Link>{e.networks && e.networks.length}</Link>}
            getContent={async (): Promise<JSX.Element> => (
              <NetworksData
                networks={e.networks}
                subtitle={e.name ? e.name : '-'}
              />
            )}
          />
        ) : (
          <>-</>
        ),
      flag_count_value: flags.length || null,
      flag_count:
        flags.length > 0 ? (
          <Popup
            position='left center'
            offset={[5, -80]}
            style={{ padding: 0 }}
            trigger={<Link>{flags.length}</Link>}
            getContent={async (): Promise<JSX.Element> => (
              <FlagsData
                networks={e.networks}
                subtitle={e.name ? e.name : '-'}
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
