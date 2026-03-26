import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Sistema/Device',
    key: 'system_device',
    textAlign: 'left',
    width: 3,
    sortKey: 'system_device',
  },
  {
    content: 'Nº Imei',
    key: 'imei',
    textAlign: 'left',
    width: 2,
    sortKey: 'imei',
  },
  {
    content: 'Sincronizado',
    key: 'synced',
    textAlign: 'center',
    width: 2,
    sortKey: 'synced',
  },
  {
    content: 'GPS off',
    key: 'gps_off',
    textAlign: 'center',
    width: 2,
    sortKey: 'gps_off',
  },
  {
    content: 'Aparelho off',
    key: 'device_off',
    textAlign: 'center',
    width: 2,
    sortKey: 'device_off',
  },
  {
    content: 'Versão App',
    key: 'app_version',
    textAlign: 'center',
    width: 2,
    sortKey: 'app_version',
  },
  {
    content: 'Base App',
    key: 'base_app',
    textAlign: 'center',
    width: 2,
    sortKey: 'base_app',
  },
  {
    content: 'Base SmartScan',
    key: 'base_smart_scan',
    textAlign: 'center',
    width: 2,
    sortKey: 'base_smart_scan',
  },
  {
    content: 'Última Conexão',
    key: 'last_connection_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'last_connection',
  },
]

export default header
