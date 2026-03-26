import * as S from './styled'

interface IContentInfoComponent {
  title?: string
  children: React.ReactNode
  height: '60%' | '30%' | '10%'
}

const ContentInfoComponent = (props: IContentInfoComponent) => {
  const { title, children, height } = props

  return (
    <div style={{ height: `${height}` }}>
      {title && <S.Title>{title}</S.Title>}
      <S.ContainerContent>{children}</S.ContainerContent>
    </div>
  )
}

export default ContentInfoComponent
