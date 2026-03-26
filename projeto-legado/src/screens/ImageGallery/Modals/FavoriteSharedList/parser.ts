import { BodyInterface, DataInterface } from './interface'

export const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      name: e.people.name,
      re: e.people.re,
      role_text: e.role_text,
    }
  })
}
