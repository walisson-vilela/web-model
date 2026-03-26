import { PERSON_STATUS } from '../../Users/labels'

export type BodyInterface = {
  /** ID */
  id: number // data[].id

  /** status */
  status: (typeof PERSON_STATUS)[keyof typeof PERSON_STATUS] // getStatus(data[].user)
  /** status (jsx) */
  status_label: JSX.Element // <Bullet {...getStatus(data[].user)} />

  /** Pessoa */
  name: string // data[].name

  /** Matrícula */
  registration: string | null // data[].registration

  master: boolean // data[].user?.role?.master

  /** Setor de trabalho */
  sector: string | null // data[].sector

  /** Admissão */
  admission: Date | null // data[].admission
  /** Admissão (DD/MM/YYYY) */
  admission_formatted: string | null // data[].admission.format('DD/MM/YYYY')
}
