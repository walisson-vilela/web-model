import type { Preview } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import ThemeProvider from '../src/theme'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider assetBaseUrl='/'>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
