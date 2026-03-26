import { useCallback } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'
import { getUser } from '../../../../services'

const Button = () => {
  const {
    form: { watch, setValue },
    loading: [, setLoading],
  } = useFormContext()

  const replace = watch('replace')

  const onClick = useCallback(async () => {
    if (!replace || !replace.user) return

    setLoading(true)

    try {
      const { form } = await getUser(replace.user.id)

      if (form.role) {
        setValue('role', form.role)
        if (form.role.internal_access) {
          setValue('route_contractor', null)
        }

        const hierarchies = form.hierarchies.map<Form['hierarchies'][number]>(
          ({ id, ...h }) => ({
            ...h,
            superior: null,
            regions: h.regions.map<
              Form['hierarchies'][number]['regions'][number]
            >(({ id, ...r }) => r),
          }),
        )

        setValue('hierarchies', hierarchies)
      }
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [replace])

  return (
    <MwButton
      type='button'
      appearance='bordered'
      children='Consultar'
      {...(replace?.user ? { onClick } : { disabled: true })}
    />
  )
}

export default Button
