import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent
} from '../../../../../../components/Toaster'
import { CreateProps, Form } from './interfaces'
import { getDefaultData } from './schemas'
import * as S from './styles'

import { useDispatch } from 'react-redux'

import { deleteEPI } from '../../../../../../redux/actions/EPIWarehouseActions'

const DeleteEPI = ({ close, data, reload }: CreateProps) => {

  const form = useForm<Form>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(data),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const onSubmit = async (formData: Form) => {
    setLoading(true)

    try {
      await dispatch(deleteEPI(data?.id))

      close()
      reload()
      toast(<ToasterContent color="normal" />, SuccessStyle)

    } catch (error) {
      console.error(error)
      toast(<ToasterContent color="error" />, ErrorStyle)
      setLoading(false)
    }
  }

  return (
    <>
      <Modal.Modal
        style={{
          width: '500px',
          height: '234px',
          minHeight: '234px',
          display: 'flex',
        }}
        open
        size="small"
      >
        <Modal.Header color="white" >
          Deletar EPI
        </Modal.Header>

        <Modal.Body
          $paddingBottom="0"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '.9rem',
            paddingLeft: 0,
            paddingTop: '1.2rem',
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <S.TitleContainer>
          <form id="delete" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
             Você está excluindo o EPI <span style={{ fontWeight: 900 }}>{data?.name} {data?.size}</span>.<br />
             Ele se tornará indisponível para distribuição. Essa é uma ação irreversível.<br />
             Deseja realizar esta ação?
             </div>
            </form>
          </S.TitleContainer>
        </Modal.Body>
        <Modal.Footer>
          <MwButton
            content="Cancelar"
            appearance="borderless"
            size="large"
            onClick={close}
          />
          <MwButton
            style={{ width: '8rem', backgroundColor: '#D64550', color: 'white', border: 'none' }}
            type="submit"
            form="delete"
            content="Deletar"
            size="large"

          />
        </Modal.Footer>
      </Modal.Modal>
    </>
  )
}

export default DeleteEPI
