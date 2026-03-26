// Ex.: 9780471117094
const EANCode = (value: unknown): boolean => {
  if (typeof value !== 'string') return false

  // Check if there are only digits
  if (!value.match('^[0-9]*$')) return false

  // should check the length of eanCode
  if (value.length !== 13) return false

  // Get number which has been checked
  const last = Number(value.charAt(value.length - 1))
  const rest = value.substring(0, value.length - 1)

  // Get sum of odd numbers
  const odd = Object.keys(
    Array(Math.floor(rest.length / 2)).fill(undefined),
  ).reduce((result, i) => {
    const index = Number(i)
    const number = Number(rest.charAt(index * 2))
    return result + number
  }, 0)

  // get sum of even numbers
  const even = Object.keys(
    Array(Math.ceil(rest.length / 2)).fill(undefined),
  ).reduce((result, i) => {
    const index = Number(i)
    const number = Number(rest.charAt(index * 2 + 1))
    return result + number
  }, 0)

  // Sum even and odd
  const total = even * 3 + odd

  // Store the remainder obtained by dividing totalSum by 10
  let check = total % 10
  // If check is not 0, then remove 10
  if (check !== 0) check = 10 - check
  // check if check is equal to last number
  return check === last
}

export default EANCode
