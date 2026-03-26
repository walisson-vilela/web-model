import { useEffect, useRef, useState } from 'react'

import { Loader, Modal, MwButton, Popup } from '@mw-kit/mw-ui'
import moment from 'moment'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ModalState } from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { useEndpointValidation } from '../../../../utils/hooks'

import { CreateByCopy } from './components/CreateByCopy'
import { DataInterface } from './components/CreateByCopy/interface'
import { CreateContent } from './components/content'
import { selectedForm } from './components/content/components/forms'
import { CopyDetailsInterface, CreateSurveyFormData } from './interface'
import { parserCreateSurvey } from './parser'
import { resolver } from './schemas'
import { createNewSurveys, getDetailSurvey } from './service'
import * as S from './styles'

interface ModalProps {
  setOpenCreateModal: React.Dispatch<React.SetStateAction<ModalState>>
  reload: () => void
}

export const CreateModalSurvey = ({
  setOpenCreateModal,
  reload,
}: ModalProps) => {
  const firstRender = useRef(false)
  const methods = useForm<CreateSurveyFormData>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      behavior: 'D',
      frequency: '',
      mandatory: '',
      name: '',
      status: 'A',
      validity: '',
      frequencyCicle: 0,
      frequencyDays: [],
      validityEnd: null,
      validityStart: null,
      pilar: '',
    },
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [loadingCopy, setLoadingCopy] = useState<boolean>(false)

  const [selectedItems, setSelectedItems] = useState<selectedForm>({
    form: null,
    local: null,
    channel: null,
    pdv: null,
    product: null,
    user: null,
  })
  const [copyByItem, setCopyByItem] = useState<DataInterface>()
  const [itemForCopy, setItemForCopy] = useState<CopyDetailsInterface>()
  const [openPopupCopy, setOpenPopupCopy] = useState<boolean>(false)

  const [hasChange, setHasChange] = useState(false)

  const emptyFrequency =
    !['', 'U', 'M', 'D'].includes(methods.watch('frequency')) &&
    methods.watch('frequencyDays') &&
    methods.watch('frequencyDays').length === 0

  const emptyForm =
    selectedItems.form === null ||
    (selectedItems.form &&
      Object.values(selectedItems.form)
        .filter((element) => element !== null)
        .map((item) =>
          Object.values(item).map((element) =>
            element.map((el) => ({
              form_id: el.id,
              display: el.display,
              first_attendance: el.first_attendance,
              first_attendance_percentage: el.first_attendance_percentage,
              complete_filling_only: el.complete_filling_only === 'S' ? 1 : 0,
            })),
          ),
        )
        .flat(2).length === 0)

  const nameCheck = useEndpointValidation<CreateSurveyFormData>({
    endpoint: '/v1/tr/surveys/check-name',

    formKey: 'name',
    formInstance: methods,
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  const onSave = async () => {
    setLoadingSubmit(true)
    try {
      const parsed = parserCreateSurvey(methods.getValues(), selectedItems)
      await createNewSurveys(parsed)
      toast(<ToasterContent color={'normal'} />, SuccessStyle)
      reload()
      setOpenCreateModal(null)
    } catch (error) {
      console.log(error)
      toast(<ToasterContent color={'error'} />, ErrorStyle)
    } finally {
      setLoadingSubmit(false)
    }
  }

  const getCopy = async () => {
    setLoadingCopy(true)

    try {
      const { data } = await getDetailSurvey(copyByItem.id)
      setItemForCopy(data)
    } catch (error) {
      toast(<ToasterContent color={'error'} />, ErrorStyle)
    } finally {
      setLoadingCopy(false)
    }
  }

  const setDefaultValuesCopy = () => {
    if (itemForCopy) {
      const start = moment(itemForCopy.validity_start).format('DD/MM/YYYY')
      const end =
        itemForCopy.validity_end !== null
          ? moment(itemForCopy.validity_end).format()
          : 'indeterminado'
      let convertValidity = ''
      const formatData = start + ' - ' + moment(end).format('DD/MM/YYYY')
      let getFrequencyDays
      let frequencyCycle

      if (itemForCopy && itemForCopy.frequency === 'R') {
        if (itemForCopy.cycle === -1) {
          convertValidity = 'U'
          frequencyCycle = itemForCopy.cycle
        } else if (itemForCopy.cycle === 1) {
          convertValidity = 'D'
          frequencyCycle = itemForCopy.cycle
        } else {
          convertValidity = 'R'
          getFrequencyDays = [itemForCopy.cycle]
        }
      } else {
        convertValidity = itemForCopy.frequency
        getFrequencyDays =
          itemForCopy.frequency_days || itemForCopy.frequency_fortnights
      }

      const reset = {
        name: itemForCopy.name + ' - Cópia',
        frequency: convertValidity,
        frequencyDays: getFrequencyDays,
        pilar: itemForCopy.hierarchy_id,
        behavior: itemForCopy.action,
        mandatory: itemForCopy.type,
        status: itemForCopy.status,
        validity: formatData,
        validityEnd: end,
        validityStart: itemForCopy.validity_start,
        frequencyCicle: frequencyCycle,
      }

      methods.reset(reset)

      const formDefault =
        itemForCopy.forms &&
        itemForCopy.forms.length !== 0 &&
        itemForCopy.forms
          .filter((item) => item.default === 1)
          .map((item) => ({
            ...item,
            form_id: item.id,
            complete_filling_only:
              item.complete_filling_only === true ? 'S' : 'N',
            first_attendance_percentage: Number(
              item.first_attendance_percentage,
            ),
          }))
      const formCustom =
        itemForCopy.forms &&
        itemForCopy.forms.length !== 0 &&
        itemForCopy.forms
          .filter((item) => item.default === 0)
          .map((item) => ({
            ...item,
            form_id: item.id,
            complete_filling_only:
              item.complete_filling_only === true ? 'S' : 'N',
            first_attendance_percentage: Number(
              item.first_attendance_percentage,
            ),
          }))

      setSelectedItems({
        form: {
          Default: { items: formDefault },
          Personalizado: { items: formCustom },
        },
        local: {
          'Área de Atuação': {
            items:
              itemForCopy.regions && itemForCopy.regions.length !== 0
                ? itemForCopy.regions.map((item) => ({
                    ...item,
                    link_type: 'region_id',
                  }))
                : [],
          },
          Estados: {
            items:
              itemForCopy.states && itemForCopy.states.length !== 0
                ? itemForCopy.states.map((item) => ({
                    ...item,
                    link_type: 'state_id',
                  }))
                : [],
          },
          Bairro: {
            items:
              itemForCopy.sublocalities &&
              itemForCopy.sublocalities.length !== 0
                ? itemForCopy.sublocalities.map((item) => ({
                    ...item,
                    link_type: 'sublocality_id',
                  }))
                : [],
          },
          Cidade: {
            items:
              itemForCopy.cities && itemForCopy.cities.length !== 0
                ? itemForCopy.cities.map((item) => ({
                    ...item,
                    link_type: 'city_id',
                  }))
                : [],
          },
        },
        channel: {
          Canal: {
            items:
              itemForCopy.segments && itemForCopy.segments.length !== 0
                ? itemForCopy.segments.map((item) => ({
                    ...item,
                    link_type: 'segment_id',
                  }))
                : [],
          },
          Tipologia: {
            items:
              itemForCopy.typologies && itemForCopy.typologies.length !== 0
                ? itemForCopy.typologies.map((item) => ({
                    ...item,
                    link_type: 'typology_id',
                  }))
                : [],
          },
        },
        pdv: {
          Bandeira: {
            items:
              itemForCopy.market_flags && itemForCopy.market_flags.length !== 0
                ? itemForCopy.market_flags.map((item) => ({
                    ...item,
                    link_type: 'market_flag_id',
                  }))
                : [],
          },
          Grupo: {
            items:
              itemForCopy.market_groups &&
              itemForCopy.market_groups.length !== 0
                ? itemForCopy.market_groups.map((item) => ({
                    ...item,
                    link_type: 'market_id',
                  }))
                : [],
          },
          PDV: {
            items:
              itemForCopy.stores && itemForCopy.stores.length !== 0
                ? itemForCopy.stores.map((item) => ({
                    ...item,
                    link_type: 'store_id',
                  }))
                : [],
          },
          Rede: {
            items:
              itemForCopy.market_chains &&
              itemForCopy.market_chains.length !== 0
                ? itemForCopy.market_chains.map((item) => ({
                    ...item,
                    link_type: 'market_chain_id',
                  }))
                : [],
          },
        },
        product: {
          'Linha de Produto': {
            items:
              itemForCopy.product_lines &&
              itemForCopy.product_lines.length !== 0
                ? itemForCopy.product_lines.map((item) => ({
                    ...item,
                    link_type: 'product_line_id',
                  }))
                : [],
          },
          'Sub-Categoria': {
            items:
              itemForCopy.sub_categories &&
              itemForCopy.sub_categories.length !== 0
                ? itemForCopy.sub_categories.map((item) => ({
                    ...item,
                    link_type: 'subcategory_id',
                  }))
                : [],
          },
          Categoria: {
            items:
              itemForCopy.categories && itemForCopy.categories.length !== 0
                ? itemForCopy.categories.map((item) => ({
                    ...item,
                    link_type: 'category_id',
                  }))
                : [],
          },
          Fabricante: {
            items:
              itemForCopy.suppliers && itemForCopy.suppliers.length !== 0
                ? itemForCopy.suppliers.map((item) => ({
                    ...item,
                    link_type: 'supplier_id',
                  }))
                : [],
          },
          Marca: {
            items:
              itemForCopy.brands && itemForCopy.brands.length !== 0
                ? itemForCopy.brands.map((item) => ({
                    ...item,
                    link_type: 'brand_id',
                  }))
                : [],
          },
          Produto: {
            items:
              itemForCopy.products && itemForCopy.products.length !== 0
                ? itemForCopy.products.map((item) => ({
                    ...item,
                    link_type: 'product_id',
                  }))
                : [],
          },
        },
        user: {
          Equipe: {
            items:
              itemForCopy.hierarchy_elements &&
              itemForCopy.hierarchy_elements.length !== 0
                ? itemForCopy.hierarchy_elements.map((item) => ({
                    ...item,
                    link_type: 'hierarchy_element_id',
                  }))
                : [],
          },
          Função: {
            items:
              itemForCopy.roles && itemForCopy.roles.length !== 0
                ? itemForCopy.roles.map((item) => ({
                    ...item,
                    link_type: 'role_id',
                  }))
                : [],
          },
          Usuário: {
            items:
              itemForCopy.peoples && itemForCopy.peoples.length !== 0
                ? itemForCopy.peoples.map((item) => ({
                    ...item,
                    link_type: 'people_id',
                  }))
                : [],
          },
        },
      })
    }
  }

  useEffect(() => {
    if (copyByItem) {
      getCopy()
    }
  }, [copyByItem])

  useEffect(() => {
    setDefaultValuesCopy()
  }, [itemForCopy])

  useEffect(() => {
    if ((firstRender && methods.formState.dirtyFields.frequency) || hasChange) {
      setHasChange(true)
      methods.setValue('frequencyDays', [])
    } else {
      firstRender.current = true
    }
  }, [methods.watch('frequency')])

  return (
    <FormProvider {...methods}>
      <Modal size='large' open style={{ width: '1130px' }}>
        <Modal.Header>
          <S.HeaderContainer>
            <span>Criar Pesquisa</span>
            <Popup
              content={
                <CreateByCopy
                  setOpenPopupCopy={setOpenPopupCopy}
                  setCopyByItem={setCopyByItem}
                />
              }
              on='click'
              pinned
              position='bottom right'
              style={{ padding: '0px' }}
              trigger={
                <S.CreateBySearchContainer>
                  <a onClick={() => setOpenPopupCopy(true)}>
                    Criar pesquisa por cópia
                  </a>
                </S.CreateBySearchContainer>
              }
              open={openPopupCopy}
              onClose={() => setOpenPopupCopy(false)}
            />
          </S.HeaderContainer>
        </Modal.Header>
        <Modal.Content>
          <form style={{ position: 'relative' }}>
            {loadingCopy && (
              <S.LoaderContainer>
                <Loader active />
              </S.LoaderContainer>
            )}
            <CreateContent
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              nameCheck={nameCheck}
            />
          </form>
        </Modal.Content>
        <Modal.Actions>
          <MwButton
            appearance='borderless'
            content='Cancelar'
            onClick={() => setOpenCreateModal(null)}
          />
          <MwButton
            appearance='solid'
            content='Criar'
            disabled={
              !methods.formState.isValid ||
              Object.keys(methods.formState.errors).length > 0 ||
              emptyFrequency ||
              emptyForm ||
              !nameCheck.isValid ||
              nameCheck.loading ||
              methods.getValues('validityStart') === null ||
              methods.getValues('validityEnd') === null
            }
            onClick={() => {
              onSave()
            }}
            loading={loadingSubmit}
          />
        </Modal.Actions>
      </Modal>
    </FormProvider>
  )
}
