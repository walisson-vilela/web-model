import { useContext, useEffect, useState } from 'react'

import { Modal, MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Tabs from '../../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { notEmptyStringOrDefault } from '../../../../../utils/Formatters'
import { SurveysContext } from '../../../context'
import { saveModalChanges } from '../service'

import { SelectComponent } from './SelectComponent'
import { getLabel } from './SelectComponent/Relation/options'
import { getDetailForms } from './SelectComponent/Relation/service'
import { TabConfigProps } from './SelectComponent/interface'
import { FormContext } from './context'
import { AddedItemProps, ModalProps } from './interface'
import * as S from './styles'

export const ChannelModal = ({
  edit,
  item,
  createSelected,
  creteSetSelected,
  reload,
}: ModalProps) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  const [activeTab, setActiveTab] = useState<number>(0)
  const [loadEdit, setLoadEdit] = useState<boolean>(false)

  const tabConfig: TabConfigProps = {
    Canal: {
      label: 'Canal',
      relationTitle: 'Relação de Canais',
      associateTitle: 'Canais Associados',
      endPoint: '/v1/tr/segments?status=1',
      emptyMessage: 'Nenhum Canal encontrado',
      row_id: item?.id,
      filters: [],
      linkType: 'segment_id',
    },
    Tipologia: {
      label: 'Tipologia',
      relationTitle: 'Relação de Tipologias',
      associateTitle: 'Tipologias Associadas',
      endPoint: '/v1/tr/typologies?active=1&list=1',
      emptyMessage: 'Nenhuma Tipologia encontrada',
      row_id: item?.id,
      filters: [],
      linkType: 'typology_id',
    },
  }

  const tabsOptions = [
    {
      label: 'Canal',
      component: <SelectComponent config={tabConfig.Canal} />,
    },
    {
      label: 'Tipologia',
      component: <SelectComponent config={tabConfig.Tipologia} />,
    },
  ]

  const setTabsAtAddedItem = tabsOptions
    .map((item) => item.label)
    .reduce((accumulator, value) => {
      return { ...accumulator, [value]: { items: [] } }
    }, {})

  const [selectedItems, setSelectedItems] = useState<AddedItemProps>(
    createSelected || (setTabsAtAddedItem as AddedItemProps),
  )

  const onEditSave = async () => {
    setLoadEdit(true)
    try {
      const segment =
        selectedItems.Canal.items !== null
          ? selectedItems.Canal.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const typology =
        selectedItems.Tipologia.items !== null
          ? selectedItems.Tipologia.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const parsed: any = {}

      if (segment !== null) parsed.segment_links = segment
      if (typology !== null) parsed.typology_links = typology
      await saveModalChanges(item.id, parsed)
      reload()
      setOpenSelectModal(null)
    } catch (error) {
      console.log(error)
      toast(<ToasterContent />, ErrorStyle)
    } finally {
      setLoadEdit(false)
    }
  }

  const onClickSave = () => {
    if (!edit) {
      creteSetSelected((prev) => ({ ...prev, channel: selectedItems }))
      setOpenSelectModal(null)
    } else {
      onEditSave()
    }
  }

  const getSelectedForm = async (label: string) => {
    try {
      const { data } = await getDetailForms(item.id, getLabel[label].name)

      setSelectedItems((prev) => {
        return {
          ...prev,
          [label]: {
            items: data[getLabel[label].endPointReturnName].map((item) => ({
              ...item,
              link_type: getLabel[label].payloadName,
            })),
          },
        }
      })
    } catch (error) {
      console.log(error)
      toast(<ToasterContent />, ErrorStyle)
    }
  }

  useEffect(() => {
    if (edit) {
      tabsOptions.map((item) => getSelectedForm(item.label))
    }
  }, [])

  return (
    <FormContext.Provider value={{ selectedItems, setSelectedItems }}>
      <Modal size='large' open>
        <S.ModalHeaderText content='Canal | Tipologia' />
        <Modal.Content key={activeTab}>
          <S.ModalDescriptionText>
            {edit && (
              <>
                <span>
                  Pilar:{' '}
                  <strong>
                    {notEmptyStringOrDefault(item.hierarchy_name, '-')}
                  </strong>
                </span>
                <span>
                  {' '}
                  | Conta:{' '}
                  <strong>
                    {notEmptyStringOrDefault(item.account_name, '-')}
                  </strong>
                </span>
              </>
            )}
          </S.ModalDescriptionText>

          <Tabs
            options={tabsOptions}
            active={{ active: activeTab, setActive: setActiveTab }}
          />
          {tabsOptions[activeTab].component}
        </Modal.Content>
        <Modal.Actions>
          <MwButton
            appearance='borderless'
            content='Cancelar'
            onClick={() => {
              setOpenSelectModal(null)
            }}
          />
          <MwButton
            appearance='solid'
            content='Confirmar'
            onClick={() => {
              onClickSave()
            }}
            loading={loadEdit}
          />
        </Modal.Actions>
      </Modal>
    </FormContext.Provider>
  )
}
