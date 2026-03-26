import { Form } from './interfaces'

export const saveParser = (
  form: Form,
  dirtyFields: (keyof Form)[],
  type: 'create' | 'edit',
) => {
  const isDirty =
    type === 'create'
      ? () => true
      : (name: keyof Form) => dirtyFields.includes(name)

  const payload = {
    ...(isDirty('name') ? { name: form.name } : {}),
    ...(isDirty('internal_access')
      ? { internal_access: form.internal_access }
      : {}),
    ...(isDirty('access_level_id')
      ? { access_level_id: form.access_level_id }
      : {}),
    ...(isDirty('hierarchies')
      ? {
          roles_hierarchies: form.hierarchies.map((h) =>
            h.id ? { id: h.id } : { hierarchy_id: h.hierarchy_id },
          ),
        }
      : {}),
  }

  return payload
}
