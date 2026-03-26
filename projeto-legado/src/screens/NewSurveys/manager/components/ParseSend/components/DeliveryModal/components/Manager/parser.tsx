import { BodyInterface, DataInterface } from './interface'

const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: e.id,
      role: e.Role.name,
      user: e.People.name,
      timeSend: e.formatted_created_at,
      timeConection: e.formatted_modified_at,
      timeRecive: e.formatted_mobile_date,
    }
  })
}

export default parser
