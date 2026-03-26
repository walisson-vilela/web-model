import { useContext, useEffect, useState } from 'react'

import { Modal, MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Tabs from '../../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { contractors } from '../../../../../services/options'
import { SurveysContext } from '../../../context'
import { saveModalChanges } from '../service'

import { SelectComponent } from './SelectComponent'
import { getDetailForms } from './SelectComponent/Relation/service'
import { FormContext } from './context'
import { AddedItemProps, ModalProps } from './interface'
import * as S from './styles'

export const FormModal = ({
  item,
  edit = false,
  createSelected,
  creteSetSelected,
  reload,
}: ModalProps) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  const [activeTab, setActiveTab] = useState<number>(0)
  const [loadEdit, setLoadEdit] = useState<boolean>(false)

  const tabConfig = {
    default: {
      label: 'Default',
      relationTitle: 'Relação de Formulários Padrão',
      associateTitle: 'Formulários Padrão Associados',
      endPoint:
        '/v1/tr/forms/options?default=1&contractor_id=SELF,UNKNOWN,PARENT&with_rules=1',
      filters: [],
      row_id: item?.id,
    },
    personalizado: {
      label: 'Personalizado',
      relationTitle: 'Relação de Formulários Personalizados',
      associateTitle: 'Formulários Personalizados Associados',
      endPoint: '/v1/tr/forms/options?default=0&with_rules=1 ',
      filters: [
        {
          label: 'Conta',
          name: 'contractor_id',
          options: async (value: string, page: number) =>
            await contractors(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
      ],
      row_id: item?.id,
    },
  }

  const tabsOptions = [
    {
      label: 'Default',
      component: <SelectComponent config={tabConfig.default} edit={edit} />,
    },
    {
      label: 'Personalizado',
      component: (
        <SelectComponent config={tabConfig.personalizado} edit={edit} />
      ),
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

  const editSave = async () => {
    setLoadEdit(true)
    const survey_forms = {
      survey_forms: Object.values(selectedItems)
        .filter((element) => element !== null)
        .map((item) =>
          Object.values(item).map((el) =>
            el.map((it) => ({
              form_id: it.id,
              display: it.display,
              first_attendance: it.first_attendance,
              first_attendance_percentage: it.first_attendance_percentage,
              complete_filling_only: it.complete_filling_only === 'S' ? 1 : 0,
            })),
          ),
        )
        .flat(2),
    }

    try {
      await saveModalChanges(item.id, survey_forms)
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
      creteSetSelected((prev) => ({ ...prev, form: selectedItems }))
      setOpenSelectModal(null)
    } else {
      editSave()
    }
  }

  const getSelectedForm = async () => {
    try {
      const { data } = await getDetailForms(item.id)

      data.forms.map((item) => ({ ...item, link_form: '' }))

      setSelectedItems(() => ({
        Default: {
          items: data.forms
            .filter((item) => item.default === 1)
            .map((item) => ({
              ...item,
              form_id: item.id,
              complete_filling_only:
                item.complete_filling_only === true ? 'S' : 'N',
              first_attendance_percentage: Number(
                item.first_attendance_percentage,
              ),
            })),
        },
        Personalizado: {
          items: data.forms
            .filter((item) => item.default === 0)
            .map((item) => ({
              ...item,
              form_id: item.id,
              complete_filling_only:
                item.complete_filling_only === true ? 'S' : 'N',
              first_attendance_percentage: Number(
                item.first_attendance_percentage,
              ),
            })),
        },
      }))
    } catch (error) {
      console.log(error)
      toast(<ToasterContent />, ErrorStyle)
    }
  }

  useEffect(() => {
    if (edit) {
      getSelectedForm()
    }
  }, [])

  return (
    <FormContext.Provider value={{ selectedItems, setSelectedItems }}>
      <Modal size='large' open>
        <S.ModalHeaderText content='Formulário' />
        <Modal.Content key={activeTab}>
          <S.ModalDescriptionText>
            <span>
              Selecione entre os formulários padrão e personalizados para
              adicionar a sua pesquisa
            </span>
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
