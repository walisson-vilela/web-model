import { Footer as Component } from '../../../../../components/form/components'
import useFormContext from '../../context'

const Footer = () => {
  const {
    disabled,
    closeTab,
    dirtyFields,
    loading: [loading],
    isDirty,
    data,
    modal: [, setModal],
  } = useFormContext()

  return (
    <Component
      buttons={[
        {
          type: 'button',
          appearance: 'bordered',
          children: 'Cancelar',
          onClick: () => {
            if (!isDirty) {
              closeTab('/main/users/home')
              return
            }

            setModal({
              title: 'Notificação',
              content:
                'Existem dados que ainda não foram salvos, vocês deseja realmente sair da tela?',
              buttonType: 'MwButton',
              actions: [
                {
                  appearance: 'borderless',
                  type: 'button',
                  onClick: () => setModal(null),
                  children: 'Cancelar',
                },
                {
                  type: 'button',
                  onClick: () => {
                    closeTab('/main/users/home')
                    setModal(null)
                  },
                  children: 'Sim',
                },
              ],
            })
          },
        },
        {
          type: 'submit',
          children: 'Salvar',
          disabled: disabled || loading || dirtyFields.length < 1,
        },
      ]}
      lastModified={data.modifier}
    />
  )
}

export default Footer
