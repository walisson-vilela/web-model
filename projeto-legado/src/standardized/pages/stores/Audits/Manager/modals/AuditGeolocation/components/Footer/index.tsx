import React, { useCallback, useState } from 'react'

import { MwButton, MwIcon } from '@mw-kit/mw-ui'
import { toast } from 'react-hot-toast'

import { ModalState } from '../../../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import { BodyInterface } from '../../../../interfaces'
import { Values } from '../../types'

import ConfirmRejectionModal from './modals/ConfirmRejectionModal'
import { approveMapping } from './service'
import * as S from './styles'

const Footer = (props: {
  loadData: () => Promise<void>
  index: [number, React.Dispatch<React.SetStateAction<number>>]
  page: [number, React.Dispatch<React.SetStateAction<number>>]
  lastPage: boolean
  length: number
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  audit: BodyInterface
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
  values: Values
}) => {
  const {
    loadData,
    index: [index, setIndex],
    page: [page, setPage],
    lastPage,
    length,
    loading: [loading, setLoading],
    audit,
    values,
    setModal,
  } = props

  const [skipRejectionConfirm, setSkipRejectionConfirm] = useState(false)

  const onAccept = useCallback(async () => {
    setLoading(true)
    try {
      await approveMapping({
        id: audit.id,
        status: true,

        ...((values.lat !== audit.coordinate.lat ||
          values.lng !== audit.coordinate.lng ||
          values.radius !== audit.coordinate.radius) && { coordinate: values }),
      })
      loadData()
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [loadData, audit, values])

  const onConfirmRejection = useCallback(async () => {
    await approveMapping({ id: audit.id, status: false })
    loadData()
  }, [loadData, audit, values])

  const onReject = useCallback(async () => {
    if (skipRejectionConfirm) {
      setLoading(true)
      try {
        onConfirmRejection()
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
        setLoading(false)
      }
    } else {
      setModal(
        <ConfirmRejectionModal
          onConfirm={onConfirmRejection}
          closeModal={() => setModal(null)}
          setSkipRejectionConfirm={setSkipRejectionConfirm}
        />,
      )
    }
  }, [onConfirmRejection, skipRejectionConfirm])

  const goBackward = useCallback(() => {
    if (index < 1) {
      if (page > 1) {
        setPage(page - 1)
        setIndex(-1) // force update index
      }
    } else {
      setIndex(index - 1)
    }
  }, [index, page])

  const goForward = useCallback(() => {
    if (index > length - 2) {
      if (!lastPage) {
        setPage(page + 1)
        setIndex(0)
      }
    } else {
      setIndex(index + 1)
    }
  }, [index, page, length, lastPage])

  return (
    <React.Fragment>
      <S.Button
        type='button'
        appearance='borderless'
        {...(loading || (index < 1 && page < 2)
          ? {
              disabled: true,
            }
          : {
              onClick: goBackward,
            })}
      >
        <MwIcon type='semantic' icon='chevron left' width='6px' height='16px' />
        Voltar
      </S.Button>

      <MwButton
        type='button'
        color='blue'
        children='Aprovar'
        {...(loading
          ? {
              disabled: true,
            }
          : {
              onClick: onAccept,
            })}
      />

      <MwButton
        type='button'
        color='warningRed'
        children='Reprovar'
        {...(loading
          ? {
              disabled: true,
            }
          : {
              onClick: onReject,
            })}
      />

      <S.Button
        type='button'
        appearance='borderless'
        {...(loading || (index > length - 2 && lastPage)
          ? {
              disabled: true,
            }
          : {
              onClick: goForward,
            })}
      >
        Avançar
        <MwIcon
          type='semantic'
          icon='chevron right'
          width='6px'
          height='16px'
        />
      </S.Button>
    </React.Fragment>
  )
}

export default Footer
