import { Cookies } from 'react-cookie'

import { getUserCookies } from '../../utils'

const NoMatch = () => {
  const cookies = new Cookies()

  const { homepage } = cookies.get('_GIV_USER') || {}

  location.href = `${location.origin}${
    getUserCookies() ? homepage : ''
  }?error=404`

  return null
}

export default NoMatch
