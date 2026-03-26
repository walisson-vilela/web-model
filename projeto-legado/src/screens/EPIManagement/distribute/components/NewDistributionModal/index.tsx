import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../components/MwModal'
import * as S from './styles'
import StepOne from './StepOne'

type NewDistributionModalProps = {
  close: () => void
}

const steps = [
  { subtitle: "Selecione aqui os EPI's e os colaboradores da distribuição." },
  { subtitle: 'Configure as regras de entrega e substituição.' },
  { subtitle: 'Revise os dados antes de concluir.' },
]

const NewDistributionModal = ({ close }: NewDistributionModalProps) => {
  const [stepIndex, setStepIndex] = React.useState(0)
  const currentStep = steps[stepIndex]

  const handleCancel = () => {
    close()
    setStepIndex(0)
  }

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
    } else {
      handleCancel()
    }
  }

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Nova Distribuição</Modal.Header>

      <Modal.Body>
        <S.Container>
          <S.HeaderRow>
            <S.Description>{currentStep.subtitle}</S.Description>

            <S.Stepper>
              {steps.map((_, index) => (
                <React.Fragment key={index}>
                  <S.StepCircle $active={index === stepIndex}>
                    {index + 1}
                  </S.StepCircle>
                  {index < steps.length - 1 && <S.StepLine />}
                </React.Fragment>
              ))}
            </S.Stepper>
          </S.HeaderRow>

          {stepIndex === 0 ? (
            <StepOne />
          ) : (
            <S.Columns>
              <S.ColumnCard>
                <S.ColumnHeader>Conteúdo</S.ColumnHeader>
                <S.ColumnContent>
                  <S.PlaceholderContent>
                    Conteúdo da etapa {stepIndex + 1} em desenvolvimento.
                  </S.PlaceholderContent>
                </S.ColumnContent>
              </S.ColumnCard>
            </S.Columns>
          )}
        </S.Container>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          appearance='borderless'
          content='Cancelar'
          onClick={handleCancel}
        />
        <MwButton
          appearance='solid'
          className='primary'
          content='Avançar'
          onClick={handleNext}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default NewDistributionModal
