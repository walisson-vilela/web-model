interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

interface Labels {
  electronic_point: Label
  tolerance_before: Label
  tolerance_after: Label
  weekdays: Label
}

export const labels: Labels = {
  electronic_point: {
    label: 'Tipo de Configuração',
    required: true,
  },
  tolerance_before: {
    label: 'Flexibilidade acesso ao sistema antes e após a jornada',
    placeholder: '0 min',
    required: true,
  },
  tolerance_after: {
    label: 'Flexibilidade acesso ao sistema antes e após a jornada',
    placeholder: '0 min',
    required: true,
  },
  weekdays: {
    label: '',
  },
}
