import { useContext, useEffect, useState } from 'react'

import { Modal, MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Tabs from '../../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import {
  chains,
  classifications,
  flags,
  groups,
  segments,
  typologies,
} from '../../../../../services/options'
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

export const PDVModal = ({
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
    PDV: {
      label: 'PDV',
      relationTitle: 'Relação de PDVs',
      associateTitle: 'PDVs Associados',
      endPoint: '/v1/stores?active=1',
      emptyMessage: 'Nenhum PDV encontrado',
      linkType: 'store_id',
      row_id: item?.id,
      filters: [
        {
          label: 'Grupo',
          name: 'market_id',
          options: async (value: string, page: number) =>
            await groups(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Rede',
          name: 'market_chain_id',
          options: async (value: string, page: number) =>
            await chains(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Bandeira',
          name: 'market_flag_id',
          options: async (value: string, page: number) =>
            await flags(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Tipologia',
          name: 'typology_id',
          options: async (value: string, page: number) =>
            await typologies(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Canal',
          name: 'segment_id',
          options: async (value: string, page: number) =>
            await segments(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Classificação',
          name: 'classification_id',
          options: async (value: string, page: number) =>
            await classifications(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'N° Checkout',
          name: 'checkouts',
          options: [
            { label: '1 a 4', value: '1 a 4' },
            { label: '5 a 9', value: '5 a 9' },
            { label: '10 a 19', value: '10 a 19' },
            { label: 'Acima de 20', value: 'Acima de 20' },
          ],
        },
      ],
    },
    Grupo: {
      label: 'Grupo',
      relationTitle: 'Relação de Grupos',
      associateTitle: 'Grupos Associados',
      endPoint: '/v1/markets?active=1',
      emptyMessage: 'Nenhum Grupo encontrado',
      linkType: 'market_id',
      row_id: item?.id,
      filters: [],
    },
    Rede: {
      label: 'Rede',
      relationTitle: 'Relação de Redes',
      associateTitle: 'Redes Associadas',
      endPoint: '/v1/tr/markets/chains?active=1',
      emptyMessage: 'Nenhuma Rede encontrada',
      linkType: 'market_chain_id',
      row_id: item?.id,
      filters: [],
    },
    Bandeira: {
      label: 'Bandeira',
      relationTitle: 'Relação de Bandeiras',
      associateTitle: 'Bandeiras Associadas',
      endPoint: '/v1/tr/markets/flags?active=1',
      emptyMessage: 'Nenhuma Bandeira encontrada',
      linkType: 'market_flag_id',
      row_id: item?.id,
      filters: [],
    },
  }

  const tabsOptions = [
    {
      label: 'PDV',
      component: <SelectComponent config={tabConfig.PDV} hasDetails />,
    },
    {
      label: 'Grupo',
      component: <SelectComponent config={tabConfig.Grupo} />,
    },
    {
      label: 'Rede',
      component: <SelectComponent config={tabConfig.Rede} />,
    },
    {
      label: 'Bandeira',
      component: <SelectComponent config={tabConfig.Bandeira} />,
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
      const flag =
        selectedItems.Bandeira.items !== null
          ? selectedItems.Bandeira.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const group =
        selectedItems.Grupo.items !== null
          ? selectedItems.Grupo.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const pdv =
        selectedItems.PDV.items !== null
          ? selectedItems.PDV.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const network =
        selectedItems.Rede.items !== null
          ? selectedItems.Rede.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const parsed: any = {}

      if (flag !== null) parsed.market_flag_links = flag
      if (group !== null) parsed.market_links = group
      if (pdv !== null) parsed.store_links = pdv
      if (network !== null) parsed.market_chain_links = network

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
      creteSetSelected((prev) => ({ ...prev, pdv: selectedItems }))
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
        <S.ModalHeaderText content='Hierarquia de PDV' />
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
