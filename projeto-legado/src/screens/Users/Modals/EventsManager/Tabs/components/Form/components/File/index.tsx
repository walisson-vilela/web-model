import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'
import { UseFormSetValue } from 'react-hook-form'

import { FILE_TYPES } from '../../constants'
import useFormContext from '../../context'
import { FormInterface } from '../../interfaces'

import * as S from './styles'

const name = 'file'

const FileInput = () => {
  const { form } = useFormContext()
  const { setValue, watch, isInvalid, register } = form
  const value = watch(name)

  const classification = watch('classification')

  return (
    <FileInputComponent
      classification={classification}
      setValue={setValue as never}
      input={register(name)}
      value={value}
      invalid={isInvalid(name)}
    />
  )
}

export const FileInputComponent = (props: {
  value: FormInterface['file']
  classification: FormInterface['classification']
  invalid: boolean
  setValue: UseFormSetValue<Pick<FormInterface, 'file'>>
  input: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}) => {
  const { value, classification, setValue, invalid, input } = props

  const disabled = !classification

  return (
    <S.Container>
      <S.Label
        htmlFor={name}
        $invalid={invalid}
        $required={classification?.require_file !== false}
        $disabled={disabled}
      >
        <div>Incluir Anexo</div>
      </S.Label>

      <input
        id={name}
        type='file'
        {...input}
        disabled={disabled}
        onChange={(e) => {
          const files = e.target.files
          setValue(name, files && files.length > 0 ? files[0] : null)
        }}
        accept={FILE_TYPES.join(',')}
        style={{ display: 'none' }}
      />

      {value && (value as File).name && (
        <S.FileName>
          <MwEllipsisContainer>{(value as File).name}</MwEllipsisContainer>

          <MwIcon
            type='feather'
            icon='x'
            onClick={() => setValue(name, null)}
          />
        </S.FileName>
      )}
    </S.Container>
  )
}

export default FileInput
