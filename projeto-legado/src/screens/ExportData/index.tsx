import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import useExportDataContext, { ExportDataProvider } from './provider'

const ExportData = createRouteTab(() => {
  const { managerProps } = useExportDataContext()

  return (
    <MwManagerContainer>
      <Header
        description='Utilize os recursos abaixo para definir e realizar a extração do arquivo.'
        style={{ margin: 0 }}
      />
      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, ExportDataProvider)

export default ExportData
