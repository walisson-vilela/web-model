import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { Button, StrictModalActionsProps } from 'semantic-ui-react'

import { filterObject } from '../../../../standardized/utils/formatters'
import { Actions } from '../../interfaces'

import * as S from './styles'

const isElement = (e: unknown): e is JSX.Element => React.isValidElement(e)

type FooterProps = Omit<StrictModalActionsProps, 'actions' | 'children'> &
  (Actions | React.PropsWithChildren) &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'style'>

const Footer = (props: FooterProps) => {
  const children = (() => {
    if (!('actions' in props)) return props.children

    if (props.buttonType === 'MwButton') {
      return props.actions.map((action, index) => {
        if (isElement(action)) {
          return <React.Fragment key={index} children={action} />
        }

        return <MwButton key={index} {...action} />
      })
    }

    return props.actions.map((action, index) => {
      if (isElement(action)) {
        return <React.Fragment key={index} children={action} />
      }

      return <Button key={index} {...action} />
    })
  })()

  const filteredProps = filterObject<
    Actions,
    Omit<StrictModalActionsProps, 'actions' | 'children'>
  >(props as Actions, ['actions', 'buttonType'])

  return <S.ModalActions {...filteredProps} children={children} />
}

export default Footer
