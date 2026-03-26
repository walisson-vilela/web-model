import React from 'react'

import * as S from './styled'

const EllipsisContainer = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const myProps: React.HTMLAttributes<HTMLDivElement> = { ...props }

  const receivedOnMouseOver = myProps.onMouseOver || (() => {})
  myProps.onMouseOver = (event) => {
    receivedOnMouseOver(event)

    let target = event.target as HTMLElement
    while (
      target &&
      !Object.prototype.hasOwnProperty.call(target.dataset, 'ellipsis')
    ) {
      target = target.parentElement as HTMLElement
    }

    if (!target) return

    if (target.scrollWidth > target.offsetWidth) {
      target.title = target.innerText
    } else target.removeAttribute('title')
  }

  return <S.EllipsisContainer {...myProps} data-ellipsis='' />
}

export default EllipsisContainer
