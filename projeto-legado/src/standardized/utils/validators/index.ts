export * from './types'

export const isValidCNPJ = (cnpj: string): boolean => {
  const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const x = String(cnpj).replace(/[^\d]/g, '')

  if (x.length !== 14) return false

  if (/0{14}/.test(x)) return false

  const c = x.split('').map((v) => parseInt(v))
  let n = 0

  for (let i = 0; i < 12; n += c[i] * b[++i]);
  if (c[12] !== ((n %= 11) < 2 ? 0 : 11 - n)) return false
  n = 0
  for (let i = 0; i <= 12; n += c[i] * b[i++]);
  if (c[13] !== ((n %= 11) < 2 ? 0 : 11 - n)) return false

  return true
}

export const isValidCPF = (value: string): boolean => {
  const cpf = value.replace(/\D/g, '')
  if (cpf.length !== 11 || cpf === cpf.charAt(0).repeat(11)) return false

  const validateDigit = (index: number): number => {
    const substring = cpf.substring(0, index)

    let factor = index + 1
    let numberIdx = 0
    let sum = 0

    for (let i = index; i >= 1; i--) {
      sum += parseInt(substring[numberIdx]) * factor

      factor--
      numberIdx++
    }

    const result = (sum * 10) % 11

    return result > 9 ? 0 : result
  }

  const digits = cpf.substring(9)

  return (
    parseInt(digits[0]) === validateDigit(9) &&
    parseInt(digits[1]) === validateDigit(10)
  )
}

export const isValidPIS = (pis: string): boolean => {
  const multiplicadorBase = '3298765432'

  const numeroPIS = pis.replace(/[^\d]+/g, '')

  if (numeroPIS.length !== 11 || numeroPIS === numeroPIS.charAt(0).repeat(11)) {
    return false
  }

  const { total } = Array.from(Array(11).keys()).reduce(
    ({ multiplicando, multiplicador, total }, i) => {
      return {
        multiplicando: parseInt(numeroPIS.substring(i, i + 1)),
        multiplicador: parseInt(multiplicadorBase.substring(i, i + 1)),
        total: total + multiplicando * multiplicador,
      }
    },
    {
      multiplicando: 0,
      multiplicador: 0,
      total: 0,
    },
  )

  let resto = 0
  resto = 11 - (total % 11)
  resto = resto === 10 || resto === 11 ? 0 : resto

  const digito = parseInt('' + numeroPIS.charAt(10))
  return resto === digito
}
