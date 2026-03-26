import type { ArgTypes } from '@storybook/react-webpack5'

import type { MenuProps } from '../../../components/Menu/interfaces'
import { spacings } from '../../../theme/constants'

const argTypes: Partial<ArgTypes<MenuProps>> = {
  position: {
    description: 'Define the position.',
    control: 'select',
    options: [
      'top right',
      'top left',
      'bottom right',
      'bottom left',
      'right top',
      'right bottom',
      'left top',
      'left bottom',
    ],
  },
  bordered: {
    description: 'Define if the menu is bordered.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  containerSpacing: {
    description: 'Define the menu spacing.',
    options: Object.keys(spacings),
    control: { type: 'select' },
    table: {
      type: {
        summary: 'SpacingOptions',
        detail: Object.keys(spacings).join('\n'),
      },
      defaultValue: { summary: 's1' },
    },
  },
  scrollSpacing: {
    description: 'Define the menu scroll spacing.',
    options: Object.keys(spacings),
    control: { type: 'select' },
    table: {
      type: {
        summary: 'SpacingOptions',
        detail: Object.keys(spacings).join('\n'),
      },
      defaultValue: { summary: 's1' },
    },
  },
  itemSpacing: {
    description: 'Define the menu scroll spacing.',
    options: Object.keys(spacings),
    control: { type: 'select' },
    table: {
      type: {
        summary: 'SpacingOptions',
        detail: Object.keys(spacings).join('\n'),
      },
      defaultValue: { summary: 's1' },
    },
  },
  before: {
    description: 'Content that appears before the menu',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
  },
  after: {
    description: 'Content that appears after the menu',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
  },
  onScrollEnd: {
    description: 'Callback executed when scrolling ends',
  },
  width: {
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    description: 'Define the menu width.',
  },
  close: {
    description: 'Callback responsible to change menu status for closed.',
  },
}

export default argTypes
