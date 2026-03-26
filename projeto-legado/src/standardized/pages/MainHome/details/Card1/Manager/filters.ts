import { FiltersInterfaces } from '@mw-kit/mw-manager'

import React from 'react'

import {
    peoples as peoplesOptionsLoader,
    roles as rolesOptionsLoader,
    userInactivationReasons as userInactivationReasonsOptionsLoader
} from '../../../../../../services/options'

import Bullet from '../../../../../../components/Bullet'
import { status as statusLabels } from './labels'

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
		label: 'Função',
		name: 'role_id',
		options: rolesOptionsLoader,
		allowEmptySearch: true,
	},
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: peoplesOptionsLoader,
		allowEmptySearch: true,
	},
	{
		label: 'Motivo de Inativação',
		name: 'inactivation_reason_id',
		options: userInactivationReasonsOptionsLoader,
		allowEmptySearch: true,
	},
	{
		label: 'Carteira',
		name: 'wallet',
		options: [
			{ label: 'Sim', value: 'Sim' },
			{ label: 'Não', value: 'Não' },
		],
	},
	{
		label: 'Rota Planejada',
		name: 'planned_route',
		options: [
			{ label: 'Sim', value: 'Sim' },
			{ label: 'Não', value: 'Não' },
		],
	},
]

export default filters
