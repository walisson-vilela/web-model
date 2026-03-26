interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

export interface Labels {
  // initial data
  email: Label
  phone: Label
  mobile_phone: Label
}

const labels: Labels = {
  email: {
    label: 'E-mail',
    required: false,
  },

  phone: {
    label: 'Telefone 1',
    required: true,
  },

  mobile_phone: {
    label: 'Telefone 2',
    required: false,
  },
}

export default labels
