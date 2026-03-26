import Bullet from '../../../../../components/Bullet'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import Popup from '../../../../components/Popup'
import { notEmptyStringOrDefault } from '../../../../utils/formatters'
import { isObject } from '../../../../utils/validators'
import { PERSON_STATUS, getStatus } from '../../labels'

import Role from './components/Role'
import { BodyInterface } from './interfaces'

const parseUser = (data: unknown[]): BodyInterface[] => {
  const users = data.reduce<BodyInterface[]>((users, e) => {
    if (!isObject(e)) {
      return users
    }

    const id = numberOrDefault(e.id)
    if (!id) return users

    const status = getStatus(e.user)

    const user: BodyInterface = {
      id,
      status: PERSON_STATUS[status],
      status_label: (
        <Bullet
          color={PERSON_STATUS[status].color}
          content={PERSON_STATUS[status].label}
        />
      ),
      name: notEmptyStringOrDefault(e.name),
      registration: notEmptyStringOrDefault(e.registration),
      event_count: null,
      username: null,
      role_name: null,
      role: {} as BodyInterface['role'],
      route_contractor_name: null,
    }

    if (isObject(e.user)) {
      const event_count = numberOrDefault(e.user.event_count)
      if (event_count) user.event_count = event_count

      if (isObject(e.user.role)) {
        const id = numberOrDefault(e.user.role.id)
        const internal_access = booleanOrDefault(e.user.role.internal_access)

        if (id && internal_access !== null) {
          user.role = {
            id,
            name: notEmptyStringOrDefault(e.user.role.name),
            master: booleanOrDefault(e.user.role.master, false),
            access_level_label: notEmptyStringOrDefault(
              e.user.role.access_level_label,
            ),
            internal_access,
            hierarchies: (Array.isArray(e.user.role.roles_hierarchies)
              ? e.user.role.roles_hierarchies
              : []
            ).reduce<Exclude<BodyInterface['role'], null>['hierarchies']>(
              (hierarchies, e) => {
                if (!isObject(e) || !isObject(e.hierarchy)) {
                  return hierarchies
                }

                const id = numberOrDefault(e.hierarchy.id)
                if (!id) return hierarchies

                return [
                  ...hierarchies,
                  {
                    id,
                    name: notEmptyStringOrDefault(e.hierarchy.name),
                  },
                ]
              },
              [],
            ),
          }

          user.role_name = (
            <Popup
              on='click'
              position='left center'
              hideOnScroll
              offset={({ placement }) =>
                placement === 'top-end' ? [10, 0] : []
              }
              trigger={<Role.Trigger name={user.role?.name} />}
              content={<Role.Content name={user.name} role={user.role} />}
              style={{ minWidth: 412, borderRadius: 7 }}
            />
          )
        }
      }

      if (isObject(e.user.route_contractor)) {
        user.route_contractor_name = notEmptyStringOrDefault(
          e.user.route_contractor.nickname,
        )
      }

      if (isObject(e.user.authentication)) {
        user.username = notEmptyStringOrDefault(e.user.authentication.username)
      }
    }

    return [...users, user]
  }, [])

  return users
}

export default parseUser
