import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import {
    chains as getChainsOptions,
    flags as getFlagsOptions,
    groups as getGroupsOptions,
    peoples as getSupervisorOptions
} from '../../../../../../services/options'

const RED = '#E23851'

const filters: FiltersInterfaces.Filter[] = [
	{
		label: 'Status',
		name: 'status',
		options: [
			{
				label: React.createElement(Bullet, {
					content: 'Realizado',
					color: '#66BB6A',
				}),
				value: 'done',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Andamento',
					color: '#FBCF30',
				}),
				value: 'in_progress',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Não Realizado',
					color: RED,
				}),
				value: 'not_done',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Previsto',
					color: '#3455AB',
				}),
				value: 'predicted',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Justificado',
					color: RED,
				}),
				value: 'justified',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Negado',
					color: '#111827',
				}),
				value: 'denied',
			},
		],
	},
	{
		label: 'Supervisor',
		name: 'supervisor_id',
		options: getSupervisorOptions,
		allowEmptySearch: true,
	},
	{
		label: 'Origem',
		name: 'origin',
		options: [
			{ label: 'Rota', value: 'route' },
			{ label: 'Carteira', value: 'portfolio' },
		],
	},
	{
		label: 'Auditoria',
		name: 'audit',
		options: [
			{ label: 'Sim', value: true },
			{ label: 'Não', value: false },
		],
	},
	{
		label: 'Grupo',
		name: 'market_id',
		options: getGroupsOptions,
		allowEmptySearch: true,
	},
	{
		label: 'Rede',
		name: 'chain_id',
		options: getChainsOptions,
		allowEmptySearch: true,
	},
	{
		label: 'Bandeira',
		name: 'flag_id',
		options: getFlagsOptions,
		allowEmptySearch: true,
	},
]

export default filters
