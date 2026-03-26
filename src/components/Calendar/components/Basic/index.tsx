import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import type { AbsoluteContainerProps } from '../../../AbsoluteContainer/interfaces'
import { maxHeight } from '../../constants'

import Main from './components/Main'
import type { BasicCalendarProps } from './interfaces'
import * as S from './styles'

const BasicCalendar = React.forwardRef(
  (props: BasicCalendarProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const containerProps = filterObject<
      BasicCalendarProps,
      AbsoluteContainerProps
    >(props, [
      'initialMonth',
      'max',
      'min',
      'getDay',
      'calendar',
      'absolute',
      'onChangeMonth',
      'paddingless',
    ])

    return 'absolute' in props ? (
      <S.AbsoluteContainer
        axis='y'
        maxHeight={maxHeight}
        {...containerProps}
        ref={ref}
      >
        <Main {...props} />
      </S.AbsoluteContainer>
    ) : (
      <Main {...props} />
    )
  },
)

BasicCalendar.displayName = 'BasicCalendar'

export default BasicCalendar
