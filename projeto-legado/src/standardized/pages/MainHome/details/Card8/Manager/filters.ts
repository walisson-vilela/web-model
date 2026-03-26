import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'

const filters: FiltersInterfaces.Filter[] = [
	{
		label: 'Status',
		name: 'status',
		options: [
			{
				label: React.createElement(Bullet, {
					content: 'Dentro',
					color: '#62C462',
				}),
				value: 'inside',
			},
			{
				label: React.createElement(Bullet, {
					content: 'Fora',
					color: '#E23851',
				}),
				value: 'outside',
			},
		],
	},
]

export default filters
