import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import ApplyTs from '../../store/modules/applyFilters/reducers/index'
import {
  group as ChannelGroup,
  time as ChannelTime,
  defineArea as DefineArea,
  defineFunction as DefineFunction,
  definePdv as DefinePdv,
} from '../../store/modules/channel'
import Dashboard from '../../store/modules/dashboard/reducers'
import DistributionCenter from '../../store/modules/distributioncenter/reducer'
import {
  FlagNetwork,
  GroupNetwork,
  Network,
} from '../../store/modules/flagnetwork'
import OccupationTs from '../../store/modules/ocuppation/reducers/index'
import Regions from '../../store/modules/regions/reducer'
import RegionsFilter from '../../store/modules/regionsFilters/reducers'
import { group as servicepoint } from '../../store/modules/servicepoint'
import Typology from '../../store/modules/typology/reducer'

import App from './App'
import ApplyFilter from './ApplyFilter'
import Authorizations from './Authorizations'
import Birthdays from './Birthdays'
import CalendarEvents from './CalendarEvents'
import Calendars from './Calendars'
import Channel from './Channel'
import Client from './Client'
import Contractors from './Contractors'
import Crop from './Crop'
import EPICheckName from './EPICheckName'
import EPIWarehouse from './EPIWarehouse'
import Errors from './Errors'
import Forms from './Forms'
import Grids from './Grids'
import Hierarchies from './Hierarchies'
import HierarchyElements from './HierarchyElements'
import HierarchyLinks from './HierarchyLinks'
import HierarchyStructures from './HierarchyStructures'
import Loading from './Loading'
import Localizations from './Localizations'
import Markers from './Markers'
import Menus from './Menus'
import Messages from './Messages'
import NewTable from './NewTable'
import Peoples from './Peoples'
import Products from './Products'
import Profiles from './Profiles'
import Region from './Region'
import Reports from './Reports'
import Routes from './Routes'
import RoutesMarkers from './RoutesMarkers'
import RoutesRates from './RoutesRates'
import RoutesStatistics from './RoutesStatistics'
import RoutesVersions from './RoutesVersions'
import RoutesWindowMessage from './RoutesWindowMessage'
import Stores from './Stores'
import Tasks from './Tasks'
import Users from './Users'
import Widget from './Widget'
import Zones from './Zones'

const AppReducer = combineReducers({
  App,
  Hierarchies,
  HierarchyStructures,
  HierarchyElements,
  HierarchyLinks,
  Calendars,
  Crop,
  CalendarEvents,
  Peoples,
  Zones,
  Products,
  Contractors,
  Stores,
  Profiles,
  Routes,
  RoutesVersions,
  RoutesRates,
  RoutesMarkers,
  RoutesStatistics,
  Localizations,
  Users,
  Grids,
  Errors,
  Markers,
  Region,
  RoutesWindowMessage,
  Channel,
  Menus,
  Messages,
  Birthdays,
  Authorizations,
  Client,
  Forms,
  Reports,
  Loading,
  Tasks,
  Widget,
  ApplyFilter,
  applyFilters: ApplyTs,
  occupation: OccupationTs,
  regions: Regions,
  regionsFilters: RegionsFilter,
  typology: Typology,
  distribution: DistributionCenter,
  flagnetwork: FlagNetwork,
  groupNetwork: GroupNetwork,
  network: Network,
  newTable: NewTable,
  group: ChannelGroup,
  time: ChannelTime,
  defineArea: DefineArea,
  definePdv: DefinePdv,
  defineFunction: DefineFunction,
  form: formReducer,
  servicepoint: servicepoint,
  dashboard: Dashboard,
  epiWarehouse: EPIWarehouse,
  epiCheckName: EPICheckName,
})

export default AppReducer
