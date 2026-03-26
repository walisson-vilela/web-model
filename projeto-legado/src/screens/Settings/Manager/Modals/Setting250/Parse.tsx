import { BodyInterface, UserInterface } from './interfaces'

const Parse = (data: UserInterface[]): BodyInterface[] => {
  return data.map((item: UserInterface) => {
    return {
      id: item.id,
      name: item.name,
      role: item.role,
    }
  })
}

export default Parse
