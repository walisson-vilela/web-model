import { MwLoader } from '@mw-kit/mw-ui'

import useExclusionListManagerContext from '../../context'

import * as Components from './components'
import * as S from './styled'

const ExclusionListManagerBody = () => {
  const {
    loading: [loading],
  } = useExclusionListManagerContext()

  return (
    <S.ContainerBody>
      <Components.Title />
      <Components.TabsUsersTeamsAssociated />
      {loading && <MwLoader filled zIndex={7} />}
    </S.ContainerBody>
  )
}

export default ExclusionListManagerBody
