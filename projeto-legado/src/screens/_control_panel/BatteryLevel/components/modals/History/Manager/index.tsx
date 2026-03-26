import React, { useEffect, useState } from 'react'

import { MwManager } from '@mw-kit/mw-manager'

import MwManagerContainer from '../../../../../../../components/ManagerContainer'
import ManagerCounter from '../../../../../../../components/ManagerCounter'
import { BodyBattery, DataBattery } from '../interface'

import header from './header'
import parseData from './parser'

interface Props {
  data: DataBattery[]
}

const Manager = ({ data }: Props) => {
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyBattery[]>([])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(parseData(data))
  }, [])

  return (
    <MwManagerContainer>
      <MwManager
        columns={header}
        rows={body}
        hasFilters={false}
        loading={false}
      />

      <ManagerCounter partial={body.length} total={body.length} />
    </MwManagerContainer>
  )
}

export default Manager
