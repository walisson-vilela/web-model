import moment from 'moment'

import Bullet from '../../../../components/Bullet'
import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../utils/formatters'
import { isObject } from '../../../utils/validators'
import { PERSON_STATUS, getStatus } from '../../Users/labels'

import { BodyInterface } from './interfaces'

export const parsePerson = (data: unknown[]): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((acc, item) => {
    if (!isObject(item)) return acc

    const id = numberOrDefault(item.id)
    if (!id) return acc

    const user = item.user
    const statusIndicie = getStatus(user)
    if (!isObject(user) || !isObject(user.role)) return acc

    const people: BodyInterface = {
      id,
      status: PERSON_STATUS[statusIndicie],
      master: booleanOrDefault(user.role.master, false),
      status_label: (
        <Bullet
          color={PERSON_STATUS[statusIndicie].color}
          content={PERSON_STATUS[statusIndicie].label}
        />
      ),
      name: notEmptyStringOrDefault(item.name),
      registration: notEmptyStringOrDefault(item.registration),
      sector: notEmptyStringOrDefault(item.sector),

      admission: null,
      admission_formatted: null,
    }

    if (item.admission) {
      const admissionDate = moment(item.admission)

      if (admissionDate.isValid()) {
        people.admission = admissionDate.toDate()
        people.admission_formatted = admissionDate.format('DD/MM/YYYY')
      }
    }

    return [...acc, people]
  }, [])

  return parsed
}
