import { useContext, useEffect, useState } from 'react'

import { Modal, MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Tabs from '../../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import {
  brands,
  categories,
  productLine,
  subCategories,
  suppliers,
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

export const ProductModal = ({
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
    Produto: {
      label: 'Produto',
      relationTitle: 'Relação de Produtos',
      associateTitle: 'Produtos Associados',
      endPoint: '/v1/tr/products/options?contain=ProductLine',
      emptyMessage: 'Nenhum Produto encontrado',
      linkType: 'product_id',
      row_id: item?.id,
      filters: [
        {
          label: 'Fabricante',
          name: 'supplier_id',
          options: async (value: string, page: number) =>
            await suppliers(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Marca',
          name: 'brand_id',
          options: async (value: string, page: number) =>
            await brands(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Categoria',
          name: 'category_id',
          options: async (value: string, page: number) =>
            await categories(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Sub-Categoria',
          name: 'subcategory_id',
          options: async (value: string, page: number) =>
            await subCategories(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Linha de Produto',
          name: 'product_line_id',
          options: async (value: string, page: number) =>
            await productLine(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
      ],
    },
    Fabricante: {
      label: 'Fabricante',
      relationTitle: 'Relação de Fabricantes',
      associateTitle: 'Fabricantes Associados',
      endPoint: 'v1/tr/suppliers?status=A',
      emptyMessage: 'Nenhum Fabricante encontrado',
      linkType: 'supplier_id',
      row_id: item?.id,
      filters: [],
    },
    Marca: {
      label: 'Marca',
      relationTitle: 'Relação de Marcas',
      associateTitle: 'Marcas Associadas',
      endPoint: 'v1/tr/brands?status=A',
      emptyMessage: 'Nenhuma Marca encontrada',
      linkType: 'brand_id',
      row_id: item?.id,
      filters: [],
    },
    Categoria: {
      label: 'Categoria',
      relationTitle: 'Relação de Categorias',
      associateTitle: 'Categorias Associadas',
      endPoint: '/v1/tr/categories?level=0&status=1',
      emptyMessage: 'Nenhuma Categoria encontrada',
      linkType: 'category_id',
      row_id: item?.id,
      filters: [],
    },
    'Sub-Categoria': {
      label: 'Sub-Categoria',
      relationTitle: 'Relação de Sub-Categorias',
      associateTitle: 'Sub-Categorias Associadas',
      endPoint: '/v1/tr/categories?level=1&status=A',
      emptyMessage: 'Nenhuma Sub-Categoria encontrada',
      linkType: 'subcategory_id',
      row_id: item?.id,
      filters: [
        {
          label: 'Categoria',
          name: 'parent_id',
          options: async (value: string, page: number) =>
            await categories(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
      ],
    },
    'Linha de Produto': {
      label: 'Linha de Produto',
      relationTitle: 'Relação de Linhas de Produto',
      associateTitle: 'Linhas de Produto Associadas',
      endPoint: '/v1/tr/categories?level=2&status=A',
      emptyMessage: 'Nenhuma Linha de Produto encontrada',
      linkType: 'product_line_id',
      row_id: item?.id,
      filters: [
        {
          label: 'Sub-Categoria',
          name: 'parent_id',
          options: async (value: string, page: number) =>
            await subCategories(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
        {
          label: 'Categoria',
          name: 'grandparent_id',
          options: async (value: string, page: number) =>
            await categories(value, page, 'mw-ui'),
          allowEmptySearch: true,
        },
      ],
    },
  }

  const tabsOptions = [
    {
      label: 'Produto',
      component: <SelectComponent config={tabConfig.Produto} hasProductLine />,
    },
    {
      label: 'Fabricante',
      component: <SelectComponent config={tabConfig.Fabricante} />,
    },
    {
      label: 'Marca',
      component: <SelectComponent config={tabConfig.Marca} />,
    },
    {
      label: 'Categoria',
      component: <SelectComponent config={tabConfig.Categoria} />,
    },
    {
      label: 'Sub-Categoria',
      component: (
        <SelectComponent config={tabConfig['Sub-Categoria']} hasParentLabel />
      ),
    },
    {
      label: 'Linha de Produto',
      component: (
        <SelectComponent
          config={tabConfig['Linha de Produto']}
          hasParentLabel
        />
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

  const onEditSave = async () => {
    setLoadEdit(true)
    try {
      const category =
        selectedItems.Categoria.items !== null
          ? selectedItems.Categoria.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const supplier =
        selectedItems.Fabricante.items !== null
          ? selectedItems.Fabricante.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const productLine =
        selectedItems['Linha de Produto'].items !== null
          ? selectedItems['Linha de Produto'].items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const brand =
        selectedItems.Marca.items !== null
          ? selectedItems.Marca.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const product =
        selectedItems.Produto.items !== null
          ? selectedItems.Produto.items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const subCategory =
        selectedItems['Sub-Categoria'].items !== null
          ? selectedItems['Sub-Categoria'].items.map((it) => ({
              link_type: it.link_type,
              link_id: it.id,
            }))
          : null

      const parsed: any = {}

      if (category !== null) parsed.category_links = category
      if (supplier !== null) parsed.supplier_links = supplier
      if (productLine !== null) parsed.product_line_links = productLine
      if (brand !== null) parsed.brand_links = brand
      if (product !== null) parsed.product_links = product
      if (subCategory !== null) parsed.subcategory_links = subCategory

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
      creteSetSelected((prev) => ({ ...prev, product: selectedItems }))
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
        <S.ModalHeaderText content='Hierarquia de Produto' />
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
