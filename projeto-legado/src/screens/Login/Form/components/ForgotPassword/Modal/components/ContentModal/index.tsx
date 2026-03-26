import React from 'react'

import { IRecoverPassword } from '../../interfaces'

const ContentModal = (props: { forgotInfo: IRecoverPassword }) => {
  const { forgotInfo } = props

  if (forgotInfo === 404) {
    return (
      <React.Fragment>
        Conta ou usuário inválidos. Certifique-se de que digitou os dados
        corretamente para solicitar uma senha provisória.
      </React.Fragment>
    )
  }

  if (forgotInfo.data.supervisor) {
    return forgotInfo.success ? (
      <React.Fragment>
        Não existe e-mail cadastrado. Contate o seu supervisor para alterar a
        senha.
      </React.Fragment>
    ) : (
      <React.Fragment>
        Um e-mail já foi enviado para o supervisor solicitando a troca de senha.
        Contate o seu supervisor ou tente novamente mais tarde.
      </React.Fragment>
    )
  }

  return forgotInfo.success ? (
    <React.Fragment>
      Uma senha provisória foi enviada para o seu e-mail {forgotInfo.data.email}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div>
        Uma senha provisória já foi enviada para o seu e-mail{' '}
        {forgotInfo.data.email}.
      </div>

      <div>
        Confira sua caixa de mensagem e caso não tenha recebido, contate seu
        supervisor ou tente novamente mais tarde.
      </div>
    </React.Fragment>
  )
}

export default ContentModal
