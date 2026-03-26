import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import Tabs from '../../../../components/Tabs'
import { createRouteTab } from '../../../../routes'

import SegmentsManager from './SegmentsManager'
import StoresManager from './StoresManager'
import useAttendanceContext, { AttendanceProvider } from './provider'

const Attendance = createRouteTab(() => {
  const {
    activeTab: [activeTab, setActiveTab],
    managerProps,
  } = useAttendanceContext()
  const tabsOptions = [
    { label: 'PDVs', component: <StoresManager {...managerProps} /> },
    { label: 'Canal', component: <SegmentsManager {...managerProps} /> },
  ]

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o tempo de atendimento médio na visão PDVS e Canal.' />

      <Tabs
        options={tabsOptions}
        active={{
          active: activeTab,
          setActive: setActiveTab,
        }}
      />

      {tabsOptions[activeTab].component}
    </MwManagerContainer>
  )
}, AttendanceProvider)

export default Attendance
