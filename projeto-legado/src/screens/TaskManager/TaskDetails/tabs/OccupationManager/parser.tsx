
import { Popup } from 'semantic-ui-react'

import Bullet from '../../../../../components/Bullet'

import { numberOrDefault } from '../../../../../utils/Formatters'
import { Link, PopupContent } from '../../styles'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const name = e.name || ''
    const statusColor = e.status_color || ''

    return {
      id: numberOrDefault(e.id),
      name: name ? (
        <Popup
          on='hover'
          inverted
          style={{ padding: 0 }}
          position='right center'
          offset={[12, 0]}
          trigger={<Link><Bullet color={statusColor || 'green'} content={name} /></Link>}
          content={
            <PopupContent>
              <p>Composição da Área</p>

              <span>
                <strong>Estado</strong>
              </span>
              <span>{(e.states || []).join(', ')}</span>

              <span>
                <strong>Cidades</strong>
              </span>
              <span>{(e.cities || []).join(', ')}</span>

              <span>
                <strong>Bairro</strong>
              </span>
              <span>{(e.sublocalities || []).join(', ')}</span>
            </PopupContent>
          }
        />
      ) : (
        <>-</>
      ),
      store_count: numberOrDefault(e.store_count),
      executor_count: numberOrDefault(e.executor_count),
      accomplished_p1:
        e.accomplished_p1 === null || e.accomplished_p1 === undefined
          ? null
          : `${e.accomplished_p1}%`,
      accomplished_p0:
        e.accomplished_p0 === null || e.accomplished_p0 === undefined
          ? null
          : `${e.accomplished_p0}%`,
      reach:
        e.reach === null || e.reach === undefined ? null : `${e.reach}%`,
    }
  })
}

export default parser
