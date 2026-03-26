import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import { Provider } from './provider'

const Products = createRouteTab((props) => {
  return (
    <MwManagerContainer>
      <Header description='Gerencie o cadastro de Produtos, associados a Categorias e Subníveis' />

      <Manager {...props} />
    </MwManagerContainer>
  )
}, Provider)

export default Products
