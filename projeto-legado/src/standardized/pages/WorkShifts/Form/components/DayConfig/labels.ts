interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

interface Labels {
  interval: Label
  weekdays: Label
  starts_at: Label
  ends_at: Label
  name: Label
  start_limit: Label
  flag: Label
}

export const labels: Labels = {
  interval: {
    placeholder: 'Tipo',
    label: 'Tipo',
    required: true,
  },
  weekdays: {
    label: 'Frequência',
    placeholder: 'Selecione',
    required: true,
  },
  starts_at: {
    placeholder: '--:--',
    label: 'Hora Início',
    required: true,
  },
  ends_at: {
    placeholder: '--:--',
    label: 'Hora Término',
    required: true,
  },
  name: {
    placeholder: 'Nome do Intervalo',
    label: 'Nome do Intervalo',
    required: true,
  },
  start_limit: {
    placeholder: '--:--',
    label: 'Hora Limite',
    required: true,
  },
  flag: {
    placeholder: 'Pré-Assinalado',
    label: 'Pré-Assinalado',
    required: true,
  },
}
