import { MwTabs } from '@mw-kit/mw-ui'
import type { TabComponent } from '@mw-kit/mw-ui/dist/components/Tabs/interfaces'
import type { RouteComponentProps } from 'react-router'

import AFD from '../../screens/AFD'
import Areas from '../../screens/Areas'
import Auditings from '../../screens/Auditing'
import AuditingsView from '../../screens/Auditing/View'
import Categories from '../../screens/Categories'
import Chat from '../../screens/Chat'
import Configures from '../../screens/Configure'
import ContractorClient from '../../screens/ContractorClient'
import DashboardHome from '../../screens/DashboardHome'
import DashboardTest from '../../screens/DashboardTest'
import DownloadsManager from '../../screens/DownloadsManager'
import EPIManagement from '../../screens/EPIManagement'
import EPIWarehouse from '../../screens/EPIWarehouse'
import ExportData from '../../screens/ExportData'
import FlagNetwork from '../../screens/FlagNetwork'
import Groups from '../../screens/Group'
import GroupingAreas from '../../screens/GroupingAreas'
import HistoricAuthorizations from '../../screens/HistoricAuthorizations'
import * as ImageGallery from '../../screens/ImageGallery'
import ImportData from '../../screens/ImportData'
import Inbox from '../../screens/Inbox'
import CreateInternalUser from '../../screens/InternalUser'
import UpdateInternalUser from '../../screens/InternalUserUpdate'
import InternalUsers from '../../screens/InternalUsers'
import Justifications from '../../screens/Justifications'
import MyData from '../../screens/MyData'
import * as NewDashboard from '../../screens/NewDashboard'
import NewSurveys from '../../screens/NewSurveys'
import PasswordUpdate from '../../screens/PasswordUpdate'
import PerfectStore from '../../screens/PerfectStore'
import Products from '../../screens/Products'
import ProductsForm from '../../screens/Products/Form'
import RoutesScreen from '../../screens/Routes'
import { EventManager } from '../../screens/Routes/EventManager'
import RoutesEventsManager from '../../screens/Routes/EventsManager'
import RoutesView from '../../screens/Routes/View'
import Segments from '../../screens/Segments'
import Settings from '../../screens/Settings'
import SupplierAndBrand from '../../screens/SupplierAndBrand'
import BrandForm from '../../screens/SupplierAndBrand/Brand/Form'
import TaskManager from '../../screens/TaskManager'
import TaskDetails from '../../screens/TaskManager/TaskDetails'
import Typology from '../../screens/Typology'
import * as ControlPanel from '../../screens/_control_panel'
import * as Terms from '../../screens/_terms'
import Contractors from '../../standardized/pages/Contractors'
import ContractorsForm from '../../standardized/pages/Contractors/contractors/Form'
import GroupsForms from '../../standardized/pages/Contractors/groups/Form'
import Peoples from '../../standardized/pages/Peoples'
import PeoplesForm from '../../standardized/pages/Peoples/Form'
import RoleHierarchy from '../../standardized/pages/RoleHierarchy'
import Roles from '../../standardized/pages/Roles'
import Teams from '../../standardized/pages/Teams'
import * as Users from '../../standardized/pages/Users'
import WorkShifts from '../../standardized/pages/WorkShifts'
import ApiDocs from '../../standardized/pages/apiDocs'
import * as Calendar from '../../standardized/pages/calendars'
import Classification from '../../standardized/pages/classification'
import * as Stores from '../../standardized/pages/stores'
import MainHome from '../../standardized/pages/MainHome'
import { MAIN_HOME_DETAIL_PAGES } from '../../standardized/pages/MainHome/details/pages'
import useRouteTabContext from '../TabsProvider'
import type { RouteTab } from '../TabsProvider/types'

const propsBridge = (
  props: Parameters<TabComponent<{ route: RouteComponentProps }>>[0],
) => {
  const { setLabel, close: closeTab } = useRouteTabContext(props.data.route)
  return {
    ...props.data.route,
    setTitle: (path: string, name: string, icon = '') => {
      setLabel(name)
    },
    closeCurrent: () => {
      closeTab()
    },
    beforeClose: (cb: () => boolean) => { },
    closeTab,
  }
}

const RouteComponents = MwTabs.mapComponents<
  string,
  {
    route: RouteComponentProps
    dirty?: boolean
  }
