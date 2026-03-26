import { useEffect, useState } from 'react'

import { Controller } from 'react-hook-form'

import EyeIcon from '../../../../../assets/icons/eye.svg?react'
import EyeSlashIcon from '../../../../../assets/icons/eye_slash.svg?react'
import { useLoginContext } from '../../../context'

import * as S from './styled'

const Password = (): JSX.Element => {
  const [eyeOpen, setEyeOpen] = useState(false)

  const {
    method,
    loading: [loading],
  } = useLoginContext()
  const { watch, control } = method
  const password = watch('password')

  useEffect(() => {
    if (!password) {
      setEyeOpen(true)
    }
  }, [])

  const toogleVisibility = () => {
    setEyeOpen(!eyeOpen)
  }

  return (
    <S.Content isDisabled={loading.loadingType}>
      <b>Senha</b>
      <Controller
        name='password'
        control={control}
        render={({ field }) => {
          const onBlur = () => {
            field.onBlur()
          }

          return (
            <S.Container isDisabled={loading.loadingType}>
              <S.Input
                name='password'
                {...field}
                onBlur={onBlur}
                type={eyeOpen ? 'password' : 'text'}
                placeholder={'Senha' || ''}
                disabled={loading.loadingType}
                value={password}
                fluid
              />

              {(() => {
                return eyeOpen ? (
                  <EyeIcon onClick={toogleVisibility} />
                ) : (
                  <EyeSlashIcon onClick={toogleVisibility} />
                )
              })()}
            </S.Container>
          )
        }}
      />
    </S.Content>
  )
}

export default Password
