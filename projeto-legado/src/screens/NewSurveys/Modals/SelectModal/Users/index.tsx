import { useContext, useEffect, useState } from 'react'

import { Modal, MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Tabs from '../../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { roles, teams } from '../../../../../services/options'
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

export const UserModal = ({
  edit,
  item,
  createSelected,
  creteSetSelected,
  methods,
  reload,
}: ModalProps) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  const [activeTab, setActiveTab] = useState<number>(0)
  const [loadEdit, setLoadEdit] = useState<boolean>(false)

  const hierarchy_id = methods?.getValues('pilar') || item.hierarchy_id

  const tabConfig: TabConfigProps = {
    Usuário: {
      label: 'Usuário',
      relationTitle: 'Relação de Usuários',
      associateTitle: 'Usuários Associados',
      endPoint: `/v1/tr/peoples?pemanent_inactive=0${
        hierarchy_id !== undefined ? `&hierarchy_id=${hierarchy_id}` : ''
      }`,
      emptyMessage: 'Nenhum Usuário encontrado',
      linkType: 'people_id',
      row_id: item?.id,
      filters: [
        {
          label: 'Função',
          name: 'role_id',
          options: async (value: string, page: number) =>
            await roles(value, page, 'mw-ui', Number(hierarchy_id)),
          allowEmptySearch: true,
        },
        {
          label: 'Equipe',
          name: 'hierarchy_element_id',
          options: async (value: string, page: number) =>
            await teams(value, page, 'mw-ui', Number(hierarchy_id)),
          allowEmptySearch: true,
        },
      ],
    },
    Função: {
      label: 'Função',
      relationTitle: 'Relação de Funções',
      associateTitle: 'Funções Associadas',
      endPoint: `/v1/roles?active=1${
        hierarchy_id !== undefined ? `&hierarchy_id=${hierarchy_id}` : ''
      }`,
      emptyMessage: 'Nenhuma Função encontrada',
      linkType: 'role_id',
      row_id: item?.id,
      filters: [],
    },
    Equipe: {
      label: 'Equipe',
      relationTitle: 'Relação de Equipes',
      associateTitle: 'Equipes Associadas',
      endPoint: `/v1/tr/hierarchy-elements/index${
        hierarchy_id !== undefined ? `?hierarchy_id=${hierarchy_id}` : ''
      }`,
      emptyMessage: 'Nenhuma Equipe encontrada',
      linkType: 'hierarchy_element_id',
      row_id: item?.id,
      filters: [],
    },
  }

  const tabsOptions = [
    {
      label: 'Usuário',
      component: <SelectComponent config={tabConfig.Usuário} hasDescription />,
    },
    {
      label: 'Função',
      component: <SelectComponent config={tabConfig.Função} />,
    },
    {
      label: 'Equipe',
      component: <SelectComponent config={tabConfig.Equipe} />,
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
      const team =
        selectedItems.Equipe.items !== null
          ? selectedItems.Equipe.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const role =
        selectedItems.Função.items !== null
          ? selectedItems.Função.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const user =
        selectedItems.Usuário.items !== null
          ? selectedItems.Usuário.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const parsed: any = {}

      if (team !== null) parsed.hierarchy_element_links = team
      if (role !== null) parsed.role_links = role
      if (user !== null) parsed.people_links = user

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
      creteSetSelected((prev) => ({ ...prev, user: selectedItems }))
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
        <S.ModalHeaderText content='Hierarquia de Usuários' />
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
