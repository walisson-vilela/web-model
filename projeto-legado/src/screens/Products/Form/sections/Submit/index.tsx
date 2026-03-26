import { RouteTabContextProps } from '../../../../../routes/types'
import { Footer } from '../../../../../standardized/components/form/components'
import useContext from '../../context'

type Props = {
  disabled: boolean
  closeTab: RouteTabContextProps['close']
}

const Submit = ({ disabled, closeTab }: Props) => {
  const { data } = useContext()
  const onCancel = () => {
    closeTab('/main/products/home')
  }

  return (
    <Footer
      buttons={[
        {
          type: 'button',
          appearance: 'bordered',
          content: 'Cancelar',
          onClick: onCancel,
        },
        {
          type: 'submit',
          content: 'Salvar',
          disabled: disabled,
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

export default Submit
