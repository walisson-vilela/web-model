import React from 'react'

import Bullet from '../../../../components/Bullet'
import Popup from '../../../../components/ManagerColumnPopup'

import getPeopleDetails from './components/PopupDetails/PeopleDetails'
import getStoreDetails from './components/PopupDetails/StoreDetails'
import { BodyInterface, DataInterface } from './interfaces'
import { statusColors } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    let parsed: any = {
      id: e.hasOwnProperty('id') ? parseInt(e.id) : null,
      status: e.hasOwnProperty('status') ? (
        <Bullet content={e.status} color={statusColors[e.status]} />
      ) : null,
      store_id: e.hasOwnProperty('store_id') ? parseInt(e.store_id) : null,
      store_name: e.hasOwnProperty('store_name') ? (
        <Popup
          trigger={e.store_name}
          getContent={async (): Promise<JSX.Element> =>
            getStoreDetails(parseInt(e.store_id))
          }
        />
      ) : null,
      segment_id: e.hasOwnProperty('segment_id')
        ? parseInt(e.segment_id)
        : null,
      segment_name: e.hasOwnProperty('segment_name') ? e.segment_name : null,
      segment_time: e.hasOwnProperty('segment_time') ? e.segment_time : null,
      route_name: e.hasOwnProperty('route_name') ? e.route_name : null,
      people_id: e.hasOwnProperty('people_id') ? parseInt(e.people_id) : null,
      people_name: e.hasOwnProperty('people_name') ? (
        <Popup
          trigger={e.people_name}
          getContent={async (): Promise<JSX.Element> =>
            getPeopleDetails(parseInt(e.people_id))
          }
        />
      ) : null,
      supervisor_id: e.hasOwnProperty('supervisor_id')
        ? parseInt(e.supervisor_id)
        : null,
      supervisor_name: e.hasOwnProperty('supervisor_name')
        ? e.supervisor_name
        : null,
      window_planned: e.hasOwnProperty('window_planned')
        ? e.window_planned
        : null,
      window_performed: e.hasOwnProperty('window_performed')
        ? e.window_performed
        : null,
    }
    console.log(parsed)
    return parsed
  })
}

export default parser
