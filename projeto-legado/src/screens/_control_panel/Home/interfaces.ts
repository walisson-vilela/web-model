import { YAxisLabelsOptions, YAxisOptions } from 'highcharts'

import { ObjUseState } from '../../interfaces'

import { DataInterface as AverageDistanceData } from './widgets/AverageDistance/interfaces'
import { DataInterface as BatteryLevelData } from './widgets/BatteryLevel/interfaces'
import { DataInterface as DisconnectedUsersData } from './widgets/DisconnectedUsers/interfaces'
import { DataInterface as ExceptedAttendancesData } from './widgets/ExceptedAttendances/interfaces'
import { DataInterface as ExecutionCycleData } from './widgets/ExecutionCycle/interfaces'
import { DataInterface as HumorData } from './widgets/Humor/interfaces'
import { DataInterface as NotStartedAttendencesData } from './widgets/NotStartedAttendences/interfaces'
import { DataInterface as PendingDataData } from './widgets/PendingData/interfaces'
import { DataInterface as RoadmapCoverageData } from './widgets/RoadmapCoverage/interfaces'

interface Labels extends Omit<YAxisLabelsOptions, 'rotation'> {
  rotation?: string | number
}

interface YAxis extends Omit<YAxisOptions, 'labels'> {
  labels?: Labels
}

export interface HighchartsOptionsModified
  extends Omit<Highcharts.Options, 'yAxis'> {
  yAxis?: YAxis | YAxis[]
}

export type DataType = {
  roadmap_coverage: RoadmapCoverageData
  not_started_attendances: NotStartedAttendencesData
  disconnected_users: DisconnectedUsersData
  excepted_attendances: ExceptedAttendancesData
  battery_level: BatteryLevelData
  pending_data: PendingDataData
  range_quality: Highcharts.Options
  average_speed: HighchartsOptionsModified
  average_distance: AverageDistanceData
  humor: HumorData
  justifications: Highcharts.Options
  tmo_x_performance: Highcharts.Options
  tmo_x_ray: Highcharts.Options
  execution_cycle: ExecutionCycleData
}

export interface ControlPanelContext {
  data: ObjUseState<DataType, 'data'>
  hierarchy: ObjUseState<string, 'hierarchy'>
  regions: ObjUseState<string[], 'regions'>
  teams: ObjUseState<string[], 'teams'>
  lastRefresh: ObjUseState<string, 'lastRefresh'>
  filters: ObjUseState<Filters, 'filters'>
  firstRender: boolean
}

export interface Filters {
  hierarchy: string
  regions: string[]
  teams: string[]
}

export interface Headlights {
  starts_at: number
  ends_at: number
  color: string
}
