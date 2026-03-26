import { MwInput } from '@mw-kit/mw-ui'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import useCreateContext from '../../context'
import { Form } from '../../interfaces'
import './styles.css'

interface MinimumValueProps {
  name: keyof Form
  disabledCopy?: boolean
  data?: {
    inventory_count?: number
  }
  onErrorChange?: (hasError: boolean) => void
}

const MinimumValue = ({ name, data, disabledCopy = false, onErrorChange }: MinimumValueProps) => {
  const { form } = useCreateContext()
  const debounceRef = useRef<any>(null)
  const watchedValue = form.watch(name)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      let message = ''

      if (disabledCopy && data?.inventory_count !== undefined) {
        const available = Number(data.inventory_count)
        const currentValue = Number(watchedValue) || 0

        if (currentValue > available) {
          message = `Quantidade excede o estoque (${available} disponíveis).`
        } else if (currentValue < 0) {
          message = 'Digite um valor válido.'
        }
      } else if (!disabledCopy) {
        const currentValue = Number(watchedValue)
        if (isNaN(currentValue) || currentValue < 0) {
          message = 'Digite um valor válido.'
        }
      }

      setErrorMessage(message)
    }, 200)

    return () => clearTimeout(debounceRef.current)
  }, [watchedValue, data, disabledCopy])

  // 🔧 Sempre comunica o estado de erro ao componente pai
  useEffect(() => {
    if (onErrorChange) {
      onErrorChange(!!errorMessage)
    }
  }, [errorMessage, onErrorChange])

  if (disabledCopy) {
    return (
      <div style={{ flex: 1 }}>
        <MwInput
          className={errorMessage ? 'errorInput' : undefined}
          type="number"
          label="Qtde."
          placeholder="Digite aqui"
          style={{
            flex: 1,
            width: '10rem',
            border: errorMessage ? '1px solid #D64550' : undefined,
            color: errorMessage ? '#D64550' : undefined,
            backgroundColor: errorMessage ? '#FDEAEA' : 'white',
          }}
          disabled
          value={watchedValue || ''}
          readOnly
        />
        <div
          style={{
            minHeight: '1rem',
            fontSize: '0.75rem',
            marginTop: '0.25rem',
            color: errorMessage ? '#D64550' : 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          {errorMessage || '.'}
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1 }}>
      <Controller
        name={name}
        control={form.control}
        rules={{ required: true }}
        render={({ field }) => (
          <MwInput
          className={errorMessage ? 'errorInput' : undefined}
          {...field}
          type="number"
          label="Qtde."
          placeholder="Digite aqui"
          style={{
            flex: 1,
            width: '10rem',
            border: errorMessage ? '1px solid #D64550' : undefined,
            color: errorMessage ? '#D64550' : undefined,
            backgroundColor: errorMessage ? '#FDEAEA' : 'white',
          }}
          value={field.value || ''}
          onChange={(e) => {
            const newValue = e.target.value
            field.onChange(newValue)
            const oppositeField = 'quantity_decrease'
            form.setValue(oppositeField as keyof Form, newValue)
          }}
          required
        />

        )}
      />

      <div
        style={{
          minHeight: '1rem',
          fontSize: '0.75rem',
          marginTop: '0.25rem',
          color: errorMessage ? '#D64550' : 'transparent',
          whiteSpace: 'nowrap',
        }}
      >
        {errorMessage || '.'}
      </div>
    </div>
  )
}

export default MinimumValue
