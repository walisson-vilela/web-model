import { Footer as FooterContainer } from '../../../../../../components/form/components'
import useFormContext from '../../context'

const Footer = () => {
  const {
    form,
    loading: [loading],
    validations: [validations],
    mode,
    closeTab,
    data,
  } = useFormContext()

  const {
    formState: { dirtyFields },
  } = form

  const onClickCancel = () => {
    closeTab(mode === 'base-stores' ? '/main/stores/base' : '/main/stores/home')
  }

  const disabled = Object.keys(dirtyFields).length === 0

  return (
    <FooterContainer
      buttons={[
        {
          content: 'Cancelar',
          type: 'button',
          appearance: 'bordered',
          disabled: loading,
          onClick: onClickCancel,
        },
        {
          content: 'Salvar',
          type: 'submit',
          appearance: 'solid',
          disabled:
            loading || disabled || Object.values(validations).some((e) => !e),
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
