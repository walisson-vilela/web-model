import { ThemeProvider } from '@mw-kit/mw-ui'
import 'animate.css/animate.min.css'
import { CookiesProvider } from 'react-cookie'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import 'semantic-ui-css/semantic.min.css'

import App from './App'
import './assets/fonts/icomoon/style.css'
import './assets/styles/css/app.css'
import store from './redux'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CookiesProvider>
    <Provider store={store()}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </CookiesProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

serviceWorker.unregister()
