export const defaultCoordinates = {
  lat: -12.2448278739,
  lng: -51.646240483,
  radius: 50,
}

export const street_types = [
  'Acesso',
  'Aeroporto',
  'Alameda',
  'Área',
  'Avenida',
  'Campo',
  'Chácara',
  'Colônia',
  'Condomínio',
  'Conjunto',
  'Distrito',
  'Esplanada',
  'Estação',
  'Estrada',
  'Favela',
  'Fazenda',
  'Feira',
  'Jardim',
  'Ladeira',
  'Lago',
  'Lagoa',
  'Largo',
  'Loteamento',
  'Morro',
  'Núcleo',
  'Parque',
  'Passarela',
  'Pátio',
  'Praça',
  'Praia',
  'Quadra',
  'Recanto',
  'Residencial',
  'Rodovia',
  'Rua',
  'Setor',
  'Sítio',
  'Travessa',
  'Trecho',
  'Trevo',
  'Vale',
  'Vereda',
  'Via',
  'Viaduto',
  'Viela',
  'Vila',
].reduce<{
  options: { label: string; value: string }[]
  indexed: { [key: string]: string }
}>(
  (prev, type) => {
    return {
      options: [...prev.options, { label: type, value: type }],
      indexed: { ...prev.indexed, [type]: type },
    }
  },
  {
    options: [],
    indexed: {},
  },
)

export const states = [
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espirito Santo', value: 'ES' },
  { label: 'Goias', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
].reduce<{
  options: { label: string; value: string }[]
  indexed: { [key: string]: string }
}>(
  (prev, state) => {
    return {
      options: [...prev.options, state],
      indexed: { ...prev.indexed, [state.value]: state.label },
    }
  },
  {
    options: [],
    indexed: {},
  },
)
