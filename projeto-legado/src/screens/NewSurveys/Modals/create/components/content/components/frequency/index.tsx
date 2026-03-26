import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { BsSliders } from 'react-icons/bs'
import { Popup } from 'semantic-ui-react'

import PopupContent from './components'
import * as S from './styles'

export const FrequencySelector = () => {
  const [openPopup, setOpenPopup] = useState(false)

  const { getValues, watch, setValue } = useFormContext()

  const disabled = ['', 'U', 'M', 'D'].includes(getValues('frequency'))

  useEffect(() => {
    !disabled && setOpenPopup(true)

    const frequencyValue = watch('frequency')
    switch (frequencyValue) {
      case 'S':
      case 'Q':
      case 'M':
      case 'D':
        setValue('frequencyCicle', 1, {
          shouldDirty: true,
          shouldValidate: true,
        })
        break
      case 'U':
        setValue('frequencyCicle', -1, {
          shouldDirty: true,
          shouldValidate: true,
        })
        break
      case 'R':
        setValue('frequencyCicle', null, {
          shouldDirty: true,
          shouldValidate: true,
        })
        break
    }
  }, [watch('frequency')])

  return (
    <S.Container>
      <Popup
        content={
          <div>
            <PopupContent setOpenPopup={setOpenPopup} />
          </div>
        }
        on='click'
        pinned
        position='left center'
        trigger={
          <S.Icon
            isDisable={disabled}
            onClick={() => {
              setOpenPopup(true)
            }}
          >
            <BsSliders />
          </S.Icon>
        }
        open={openPopup}
        onClose={() => {
          watch('frequencyDays').length !== 0 && setOpenPopup(false)
        }}
        disabled={disabled}
      />
    </S.Container>
  )
}
