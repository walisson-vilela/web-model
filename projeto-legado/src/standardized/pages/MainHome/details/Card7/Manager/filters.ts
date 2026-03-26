import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { peoples as peoplesOptionsLoader } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: peoplesOptionsLoader,
	},
]

export default filters
