import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useSegmentationContext, { SegmentationProvider } from './provider'

const Segmentation = createRouteTab(() => {
  const { managerProps } = useSegmentationContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar a representação do canal e a contribuição do mesmo para a performance do atendimento na semana.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, SegmentationProvider)

export default Segmentation
