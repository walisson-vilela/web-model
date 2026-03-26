import React, { useState } from 'react'

import AddUsers from './components/AddUsers'
import ConfigGroup from './components/ConfigGroup'
import NewGroupContext from './context'
import { NewGroupContainer } from './styles'

const NewGroup = () => {
  const [configGroupTab, setConfigGroupTab] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  return (
    <NewGroupContext.Provider
      value={{
        setConfigGroupTab,
        name,
        setName,
      }}
    >
      <NewGroupContainer>
        {!configGroupTab ? <AddUsers /> : <ConfigGroup />}
      </NewGroupContainer>
    </NewGroupContext.Provider>
  )
}

export default NewGroup
