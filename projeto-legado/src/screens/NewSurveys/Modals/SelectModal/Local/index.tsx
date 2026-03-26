import { useContext, useEffect, useState } from 'react'

import { Modal, MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Tabs from '../../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { cities, states, sublocalities } from '../../../../../services/options'
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

export const LocalModal = ({
  edit,
  item,
  createSelected,
  creteSetSelected,
  methods,
  reload,
}: ModalProps) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  const hierarchy_id = methods?.getValues('pilar') || item.hierarchy_id

  const [activeTab, setActiveTab] = useState<number>(0)
  const [loadEdit, setLoadEdit] = useState<boolean>(false)

  const tabConfig: TabConfigProps = {
    'Área de Atuação': {
      row_id: item?.id,
      label: 'Área de Atuação',
      relationTitle: 'Relação de Áreas de Atuação',
      associateTitle: 'Áreas de Atuação Associadas',
      endPoint: `/v1/regions?active=1${
        hierarchy_id !== undefined ? `&hierarchy_id=${hierarchy_id}` : ''
      }`,
      emptyMessage: 'Nenhuma Área de Atuação encontrada',
      linkType: 'region_id',
      filters: [
        {
          label: 'Estado',
          name: 'state_id',
          options: async (value: string, page: number) =>
            await states(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Cidade',
          name: 'city_id',
          options: async (value: string, page: number) =>
            await cities(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Bairro',
          name: 'sublocality_id',
          options: async (value: string, page: number) =>
            await sublocalities(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
      ],
    },
    Estados: {
      row_id: item?.id,
      label: 'Estados',
      relationTitle: 'Relação de Estados',
      associateTitle: 'Estados Associados',
      endPoint: '/v1/region-states?contain=RegionCountries',
      emptyMessage: 'Nenhum Estado encontrado',
      linkType: 'state_id',
      filters: [],
    },
    Cidade: {
      row_id: item?.id,
      label: 'Cidade',
      relationTitle: 'Relação de Cidades',
      associateTitle: 'Cidades Associadas',
      endPoint: '/v1/region-cities?contain=RegionCountries,RegionStates',
      emptyMessage: 'Nenhuma Cidade encontrada',
      linkType: 'city_id',
      filters: [],
    },
    Bairro: {
      row_id: item?.id,
      label: 'Bairro',
      relationTitle: 'Relação de Bairros',
      associateTitle: 'Bairros Associados',
      endPoint:
        '/v1/region-sublocalities?contain=RegionCountries,RegionStates,RegionCities',
      emptyMessage: 'Nenhum Bairro encontrado',
      linkType: 'sublocality_id',
      filters: [],
    },
  }

  const tabsOptions = [
    {
      label: 'Área de Atuação',
      component: <SelectComponent config={tabConfig['Área de Atuação']} />,
    },
    {
      label: 'Estados',
      component: (
        <SelectComponent
          config={tabConfig.Estados}
          hasDescription
          hasShortName
        />
      ),
    },
    {
      label: 'Cidade',
      component: <SelectComponent config={tabConfig.Cidade} hasDescription />,
    },
    {
      label: 'Bairro',
      component: <SelectComponent config={tabConfig.Bairro} hasDescription />,
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
      const regions =
        selectedItems['Área de Atuação'].items !== null
          ? selectedItems['Área de Atuação'].items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const states =
        selectedItems.Estados.items !== null
          ? selectedItems.Estados.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const cities =
        selectedItems.Cidade.items !== null
          ? selectedItems.Cidade.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const sublocalities =
        selectedItems.Bairro.items !== null
          ? selectedItems.Bairro.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const parsed: any = {}

      if (regions !== null) parsed.region_links = regions
      if (states !== null) parsed.state_links = states
      if (cities !== null) parsed.city_links = cities
      if (sublocalities !== null) parsed.sublocality_links = sublocalities

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
      creteSetSelected((prev) => ({ ...prev, local: selectedItems }))
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
        <S.ModalHeaderText content='Local' />
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