>({
  AFD,
  Areas,
  Categories,
  Chat,
  ContractorClient,
  DashboardHome,
  DashboardTest,
  DownloadsManager,
  ExportData,
  FlagNetwork,
  GroupingAreas,
  'ImageGallery.Home': ImageGallery.Home,
  'ImageGallery.ImageGalleryView':
    ImageGallery.ImageGalleryView as never as RouteTab,
  ImportData,
  Inbox: Inbox as never as RouteTab,
  Justifications,
  MyData,
  NewDashboard: NewDashboard.NewDashboard,
  'NewDashboard.Attendance': NewDashboard.Attendance,
  'NewDashboard.AverageDistance': NewDashboard.AverageDistance,
  'NewDashboard.AverageSpeed': NewDashboard.AverageSpeed,
  'NewDashboard.Flag': NewDashboard.Flag,
  'NewDashboard.JustificationDetails': NewDashboard.JustificationDetails,
  'NewDashboard.Network': NewDashboard.Network,
  'NewDashboard.Punctuality': NewDashboard.Punctuality,
  'NewDashboard.RangeQuality': NewDashboard.RangeQuality,
  'NewDashboard.Segmentation': NewDashboard.Segmentation,
  'NewDashboard.ServicePerformance': NewDashboard.ServicePerformance,
  'NewDashboard.Typology': NewDashboard.Typology,
  'NewDashboard.XRayTMO': NewDashboard.XRayTMO,
  NewSurveys,
  EPIManagement,
  EPIWarehouse,
  PasswordUpdate,
  PerfectStore,
  ProductsForm: ProductsForm as never as RouteTab,
  Products,
  RoleHierarchy,
  Segments,
  Settings,
  BrandForm: BrandForm as never as RouteTab,
  SupplierAndBrand,
  TaskManager,
  TaskDetails,
  Teams,
  Typology,
  'ControlPanel.AverageDistance': ControlPanel.AverageDistance,
  'ControlPanel.AverageSpeed': ControlPanel.AverageSpeed,
  'ControlPanel.BatteryLevel': ControlPanel.BatteryLevel,
  'ControlPanel.DisconnectedUsers': ControlPanel.DisconnectedUsers,
  'ControlPanel.Home': ControlPanel.Home,
  'ControlPanel.Humor': ControlPanel.Humor,
  'ControlPanel.Justifications': ControlPanel.Justifications,
  'ControlPanel.NotStartedAttendances': ControlPanel.NotStartedAttendances,
  'ControlPanel.PendingData': ControlPanel.PendingData,
  'ControlPanel.PredictedAttendances': ControlPanel.PredictedAttendances,
  'ControlPanel.RangeQuality': ControlPanel.RangeQuality,
  'ControlPanel.RoadmapCoverage': ControlPanel.RoadmapCoverage,
  'ControlPanel.XRayTMO': ControlPanel.XRayTMO,
  'Terms.Home': Terms.Home,
  PeoplesForm: PeoplesForm as never as RouteTab,
  Peoples,
  Roles,
  'Terms.Pendings': Terms.Pendings,
  'Users.Form': Users.Form as never as RouteTab,
  'Users.Grid': Users.Grid,

  ApiDocs,
  'Calendar.Details': Calendar.Details,
  Classification,
  'Stores.Audits': Stores.Audits,
  'Stores.BaseStores': Stores.BaseStores,
  'Stores.HomeForm': Stores.HomeForm,
  'Stores.Home': Stores.Home,
  MainHome,
  ...MAIN_HOME_DETAIL_PAGES,
  Contractors,
  ContractorsForm,
  GroupsForms,
  WorkShifts,

  HistoricAuthorizations,
  CreateInternalUser,
  UpdateInternalUser,
  InternalUsers: InternalUsers as never as RouteTab,

  RoutesScreen: (props) => <RoutesScreen {...propsBridge(props)} />,
  EventsManager: (props) => (
    <EventManager>
      <RoutesView {...propsBridge(props)} />
    </EventManager>
  ),
  RoutesEventsManager: (props) => (
    <RoutesEventsManager {...propsBridge(props)} />
  ),
  Auditings: (props) => <Auditings {...propsBridge(props)} />,
  AuditingsView: (props) => <AuditingsView {...propsBridge(props)} />,
  Configures: (props) => <Configures {...propsBridge(props)} />,
  Groups: (props) => <Groups {...propsBridge(props)} />,
})

export default RouteComponents
