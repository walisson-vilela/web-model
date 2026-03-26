import { MwInput } from '@mw-kit/mw-ui'

interface IRadioInput {
  type: 'Automatico' | 'Manual'

  checked: boolean | undefined

  setChecked: (checked: boolean | undefined) => void
}

const label: { [k in IRadioInput['type']]: { label: string; value: boolean } } =
  {
    Automatico: { label: 'Automático', value: false },
    Manual: { label: 'Manual', value: true },
  }

const AssociationRadioButton = (props: IRadioInput) => {
  const { checked, type, setChecked } = props

  return (
    <MwInput
      label={label[type].label}
      type='radio'
      checked={checked === label[type].value}
      name={'association'}
      onChange={(e) =>
        setChecked(e.target.checked ? label[type].value : undefined)
      }
    />
  )
}
export default AssociationRadioButton
