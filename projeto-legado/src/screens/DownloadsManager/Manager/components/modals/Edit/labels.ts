interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
}

export interface Labels {
  type: Label
  name: Label
}

const labels: Labels = {
  type: {
    label: 'Origem',
    placeholder: 'Ex.: Galeria de Imagem',
  },
  name: {
    label: 'Nome do Arquivo',
    placeholder: 'Nome do Arquivo',
    required: true,
  },
}

export default labels
