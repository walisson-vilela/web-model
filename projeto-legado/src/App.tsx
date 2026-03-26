import { Component, Fragment } from 'react'

import moment from 'moment'
import 'moment/locale/es'
import 'moment/locale/pt-br'
import { withCookies } from 'react-cookie'
import { ErrorBoundary } from 'react-error-boundary'
import { addLocaleData, IntlProvider } from 'react-intl'
//import ptLocaleData from "react-intl/locale-data/pt";
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'
import { Button, Modal } from 'semantic-ui-react'

import { Toaster } from 'react-hot-toast'
import GlobalStyle from './assets/styles/css/style'
import { Errors } from './components'
import translations from './i18n/locales'
import RootRoutes from './routes/RootRoutes'
import VERSION from './version'

if (!localStorage.hasOwnProperty('_GIV_LOCALE')) {
  localStorage.setItem('_GIV_LOCALE', 'pt-br')
}

const locale = localStorage.getItem('_GIV_LOCALE')
const messages = translations[locale]

//addLocaleData(ptLocaleData);
addLocaleData(enLocaleData)
addLocaleData(esLocaleData)

class App extends Component {
  componentDidMount() {
    if (VERSION !== '@VERSION') document.body.dataset.version = VERSION
    moment.locale(locale)
  }

  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <IntlProvider locale={'en'} messages={messages}>
          <ErrorBoundary FallbackComponent={ErrorModal}>
            <RootRoutes />
            <Toaster position='bottom-right' />
            <Errors />
          </ErrorBoundary>
        </IntlProvider>
      </Fragment>
    )
  }
}

const ErrorModal = ({ resetErrorBoundary }) => {
  return (
    <Modal open={true} size={'small'}>
      <Modal.Header>Erro 597</Modal.Header>
      <Modal.Content>
        Ocorreu um erro inesperado, o processo não foi concluído. Caso o
        problema persista contacte o administrador do sistema.
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='button'
          content='OK'
          color='red'
          onClick={resetErrorBoundary}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default withCookies(App)
