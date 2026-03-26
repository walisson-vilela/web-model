export const qualities = async () => {
  const options = [
    { label: 'Original', value: 'original', data: {} },
    { label: 'Média', value: 'medium', data: {} },
    { label: 'Baixa', value: 'low', data: {} },
  ]

  return { options, lastPage: true }
}

export const extractionTypes = async () => {
  const options = [
    { label: 'Sem Legenda', value: 'S', data: {} },
    { label: 'Legenda Padrão', value: 'L', data: {} },
    { label: 'Legenda Personalizada', value: 'P', data: {} },
  ]

  return { options, lastPage: true }
}

export const customSubtitles = async () => {
  const options = [
    { label: 'Data/Hora', value: 'Data/Hora', data: {} },
    { label: 'ID da Imagem', value: 'ID da Imagem', data: {} },
    { label: 'Token', value: 'Token', data: {} },
    {
      label: 'Status (Aprovada/Reprovada)',
      value: 'Status (Aprovada/Reprovada)',
      data: {},
    },
    { label: 'Motivos do Status', value: 'Motivos do Status', data: {} },
    { label: 'Código do PDV', value: 'Código do PDV', data: {} },
    { label: 'PDV', value: 'PDV', data: {} },
    { label: 'Canal', value: 'Canal', data: {} },
    { label: 'Bandeira', value: 'Bandeira', data: {} },
    { label: 'CNPJ', value: 'CNPJ', data: {} },
    { label: 'Logradouro', value: 'Logradouro', data: {} },
    { label: 'Bairro', value: 'Bairro', data: {} },
    { label: 'Cidade', value: 'Cidade', data: {} },
    { label: 'Estado', value: 'Estado', data: {} },
    { label: 'CEP', value: 'CEP', data: {} },
    {
      label: 'Matrícula do Executor',
      value: 'Matrícula do Executor',
      data: {},
    },
    { label: 'Executor', value: 'Executor', data: {} },
    { label: 'Superior Direto', value: 'Superior Direto', data: {} },
    { label: 'Categoria', value: 'Categoria', data: {} },
    { label: 'Tipo do Produto', value: 'Tipo do Produto', data: {} },
    { label: 'Código do Produto', value: 'Código do Produto', data: {} },
    { label: 'Produto', value: 'Produto', data: {} },
  ]

  return { options, lastPage: true }
}
