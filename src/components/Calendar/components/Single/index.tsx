import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import AbsoluteContainer from '../../../AbsoluteContainer'
import type { AbsoluteContainerProps } from '../../../AbsoluteContainer/interfaces'
import { maxHeight } from '../../constants'

import Main from './components/Main'
import type { MainProps } from './components/Main/interfaces'
import type { SingleCalendarProps } from './interfaces'

const CalendarSingle = React.forwardRef(
  (props: SingleCalendarProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const containerProps = filterObject<
      SingleCalendarProps,
      AbsoluteContainerProps
    >(props, [
      'initialMonth',
      'max',
      'min',
      'initialValue',
      'value',
      'time',
      'onSubmit',
      'invalid',
      'absolute',
      'getDay',
      'onChangeMonth',
      'label',
      'calendar',
      'paddingless',
    ])

    const mainProps = filterObject<SingleCalendarProps, MainProps>(props, [
      'absolute',
    ])

    return props.absolute ? (
      <AbsoluteContainer
        axis='y'
        maxHeight={maxHeight}
        {...containerProps}
        ref={ref}
      >
        <Main {...mainProps} />
      </AbsoluteContainer>
    ) : (
      <Main {...mainProps} />
    )
  },
)

CalendarSingle.displayName = 'CalendarSingle'

export default CalendarSingle
