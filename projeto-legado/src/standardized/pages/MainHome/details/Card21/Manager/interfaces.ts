import type React from 'react'

export interface DataInterface {
  name: string
  supervisor_id?: number
  supervisor: string
  system_device: React.ReactNode
  system_os?: 'android' | 'ios' | 'unknown'
  imei: string
  synced: string
  synced_status?: 'sim' | 'pendente' | 'unknown'
  gps_off: React.ReactNode
  gps_off_count?: number
  device_off: React.ReactNode
  device_off_count?: number
  app_version: React.ReactNode
  app_version_outdated?: boolean
  base_app: React.ReactNode
  base_app_outdated?: boolean
  base_smart_scan: React.ReactNode
  smart_scan_outdated?: boolean
  last_connection: string
  last_connection_jsx?: React.ReactNode
}
