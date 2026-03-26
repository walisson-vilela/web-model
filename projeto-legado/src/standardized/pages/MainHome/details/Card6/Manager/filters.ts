import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import { peoples as peoplesOptionsLoader } from '../../../../../../services/options'

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
		],
	},
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: peoplesOptionsLoader,
	},
	{
		label: 'Tipo Conexão',
		name: 'connection_type',
		options: [
			{ label: 'Wifi', value: 'wifi' },
			{ label: 'Rede Movel', value: 'mobile' },
		],
	},
	{
		label: 'Nível Conexão',
		name: 'connection_level',
		options: [
			{ label: 'Boa', value: 'good' },
			{ label: 'Moderada', value: 'moderate' },
			{ label: 'Ruim', value: 'bad' },
			{ label: '-', value: 'none' },
		],
	},
	{
		label: 'Imagens Pendentes',
		name: 'pending_images',
		options: [
			{ label: 'Sim', value: 'yes' },
			{ label: 'Não', value: 'no' },
		],
	},
	{
		label: 'Dados Pendentes',
		name: 'pending_data',
		options: [
			{ label: 'Sim', value: 'yes' },
			{ label: 'Não', value: 'no' },
		],
	},
]

export default filters
