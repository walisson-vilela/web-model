import React from 'react'

import ButtonNext from './components/ButtonNext'
import Contacts from './components/Contacts'
import Header from './components/Header'
import Search from './components/Search'

const AddUsers = () => {
  return (
    <React.Fragment>
      <Header />
      <Search />
      <Contacts />
      <ButtonNext />
    </React.Fragment>
  )
}

export default AddUsers
