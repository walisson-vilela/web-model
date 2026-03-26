import { RouteTabContextProps } from '../../../../../../../routes/types'
import { Footer as FooterContainer } from '../../../../../../components/form/components'
import useContext from '../../context'

const Footer = (props: { closeTab: RouteTabContextProps['close'] }) => {
  const { closeTab } = props

  const {
    dirty: { isDirty },
    loading,
    data,
    viewMode,
  } = useContext()

  const onCancel = () => {
    closeTab('/main/accounts/contractors/groups')
  }

  return (
    <FooterContainer
      buttons={[
        ...(viewMode
          ? []
          : [
              {
                type: 'button' as const,
                appearance: 'bordered' as const,
                ...(loading
                  ? {
                      disabled: true,
                    }
                  : {
                      onClick: onCancel,
                    }),

                content: 'Cancelar',
              },
            ]),
        {
          type: 'submit',
          ...(loading || !isDirty
            ? {
                disabled: true,
              }
            : {}),

          content: 'Salvar',
        },
      ]}
      {...(data
        ? {
            lastModified: data.modifier,
          }
        : {})}
    />
  )
}

export default Footer
