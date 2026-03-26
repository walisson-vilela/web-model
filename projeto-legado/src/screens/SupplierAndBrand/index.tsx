import { MwTabs } from '@mw-kit/mw-ui'

import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import useContext, { Provider } from './provider'
import tabs, { paths } from './tabs'

const SupplierAndBrand = createRouteTab((props) => {
  const {
    data: {
      route: { history },
    },
  } = props

  const { managerProps, tab } = useContext()

  const { component: Component } = tabs[tab]

  return (
    <MwManagerContainer>
      <Header description='Gerencie o cadastro e posicionamento dos fabricantes e suas marcas' />

      <MwTabs
        options={tabs.map(({ label }) => ({
          label,
          data: {},
        }))}
        active={[
          tab,
          (i) => {
            const name = paths[i]
            const pathname = [
              '/main/products/suppliers',
              ...(name ? [name] : []),
            ].join('/')
            history.push(pathname)
          },
        ]}
        internal
        alwaysOpen
      />

      <Component {...managerProps} />
    </MwManagerContainer>
  )
}, Provider)

export default SupplierAndBrand
