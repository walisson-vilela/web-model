import Categories from './Categories'
import Favorites from './Favorites'
import Forms from './Forms'
import Stores from './Stores'
import Teams from './Teams'
import { TabComponent } from './types'

const tabs: {
  label: string
  description: string
  Component: TabComponent
}[] = [
  {
    label: 'PDVs',
    description: 'Gerencie as imagens das pesquisas',
    Component: Stores,
  },
  {
    label: 'Equipes',
    description: 'Gerencie as imagens das pesquisas',
    Component: Teams,
  },
  {
    label: 'Categorias',
    description: 'Gerencie as imagens das pesquisas',
    Component: Categories,
  },
  {
    label: 'Formulários',
    description: 'Gerencie as imagens das pesquisas',
    Component: Forms,
  },
  {
    label: 'Meus Favoritos',
    description: 'Gerencie as imagens das pesquisas',
    Component: Favorites,
  },
]

export default tabs
