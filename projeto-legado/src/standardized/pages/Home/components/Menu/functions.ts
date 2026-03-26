import { removeTrailingSlash } from '../../../../../utils'

export const isActive = (prefix: string, pathname?: string) => {
  const x = `${removeTrailingSlash(pathname || window.location.pathname)}/`
  const y = `${removeTrailingSlash(prefix)}/`
  return x.startsWith(y)
}
