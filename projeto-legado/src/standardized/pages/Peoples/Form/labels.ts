interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

interface Labels {
  phone: Label
  phone_2: Label

  email: Label

  note: Label
}

export const labels: Labels = {
  email: {
    label: 'E-mail',
    placeholder: 'E-mail',
  },
  phone: {
    label: 'Telefone 1',
    placeholder: '(00) 00000-0000',
    required: true,
  },
  phone_2: {
    label: 'Telefone 2',
    placeholder: '(00) 00000-0000',
  },

  note: {
    label: 'Anotações Gerais',
    placeholder: 'Digite observações se houver',
  },
}
