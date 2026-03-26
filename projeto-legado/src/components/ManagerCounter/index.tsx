import { CounterProps } from './interfaces'
import { Counter } from './styles'

const ManagerCounter = ({ partial, total, children }: CounterProps) => {
  return (
    <Counter>
      {children || partial === total
        ? `Total de ${total} registros.`
        : `Foram carregados ${partial} de um total de ${total} registros.`}
    </Counter>
  )
}

export default ManagerCounter
