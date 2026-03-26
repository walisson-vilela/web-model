import * as S from './styled'

interface IAddressUpdateAlert {
  color: 'yellow' | 'red'
  title: string
  children: React.ReactNode
}

const Alert = (props: IAddressUpdateAlert) => {
  return (
    <S.Container $color={props.color}>
      <S.Title children={props.title} />
      <S.SubContainer children={props.children} />
    </S.Container>
  )
}

export default Alert
