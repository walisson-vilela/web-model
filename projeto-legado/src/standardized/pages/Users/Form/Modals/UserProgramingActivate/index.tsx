import { useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'

import Modal from '../../../../../../components/MwModal'

import * as S from './styled'

interface IUserProgramingActivate {
  onClose: () => void
  onSave: (date: Date | undefined) => Promise<boolean>
}

const UserProgramingActivate: React.FC<IUserProgramingActivate> = (props) => {
  const { onClose, onSave } = props

  const min = moment().startOf('day').add(1, 'days').toDate()

  const max = moment(min).add(3, 'months').endOf('day').toDate()

  const [selectRadius, setSelectRadius] = useState<0 | 1>(0)

  const [dateSelected, setDateSelected] = useState<string>('')

  const [loading, setLoading] = useState(false)

  return (
    <Modal.Modal
      style={{
        width: '600px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
      open
    >
      <Modal.Header color='blue'>Salvar Cadastro</Modal.Header>
      <Modal.Body
        $paddingTop='s3'
        $paddingBottom='s3'
        $gap='s3'
        style={{ boxSizing: 'border-box' }}
      >
        <S.SubTitle>
          Você está prestes a &quot;Ativar&quot; o cadastro do usuário. Em que
          momento gostaria de fazê-lo?
        </S.SubTitle>

        <div>
          <MwInput
            type='radio'
            label='Ativar agora'
            checked={selectRadius === 0}
            onChange={() => setSelectRadius(0)}
          />
        </div>

        <S.RowInputs>
          <MwInput
            type='radio'
            label='Agendar Ativação'
            checked={selectRadius === 1}
            onChange={() => setSelectRadius(1)}
          />

          <MwInput
            value={dateSelected}
            setValue={setDateSelected}
            type='date'
            min={min}
            max={max}
            picker={{
              position: 'left bottom',
              initialMonth: min,
            }}
            disabled={selectRadius === 0}
          />
        </S.RowInputs>

        <S.NotificationContainer>
          <div>Notificação</div>
          <div>
            Sempre que ativar o <b>Usuário</b> irá impactar na fatura da{' '}
            <b>Conta</b>.
          </div>
        </S.NotificationContainer>
      </Modal.Body>
      <Modal.Footer>
        <MwButton appearance='borderless' onClick={() => onClose()}>
          Cancelar
        </MwButton>
        <MwButton
          onClick={async () => {
            setLoading(true)
            const val = moment(dateSelected, 'DD/MM/YYYY', true)
            const success = await onSave(
              val.isValid() ? val.toDate() : undefined,
            )
            if (!success) setLoading(false)
          }}
          loading={loading}
          disabled={
            selectRadius === 1 &&
            !moment(dateSelected, 'DD/MM/YYYY', true).isValid()
          }
        >
          Salvar
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default UserProgramingActivate
