export const getStarWars = async (
  search: string,
  page: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const baseURL = 'https://swapi.py4e.com/api/people/'
  const params = {
    ...(page === undefined ? {} : { page }),
    ...(search.length > 0 ? { search } : {}),
  }

  const sufix = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  try {
    const response = await fetch([baseURL, sufix].join('?'))

    return JSON.parse(await response.text())
  } catch (e) {
    console.error(e)
  }

  return {}
}
