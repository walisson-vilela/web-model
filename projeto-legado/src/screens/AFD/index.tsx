import { Toaster } from 'react-hot-toast'

import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import AFDComponent from './components/AFDC'
import { AFDProvider } from './provider'

const AFD = createRouteTab(() => {
  return (
    <>
      <MwManagerContainer>
        <AFDComponent />
      </MwManagerContainer>

      <Toaster position='bottom-right' />
    </>
  )
}, AFDProvider)

export default AFD
