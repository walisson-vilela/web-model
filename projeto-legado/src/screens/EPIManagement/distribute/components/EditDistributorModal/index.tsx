import { useEffect, useMemo, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Button, Dropdown } from 'semantic-ui-react'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { DistributionCardData } from '../../interfaces'
import {
  listDistributionOwners,
  listOwnersHistory,
  updateDistributionOwner,
} from '../../services'
import SummaryCard from './SummaryCard'
import SectionTitle from './SectionTitle'
import HistoryList from './HistoryList'
import {
  AllowText,
  BodyText,
  Column,
  CurrentDistributor,
  Divider,
  HistoryContainer,
  Layout,
  SummaryRow,
  DropdownTrigger,
  DropdownTriggerText,
  DropdownOptions,
  DropdownOption,
  DropdownSearchWrapper,
} from './styles'

type EditDistributorModalProps = {
  close: () => void
  distribution: DistributionCardData
  onSaved?: () => void
}

type DistributorHistoryItem = {
  id: number
  name: string
  startAt: string
  endAt?: string | null
}

const formatBoolean = (value: boolean) => (value ? 'Sim' : 'Não')

const formatDateTime = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('pt-BR')
}

const EditDistributorModal = ({
  close,
  distribution,
  onSaved,
}: EditDistributorModalProps) => {
  const [distributors, setDistributors] = useState<
    { id: number; name: string }[]
  >([])
  const [selectedDistributor, setSelectedDistributor] = useState<{
    id: number
    name: string
  } | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [tempDistributorId, setTempDistributorId] = useState<number | null>(
    null,
  )
  const [history, setHistory] = useState<DistributorHistoryItem[]>([])
  const [historyLoading, setHistoryLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState(false)

  const epiTypesCount = distribution.epiTypesCount
  const totalItems = distribution.totalItems
  const workersCount = distribution.workersCount

  const distributorName = distribution.distributedBy?.name || '-'

  const filteredDistributors = useMemo(() => {
    if (!search.trim()) return distributors
    const normalized = search.trim().toLowerCase()
    return distributors.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.id.toString().includes(normalized),
    )
  }, [search, distributors])

  const handleSave = async () => {
    if (!selectedDistributor) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      return
    }

    try {
      setSaving(true)
      await updateDistributionOwner(distribution.id, selectedDistributor.id)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      onSaved?.()
      close()
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    let mounted = true

    const loadHistory = async () => {
      setHistoryLoading(true)
      try {
        const data = await listOwnersHistory(distribution.id)
        if (mounted) setHistory(data)
      } catch (error) {
        console.error(error)
        if (mounted) setHistory([])
      } finally {
        if (mounted) setHistoryLoading(false)
      }
    }

    const loadDistributors = async () => {
      try {
        const data = await listDistributionOwners()
        if (!mounted) return
        setDistributors(data.map((item) => ({ id: item.id, name: item.name })))
        const current = data.find(
          (item) => item.name === distribution.distributedBy?.name,
        )
        if (current) {
          setSelectedDistributor({ id: current.id, name: current.name })
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadHistory()
    loadDistributors()

    return () => {
      mounted = false
    }
  }, [distribution.distributedBy?.name, distribution.id])

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Editar Distribuidor</Modal.Header>
      <Modal.Body style={{ padding: '16px 24px 24px' }}>
        <BodyText>
          Selecione o responsável pela distribuição dos EPI&apos;s aos colaboradores.
        </BodyText>

        <Layout>
          <Column>
            <SectionTitle>Resumo</SectionTitle>

            <SummaryRow>
              <SummaryCard label="Tipo de EPI's" value={epiTypesCount} />
              <SummaryCard label="EPI's" value={totalItems} />
              <SummaryCard label='Colaboradores' value={workersCount} />
            </SummaryRow>

            <AllowText>
              Permitir Sinalização de Falta de EPI na Entrega:{' '}
              <strong>{formatBoolean(distribution.allowEditEpis)}</strong>
            </AllowText>

            <CurrentDistributor>
              <div style={{ marginBottom: 4 }}>Distribuidor Atual:</div>
              <div style={{ fontWeight: 600 }}>{distributorName}</div>
            </CurrentDistributor>

            <div style={{ fontSize: 13, color: '#111827', marginBottom: 4 }}>
              Selecione o Novo Distribuidor*
            </div>

            <Dropdown
              fluid
              open={dropdownOpen}
              closeOnChange={false}
              closeOnBlur={false}
              closeOnEscape={false}
              icon={null}
              onOpen={() => setDropdownOpen(true)}
              trigger={
                <DropdownTrigger onClick={() => setDropdownOpen((prev) => !prev)}>
                  <DropdownTriggerText $active={Boolean(selectedDistributor)}>
                    {selectedDistributor ? selectedDistributor.name : 'Selecione'}
                  </DropdownTriggerText>
                  <i
                    className='dropdown icon'
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      margin: 0,
                      opacity: 0.6,
                    }}
                  />
                </DropdownTrigger>
              }
            >
              <Dropdown.Menu style={{ width: '100%' }}>
                <DropdownSearchWrapper>
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Pesquisar'
                  />
                </DropdownSearchWrapper>
                <DropdownOptions>
                  {filteredDistributors.map((item) => (
                    <DropdownOption
                      key={item.id}
                      $selected={tempDistributorId === item.id}
                      onClick={() => setTempDistributorId(item.id)}
                    >
                      <input
                        type='radio'
                        checked={tempDistributorId === item.id}
                        onChange={() => setTempDistributorId(item.id)}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ flex: 1 }}>{item.name}</span>
                    </DropdownOption>
                  ))}
                  {filteredDistributors.length === 0 && (
                    <div style={{ padding: 12, opacity: 0.6 }}>
                      Nenhum distribuidor encontrado.
                    </div>
                  )}
                </DropdownOptions>
                <div style={{ padding: 12 }}>
                  <Button
                    primary
                    fluid
                    disabled={tempDistributorId == null}
                    onClick={() => {
                      if (tempDistributorId != null) {
                        const selected = distributors.find(
                          (item) => item.id === tempDistributorId,
                        )
                        if (selected) {
                          setSelectedDistributor(selected)
                          setDropdownOpen(false)
                          setTempDistributorId(null)
                          setSearch('')
                        }
                      }
                    }}
                    content='Aplicar'
                  />
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Column>

          <Divider />

          <Column>
            <SectionTitle variant='small'>Últimos Distribuidores:</SectionTitle>

            <HistoryContainer>
              <HistoryList
                items={history}
                loading={historyLoading}
                formatDateTime={formatDateTime}
              />
            </HistoryContainer>
          </Column>
        </Layout>
      </Modal.Body>
      <Modal.Footer>
        <button
          type='button'
          className='ui button basic tertiary'
          onClick={close}
          disabled={saving}
        >
          Cancelar
        </button>

        <MwButton
          appearance='solid'
          className='primary'
          content='Salvar'
          onClick={handleSave}
          loading={saving}
          disabled={!selectedDistributor || saving}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default EditDistributorModal
