import Bullet from '../../../components/Bullet'
import Popup from '../../../components/ManagerColumnPopup'
import { ModalState } from '../../../components/MwModal'
import { isObject } from '../../../standardized/utils/validators'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { Link } from '../styles'

import { AssociatedPDV, AssociatedUsers, ParticularitiesList } from './Modals'
import LocationPopup from './Popups/LocationData'
import RoutesData from './Popups/RoutesData'
import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setModal: React.Dispatch<React.SetStateAction<ModalState>>,
): BodyInterface[] => {
  const parsed = data.reduce((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    const hierarchy_id = numberOrDefault(e.hierarchy_id)
    if (!id || !hierarchy_id) return parsed

    const item: BodyInterface = {
      id,
      name: notEmptyStringOrDefault(e.name),
      status_value: booleanOrDefault(e.status),
      status: null,

      state_count_value: numberOrDefault(e.state_count, 0),
      state_count: null,

      city_count_value: numberOrDefault(e.city_count, 0),
      city_count: null,

      sublocality_count_value: numberOrDefault(e.sublocality_count, 0),
      sublocality_count: null,

      route_count_value: numberOrDefault(e.route_count, 0),
      route_count: null,

      store_count_value: numberOrDefault(e.store_count, 0),
      store_count: null,

      user_count_value: numberOrDefault(e.user_count, 0),
      user_count: null,

      has_particularities: booleanOrDefault(e.has_particularities, false),
      particularities_label: null,

      segment_count_value: numberOrDefault(e.segment_count, 0),

      flag_count_value: numberOrDefault(e.flag_count, 0),

      hierarchy_id,

      country_id: numberOrDefault(e.country_id, 0),
      country_name: notEmptyStringOrDefault(e.country_name),
      system: booleanOrDefault(e.system),
      system_text: notEmptyStringOrDefault(e.system_text),
    }

    if (item.status_value !== null) {
      const status = statusLabels[item.status_value ? 1 : 0]
      item.status = <Bullet content={status.name} color={status.color} />
    }

    if (item.state_count_value > 0) {
      item.state_count = (
        <LocationPopup
          count={item.state_count_value}
          title='Estados'
          id={id}
          subtitle={item.name}
          type='states'
        />
      )
    }

    if (item.city_count_value > 0) {
      item.city_count = (
        <LocationPopup
          count={item.city_count_value}
          title='Cidades'
          id={id}
          subtitle={item.name}
          type='cities'
        />
      )
    }

    if (item.sublocality_count_value > 0) {
      item.sublocality_count = (
        <LocationPopup
          count={item.sublocality_count_value}
          title='Bairros'
          id={id}
          subtitle={item.name}
          type='sublocalities'
        />
      )
    }

    if (item.route_count_value > 0) {
      item.route_count = (
        <Popup
          getContent={async () => <RoutesData id={e.id} subtitle={e.name} />}
          trigger={<Link>{e.route_count}</Link>}
          on='click'
          style={{ padding: 0 }}
        />
      )
    }

    if (item.store_count_value > 0) {
      item.store_count = (
        <Link
          onClick={() =>
            setModal(
              <AssociatedPDV
                data={{
                  id: item.id,
                  name: item.name,
                  count: item.store_count_value,
                }}
                close={() => setModal(null)}
              />,
            )
          }
        >
          {e.store_count}
        </Link>
      )
    }

    if (item.user_count_value > 0) {
      item.user_count = (
        <Link
          onClick={() =>
            setModal(
              <AssociatedUsers
                by='region'
                data={{
                  id: item.id,
                  name: item.name,
                  count: item.user_count_value,
                }}
                close={() => setModal(null)}
              />,
            )
          }
        >
          {e.user_count}
        </Link>
      )
    }

    item.particularities_label = item.has_particularities ? (
      <Link
        onClick={() =>
          setModal(
            <ParticularitiesList
              data={{
                id: item.id,
                name: item.name,
                country_name: item.country_name,
                flag_count: item.flag_count_value,
                segment_count: item.segment_count_value,
              }}
              close={() => setModal(null)}
            />,
          )
        }
      >
        Sim
      </Link>
    ) : (
      'Não'
    )

    return [...parsed, item]
  }, [] as BodyInterface[])

  return parsed
}

export default parser
