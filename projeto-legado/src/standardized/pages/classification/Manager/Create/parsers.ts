import { Form } from './interfaces'

export const save = (data: Form) => {
  const parsed = {
    name: data.name,
    ...(data.scenery_id ? { scenery_id: data.scenery_id } : {}),
    ...(data.temporary !== null ? { temporary: data.temporary } : {}),
    ...(data.required_file !== null
      ? { required_file: data.required_file }
      : {}),
  }

  return parsed
}
