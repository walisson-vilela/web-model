import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import AbsoluteContainer from '../../../AbsoluteContainer'
import type { AbsoluteContainerProps } from '../../../AbsoluteContainer/interfaces'
import { maxHeight } from '../../constants'

import Main from './components/Main'
import type { MainProps } from './components/Main/interfaces'
import type { IntervalCalendarProps } from './interfaces'

const CalendarInterval = React.forwardRef(
  (props: IntervalCalendarProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const containerProps = filterObject<
      IntervalCalendarProps,
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
    ])

    const mainProps = filterObject<IntervalCalendarProps, MainProps>(props, [
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

CalendarInterval.displayName = 'CalendarInterval'

export default CalendarInterval
