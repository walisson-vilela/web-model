import React from 'react'

import { Alert } from './styles'

const Warning: React.FunctionComponent<
  {
    title: React.ReactNode
    children: React.ReactNode
  } & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const divProps: React.HTMLAttributes<HTMLDivElement> = { ...props }
  delete divProps.title

  return (
    <Alert {...divProps}>
      <div children={props.title} />
      <div children={props.children} />
    </Alert>
  )
}

export default Warning
