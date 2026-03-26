import { MwButton } from '@mw-kit/mw-ui'

import useFormContext from '../../context'
import { PasswordGenerator as PasswordGeneratorModal } from '../../modals'

const PasswordGenerator = () => {
  const {
    form: { setValue },
    setModal,
  } = useFormContext()

  return (
    <div style={{ marginTop: 27 }}>
      <MwButton
        type='button'
        color='greyishBlue'
        appearance='borderless'
        onClick={() =>
          setModal(
            <PasswordGeneratorModal
              onClose={() => setModal(null)}
              onSubmit={(password) => {
                setValue('password', password)
                setValue('password_confirm', password)
              }}
            />,
          )
        }
        children='Gerar Senha Aleatória'
      />
    </div>
  )
}

export default PasswordGenerator
