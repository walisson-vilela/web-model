interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

interface Labels {
  name: Label
  birthdate: Label
  document: Label
  registration: Label
  admission: Label
  pis: Label
  sector: Label
}

export const labels: Labels = {
  name: {
    label: 'Nome Completo',
    placeholder: 'Nome',
    required: true,
  },
  birthdate: {
    label: 'Data de Nascimento',
    placeholder: '00/00/0000',
  },
  document: {
    label: 'CPF',
    placeholder: '000.000.000-00',
    required: true,
  },
  registration: {
    label: 'Matrícula',
    placeholder: 'Matrícula Funcional',
  },
  admission: {
    label: 'Data de Admissão',
    placeholder: '00/00/0000',
  },
  pis: {
    label: 'PIS',
    placeholder: 'PIS',
  },
  sector: {
    label: 'Setor de Trabalho',
    placeholder: 'Setor',
  },
}
