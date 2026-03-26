import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import Modal from '../../../../../../../components/MwModal'

export type DistributionTypeValue = 'Substituição' | 'Nova Distribuição'

type DistributionTypeProps = {
  close: () => void
  value: [DistributionTypeValue, React.Dispatch<React.SetStateAction<DistributionTypeValue>>]
  onSave: () => void
}

const DistributionType: React.FC<DistributionTypeProps> = ({ close, value, onSave }) => {
  const [distType, setDistType] = value

  return (
    <Modal.Modal size='small' open style={{ height: '537px' }}>
      <Modal.Header content='Tipo de Distribuição' color='blue' />
      {/* Alinha ao topo e adiciona espaçamento vertical entre os elementos */}
      <Modal.Body style={{ justifyContent: 'flex-start' }} $gap='s4'>
        <p>Selecione aqui o tipo de distribuição.</p>
        <div>
        <label style={{ display: 'block', marginBottom: 8 }}>Selecione o Tipo de Distribuição*</label>
        <Dropdown
          selection
          options={[
            { key: 'Substituição', text: 'Substituição', value: 'Substituição' },
            { key: 'Nova Distribuição', text: 'Nova Distribuição', value: 'Nova Distribuição' },
          ]}
          value={distType}
          onChange={(e, d) => setDistType(d.value as DistributionTypeValue)}
          style={{ width: 260 }}
        />
        </div>
      </Modal.Body>
      <Modal.Footer
        buttonType='SemanticButton'
        actions={[
          <Button key='cancel' content='Cancelar' onClick={close} />,
          <Button key='apply' primary content='Salvar' onClick={onSave} />,
        ]}
      />
    </Modal.Modal>
  )
}

export default DistributionType
