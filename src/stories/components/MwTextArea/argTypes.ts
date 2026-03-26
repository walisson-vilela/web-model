import type { ArgTypes } from '@storybook/react-webpack5'

import type { MwTextAreaProps } from '../../../components/TextArea/interfaces'

const argTypes: Partial<ArgTypes<MwTextAreaProps>> = {
  name: {
    description: 'required field to register the textarea',
    table: {
      defaultValue: { summary: '"Button"' },
    },
  },

  width: {
    description:
      'Prop responsable to manager  width of the textarea, you can use 300px || 100%',
  },
  height: {
    description:
      'Prop responsable to manager  height of the textarea 300px || 100%',
  },
  placeholder: {
    description: '',
  },
}

export default argTypes
