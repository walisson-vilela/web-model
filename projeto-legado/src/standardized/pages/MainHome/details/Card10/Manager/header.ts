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
    content: 'Início de Uso',
    key: 'start_use',
    textAlign: 'center',
    width: 2,
    sortKey: 'start_use',
  },
  {
    content: 'Visita',
    key: 'visit',
    textAlign: 'center',
    width: 2,
    sortKey: 'visit',
  },
  {
    content: 'Tempo em Atendimento',
    key: 'service_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'service_time',
  },
  {
    content: 'Pesquisa',
    key: 'survey',
    textAlign: 'center',
    width: 2,
    sortKey: 'survey',
  },
  {
    content: 'Loja Modelo',
    key: 'model_store',
    textAlign: 'center',
    width: 2,
    sortKey: 'model_store',
  },
  {
    content: 'Absenteísmo',
    key: 'absenteeism',
    textAlign: 'center',
    width: 2,
    sortKey: 'absenteeism',
  },
  {
    content: '% Produtividade',
    key: 'productivity',
    textAlign: 'center',
    width: 2,
    sortKey: 'productivity',
  },
  {
    content: 'IDC',
    key: 'idc',
    textAlign: 'center',
    width: 2,
    sortKey: 'idc',
  },
]

export default header
