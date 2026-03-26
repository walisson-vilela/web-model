import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import useCategoriesContext, { CategoriesProvider } from './provider'

const Categories = createRouteTab(() => {
  const { managerProps } = useCategoriesContext()

  return (
    <MwManagerContainer>
      <Header description='Gerencie a hierarquia de categorias e subníveis associando à produtos.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, CategoriesProvider)

export default Categories
