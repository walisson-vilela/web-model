import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import useDownloadsManagerContext, {
  DownloadsManagerProvider
} from './provider'

const DownloadsManager = createRouteTab(() => {
  const { managerProps } = useDownloadsManagerContext()
  return (
    <MwManagerContainer>
      <Header description='Gerenciar arquivos gerados pelo sistema' />
      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, DownloadsManagerProvider)

export default DownloadsManager
