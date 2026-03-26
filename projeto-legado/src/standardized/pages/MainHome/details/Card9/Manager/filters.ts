import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import { peoples as peoplesOptionsLoader, roles as rolesOptionsLoader } from '../../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
	{
		label: 'Status',
		name: 'status',
		options: [
			{
				label: React.createElement(Bullet, {
					content: 'Ativo',
					color: '#62C462',
				}),
				value: 'active',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Inativo',
					color: '#E23851',
				}),
				value: 'inactive',
			},
		],
	},
	{
		label: 'Função',
		name: 'role_id',
		options: rolesOptionsLoader,
	},
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: peoplesOptionsLoader,
	},
	{
		label: 'Classificação',
		name: 'classification',
		options: [
			{ label: '02 horas', value: '2h' },
			{ label: '04 horas', value: '4h' },
			{ label: '+ 01 dia', value: '1d_plus' },
		],
	},
]

export default filters
