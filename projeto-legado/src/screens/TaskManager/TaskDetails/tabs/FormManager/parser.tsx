
import { Popup } from 'semantic-ui-react'

import Bullet from '../../../../../components/Bullet'

import {
    notEmptyStringOrDefault,
    numberOrDefault
} from '../../../../../utils/Formatters'
import { Link, PopupContent } from '../../styles'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const formName = notEmptyStringOrDefault(e.name)
    const statusColor = notEmptyStringOrDefault(e.status_color)

    return {
      id: numberOrDefault(e.id),
      name: formName ? (
        <Bullet color={statusColor || 'green'} content={formName} />
      ) : (
        <>-</>
      ),
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
      default_fields:
        (e.default_fields_count || 0) > 0 ? (
          <Popup
            on='click'
            inverted
            style={{ padding: 0 }}
            position='left center'
            trigger={<Link>{e.default_fields_count}</Link>}
            content={
              <PopupContent>
                <p>Campos Padrões</p>

                {(e.default_fields || []).map((field, idx) => (
                  <span key={`${field}-${idx}`}>{field}</span>
                ))}
              </PopupContent>
            }
          />
        ) : (
          <>0</>
        ),
    }
  })
}

export default parser
