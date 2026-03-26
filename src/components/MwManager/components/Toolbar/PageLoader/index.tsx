import React from 'react'

import * as GlobalStyles from '../../../styled'
import Tooltip from '../../Tooltip'
import * as S from '../styled'

import PageDownIcon from './Down'

interface PageLoaderProps {
  /** callback que ira ser chamada quando o botao for clicado */
  loader: () => void | Promise<void>
  /** indicador de loading ativo */
  loading?: boolean
  /** indicador de ultima pagina */
  isLastPage: boolean
  /** lista de mensagens que apareceram no tooltip */
  messages?: {
    /** mensagem default, aparece quando o botao esta habilitado */
    default?: string
    /** mensagem de quando ja chegou na ultima pagina */
    final?: string
  }
}

const defaultMessages = {
  default: 'Carregar mais itens',
  final: 'Todos os itens já foram carregados',
}

const PageLoader = (props: PageLoaderProps) => {
  const { loader, loading, isLastPage } = { ...props }

  const messages = defaultMessages
  if (props.messages) Object.assign(messages, props.messages)

  let content = messages.default
  let disabled = loading
  let on: 'hover' | 'click' = 'hover'

  if (isLastPage) {
    content = messages.final
    disabled = true
    on = 'click'
  }

  return (
    <GlobalStyles.ThemeContainer>
      <Tooltip on={on} message={content}>
        <S.Button
          onClick={loader}
          $appearance={disabled ? 'disabled' : undefined}
          disabled={disabled}
        >
          <PageDownIcon />
        </S.Button>
      </Tooltip>
    </GlobalStyles.ThemeContainer>
  )
}

export default PageLoader
