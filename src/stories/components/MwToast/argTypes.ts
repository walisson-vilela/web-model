import type { ArgTypes } from '@storybook/react-webpack5'

import type { ToasterTypes } from '../../../components/Toast/interfaces'

const argTypes: Partial<ArgTypes<ToasterTypes>> = {
  color: {
    description: 'Specifies the color',
    table: {
      defaultValue: { summary: 'success' },
    },
    control: 'select',
  },

  size: {
    description: 'Specifies the size',
    table: {
      defaultValue: { summary: 'normal' },
    },
    control: 'select',
  },

  title: {
    description: 'Specifies the title of the toast',
    table: {
      defaultValue: { summary: '' },
    },
  },

  description: {
    description: 'Specifies the description of the toast',
    table: {
      defaultValue: { summary: '' },
    },
  },
  onClose: {
    description:
      'Abstract the toast.remove() method of react-hot-toast no need to pass the method in this prop',
  },
}

export default argTypes
