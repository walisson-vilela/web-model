import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { peoples as peoplesOptionsLoader } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: peoplesOptionsLoader,
	},
	{
		label: 'Tempo de Admissão',
		name: 'start_use',
		options: [
			{ label: 'Menos de 1 mês', value: 'lt_1_month' },
			{ label: '1 Mês', value: '1_month' },
			{ label: 'Menos de 6 meses', value: 'lt_6_months' },
			{ label: 'Mais de 6 meses', value: 'gt_6_months' },
			{ label: 'Menos de 1 ano', value: 'lt_1_year' },
			{ label: 'Mais de 1 ano', value: 'gt_1_year' },
		],
	},
	{
		label: 'Nota',
		name: 'note',
		options: [
			{ label: '0 a 5', value: '0_5' },
			{ label: '5 a 7.5', value: '5_7_5' },
			{ label: '7.5 a 10', value: '7_5_10' },
		],
	},
]

export default filters
