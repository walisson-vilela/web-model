import { getUserCookies, removeTrailingSlash } from '../../../../../../../utils'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { Help as Icon } from '../../../../icons'
import { HeaderItemComponent } from '../../../../types'

import * as S from './styles'

const getApi = (hostname: string) => {
  if (hostname.endsWith('traderesult.app')) {
    return 'prod'
  }

  if (hostname.endsWith('traderesult.ninja')) {
    return 'homol'
  }

  return 'devel'
}

const Help: HeaderItemComponent = (props) => {
  const onClickHelp = () => {
    const user = getUserCookies()
    const url = notEmptyStringOrDefault(user.SUPPORT_URL)
    const token = notEmptyStringOrDefault(user.token)

    if (!url) {
      console.error('Could not get url', { user })
      return
    }

    const params = new URLSearchParams({
      ...(token ? { token } : {}),
      api: getApi(window.location.hostname),
    })

    const fullurl = [removeTrailingSlash(url), params.toString()].join('?')

    window.open(fullurl)
  }

  const { disabled, ...rest } = props

  return (
    <S.Item
      $disabled={disabled}
      title='Help Center'
      onClick={onClickHelp}
      {...rest}
    >
      <Icon />
    </S.Item>
  )
}

export default Help
