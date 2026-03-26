import { MwInput } from '@mw-kit/mw-ui'
import { Control, Controller } from 'react-hook-form'

export interface TextInputProps {
  name: string
  label?: string
  placeholder?: string
  control: Control<any>
  required?: boolean
  debounceMs?: number
  validateName?: (value: string) => Promise<{ isValid: boolean; message?: string }>
  loading?: boolean
  error?: string | null
  style?: React.CSSProperties
  disabled?: boolean
}

const Text= ({
  name,
  label,
  placeholder,
  control,
  required = false,
  loading = false,
  error,
  style = {},
  disabled = false,
}: TextInputProps) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {

        return (
          <>
            <MwInput
              {...field}
              type="date"
              label={label}
              style={style}
              placeholder={placeholder}
              required={required}
              loading={loading}
              invalid={!!error || fieldState.invalid}
              disabled={disabled}
            />
            {error && <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>}
          </>
        )
      }}
    />
  )
}

export default Text
