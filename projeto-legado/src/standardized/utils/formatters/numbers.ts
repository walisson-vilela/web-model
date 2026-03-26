export const formatCNPJ = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, '')

  cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')

  return cnpj
}

export const formatCEP = (cep: string): string => {
  const cleanedCep = cep.replace(/\D/g, '')

  const formattedCep = cleanedCep.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3')

  return formattedCep
}

export const formatPercent = (
  value: number,
  precision = 1,
  separator = ',',
): string => {
  return `${value.toFixed(precision).replace('.', separator)}%`
}

export function formatNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}
