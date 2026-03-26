import ContainerBase from '../ContainerBase'
import Content from '../Content'
import { TContent } from '../Content/interfaces'

import { IContainer } from './interfaces'

const Container = <L, R>(props: IContainer<L, R>) => {
  const { leftProps, rightProps } =
    'selected' in props
      ? {
          leftProps: props.left({ selected: props.selected }),
          rightProps: (props.right as never as typeof props.left)({
            selected: props.selected,
          }),
        }
      : { leftProps: props.left(), rightProps: props.right() }

  return (
    <ContainerBase
      left={<Content {...leftProps} />}
      right={<Content {...(rightProps as TContent<R>)} />}
    />
  )
}

export default Container
