import { Footer } from '../../../../../../standardized/components/form/components'
import useContext from '../../context'

const FormFooter = () => {
  const {
    loading: [loading],
    closeTab,
    data,
  } = useContext()

  return (
    <Footer
      buttons={[
        {
          type: 'button',
          size: 'large',
          onClick: () => {
            closeTab('/main/products/suppliers/brands')
          },
          appearance: 'bordered',
          children: 'Cancelar',
        },
        {
          type: 'submit',

          loading: loading,
          children: 'Salvar',
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

export default FormFooter
