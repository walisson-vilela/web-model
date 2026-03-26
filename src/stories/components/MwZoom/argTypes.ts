import type { ArgTypes } from '@storybook/react-webpack5'

import type { ZoomProps } from '../../../components/Zoom/interfaces'

const argTypes: Partial<ArgTypes<ZoomProps>> = {
  // size: {
  //   description: 'Specifies the modal size.',
  //   table: {
  //     defaultValue: { summary: '"small"' },
  //   },
  //   control: 'select',
  // },
  // color: {
  //   description: 'Define the color of header and default confirm button.',
  //   table: {
  //     type: {
  //       summary: 'ColorOptions',
  //       detail: Object.keys(colors)
  //         .map((e) => `"${e}"`)
  //         .join('\n'),
  //     },
  //     defaultValue: { summary: '"blue"' },
  //   },
  //   control: 'select',
  // },
  // title: {
  //   description: 'Title on header of modal.',
  //   table: {
  //     defaultValue: { summary: '"Modal"' },
  //   },
  //   control: 'string',
  // },
  // inverted: {
  //   description: 'Define if header of modal is inverted.',
  //   table: {
  //     defaultValue: { summary: 'false' },
  //   },
  // },
  // loading: {
  //   description: 'Define if the button is loading.',
  //   table: {
  //     defaultValue: { summary: 'false' },
  //   },
  // },
  // closeOnClickOutside: {
  //   description: 'Close modal if click outside of container.',
  //   table: {
  //     defaultValue: { summary: 'false' },
  //   },
  // },
  // closeOnEsc: {
  //   description: 'Close modal if type ESC key.',
  //   table: {
  //     defaultValue: { summary: 'false' },
  //   },
  // },
  // footer: { control: false },
  // content: { control: false },
  // children: { control: false },
  // openState: { control: false },
}

export default argTypes
