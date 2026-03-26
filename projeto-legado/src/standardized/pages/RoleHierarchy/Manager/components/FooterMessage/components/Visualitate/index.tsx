import * as S from './styled'

interface IVisualitate {
  children: React.ReactNode
  onClick: () => void
}

const Visualitate = (props: IVisualitate) => {
  const { children, onClick } = props
  return <S.LinkVisualitate onClick={onClick}>{children}</S.LinkVisualitate>
}

export default Visualitate
