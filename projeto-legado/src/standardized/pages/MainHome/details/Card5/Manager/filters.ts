import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import { peoples as peoplesOptionsLoader } from '../../../../../../services/options'

import { status as statusLabels, systemActivity } from './labels'

const avgConsumptionOptions: FiltersInterfaces.Option[] = [
	{ label: 'Abaixo de 10%', value: 'below_10' },
	{ label: 'Acima de 10%', value: 'above_10' },
]

const systemActivityOptions: FiltersInterfaces.Option[] = Object.keys(
	systemActivity,
).map((key) => {
	const label = systemActivity[key]?.name || 'Sem informação'

	return {
		label,
		value: key,
	}
})

const filters: FiltersInterfaces.Filter[] = [
	{
		label: 'Status',
		name: 'status',
		options: Object.keys(statusLabels).map((key) => {
			const { name, color } = { ...statusLabels[key] }

			const option: FiltersInterfaces.Option = {
				label: React.createElement(Bullet, { content: name, color }),
				value: key,
			}

			return option
		}),
	},
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: peoplesOptionsLoader,
	},
	{
		label: '% Media Consumo',
		name: 'avg_consumption',
		options: avgConsumptionOptions,
	},
	{
		label: 'Atividade Sistêmica',
		name: 'system_activity',
		options: systemActivityOptions,
	},
]

export default filters
