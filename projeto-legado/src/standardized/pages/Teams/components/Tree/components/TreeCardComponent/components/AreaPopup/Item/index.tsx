import { Region } from '../styles'
import { Regiontype } from '../types'

const CardItem = ({ region }: { region: Regiontype }) => {
  return (
    <Region key={region.id}>
      <h4>{region.name} </h4>
      <h5>Pais: {region.country_name}</h5>
    </Region>
  )
}

export default CardItem
