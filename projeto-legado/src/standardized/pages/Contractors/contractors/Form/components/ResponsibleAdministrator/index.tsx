import React, { useEffect, useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'

import { AssociatedUser } from '../../../../components/ResponsibleTeam/types'
import { getMasterUser } from '../../../../services'
import * as S from '../../styled'

import { Container } from './styled'

const ResponsibleAdministrator = () => {
  const [userMaster, setUserMaster] = useState<
    AssociatedUser & { re: string }
  >()
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = async () => {
    setIsLoading(true)
    try {
      const userMaster = await getMasterUser()
      setUserMaster(userMaster)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Container>
      <S.Title children='Administrador responsável pela Conta Master' />
      <div>
        {isLoading && <MwLoader filled />}
        {userMaster && (
          <React.Fragment>
            <div>
              <b>Usuário: </b>
              {userMaster.name}
            </div>
            <div>
              <b>Matrícula: </b>
              {userMaster.re || '-'} | <b>Função: </b>
              {userMaster.role ? userMaster.role.name : '-'}
            </div>
          </React.Fragment>
        )}
      </div>
    </Container>
  )
}

export default ResponsibleAdministrator
