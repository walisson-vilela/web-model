import type React from 'react'
import { useCallback, useEffect } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import moment from 'moment'
import type { SubmitHandler } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'semantic-ui-react'

import Modal, { type ModalState } from '../../../../components/MwModal'
import Popup from '../../../components/Popup'

import DayConfigFields from './components/DayConfig'
import { DayTable } from './components/DayTable'
import DefinitionFields from './components/Definition'
import useFormContext, { Provider } from './context'
import type { MainForm } from './interfaces'
import { saveWorkShit } from './services'
import {
  ContentWrapper,
  FooterWrapper,
  FormWrapper,
  LoaderContainer,
} from './style'

type Props = {
  id?: number
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
  loadData: () => Promise<void>
}

const FormModal = ({ setModal, id, loadData: reloadContent }: Props) => {
  const {
    form,
    loading: [loading, setLoading],
    errors: [errors],
    dirtyFields,
    modal: [modal],
    loadData,
  } = useFormContext()

  const { getValues, handleSubmit } = form
  const weekDays = getValues('weekdays')

  const hasInvalidWeekDay = weekDays.some((weekday) => {
    const start = moment(weekday.starts_at, 'HH:mm')
    const end = moment(weekday.ends_at, 'HH:mm')

    const check =
      weekday.intervals.length === 0 && end.diff(start, 'minutes') > 4 * 60

    return check
  })

  const onSubmit: SubmitHandler<MainForm> = useCallback(
    async (values) => {
      setLoading(true)
      try {
        await saveWorkShit(values, id)
        setModal(null)
        reloadContent()
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    },
    [setLoading, id, setModal, reloadContent],
  )

  useEffect(() => {
    loadData(id)
  }, [id, loadData])

  return (
    <Modal.Modal open style={{ width: 1100, maxWidth: '90vw' }}>
      <Modal modal={modal} />
      <Modal.Header color='blue'>Novo Turno</Modal.Header>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body style={{ padding: 0 }}>
          {loading && (
            <LoaderContainer>
              <Loader active />
            </LoaderContainer>
          )}

          <ContentWrapper>
            <DefinitionFields />
            <DayConfigFields />
            <DayTable />
          </ContentWrapper>

          <Toaster position='bottom-right' />
        </Modal.Body>

        <FooterWrapper>
          <MwButton
            style={{ width: 105 }}
            appearance='borderless'
            onClick={() => {
              setModal(null)
            }}
          >
            Cancelar
          </MwButton>
          <Popup
            inverted
            on='click'
            position='left center'
            disabled={!hasInvalidWeekDay}
            trigger={
              <span>
                <MwButton
                  type='submit'
                  style={{ width: 105 }}
                  disabled={
                    loading ||
                    hasInvalidWeekDay ||
                    dirtyFields.length < 1 ||
                    weekDays.length === 0 ||
                    (errors && Object.entries(errors).length > 0)
                  }
                >
                  Salvar
                </MwButton>
              </span>
            }
            content={
              'É obrigatório definir intervalo para jornadas acima de 4 horas.'
            }
          />
        </FooterWrapper>
      </FormWrapper>
    </Modal.Modal>
  )
}

export default function Form({ setModal, id, loadData }: Props) {
  return (
    <Provider>
      <FormModal setModal={setModal} id={id} loadData={loadData} />
    </Provider>
  )
}
