import React from 'react'

import Checkbox from './components/Checkbox'
import type { CheckboxProps } from './components/Checkbox/interfaces'
import Date from './components/Date'
import type { DateProps } from './components/Date/interfaces'
import DateIntervalPicker from './components/DateIntervalPicker'
import type { DateIntervalPickerProps } from './components/DateIntervalPicker/interfaces'
import DatePicker from './components/DatePicker'
import type { DatePickerProps } from './components/DatePicker/interfaces'
import DateTime from './components/DateTime'
import type { DateTimeProps } from './components/DateTime/interfaces'
import DefaultInput from './components/Input'
import type { InputProps as DefaultInputProps } from './components/Input/interfaces'
import Password from './components/Password'
import type { PasswordProps } from './components/Password/interfaces'
import Phone from './components/Phone'
import type { PhoneProps } from './components/Phone/interfaces'
import RadioButton from './components/RadioButton'
import type { RadioButtonProps } from './components/RadioButton/interfaces'
import Range from './components/Range'
import type { RangeProps } from './components/Range/interfaces'
import type { SelectProps } from './components/Select'
import Select from './components/Select'
import Switch from './components/Switch'
import type { SwitchProps } from './components/Switch/interfaces'
import Tags from './components/Tags'
import type { TagsProps } from './components/Tags/interfaces'
import Time from './components/Time'
import type { TimeProps } from './components/Time/interfaces'

export type Props =
  | DateProps
  | TimeProps
  | CheckboxProps
  | SelectProps
  | PasswordProps
  | PhoneProps
  | DatePickerProps
  | RangeProps
  | DefaultInputProps
  | SwitchProps
  | RadioButtonProps
  | DateIntervalPickerProps
  | TagsProps
  | DateTimeProps

const Component = React.forwardRef(
  (props: Props, ref?: React.ForwardedRef<HTMLInputElement>) => {
    switch (props.type) {
      case 'date': {
        return <Date {...props} ref={ref} />
      }
      case 'time': {
        return <Time {...props} ref={ref} />
      }
      case 'checkbox': {
        return <Checkbox {...props} ref={ref} />
      }
      case 'select': {
        return <Select {...props} ref={ref} />
      }
      case 'select-multiple': {
        return <Select {...props} ref={ref} />
      }
      case 'password': {
        return <Password {...props} ref={ref} />
      }
      case 'phone': {
        return <Phone {...props} ref={ref} />
      }
      case 'datepicker': {
        return <DatePicker {...props} ref={ref} />
      }
      case 'range': {
        return <Range {...props} ref={ref} />
      }
      case 'switch': {
        return <Switch {...props} />
      }
      case 'radio': {
        return <RadioButton {...props} />
      }
      case 'date-interval-picker': {
        return <DateIntervalPicker {...props} ref={ref} />
      }
      case 'tags': {
        return <Tags {...props} ref={ref} />
      }
      case 'datetime': {
        return <DateTime {...props} ref={ref} />
      }
      default: {
        return <DefaultInput {...props} ref={ref} />
      }
    }
  },
)

Component.displayName = 'Input'

const Input = Object.assign(Component, {
  useDefaultDateIntervalState: DateIntervalPicker.useDefaultDateIntervalState,
  getPhoneDetails: Phone.getPhoneDetails,
})

export default Input
