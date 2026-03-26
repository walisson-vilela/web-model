import { RowComponent } from '../../../../../../../../../../components/GridSelector/interfaces'
import { Role } from '../../../../interfaces'
import RoleComponent from '../../../Role'

const Row: RowComponent<Role> = (props) => {
  return <RoleComponent item={props.data} />
}

export default Row
