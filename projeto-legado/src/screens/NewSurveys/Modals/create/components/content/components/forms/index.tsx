import { useContext, useEffect } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { useFormContext } from 'react-hook-form'
import { FaTasks } from 'react-icons/fa'
import { Popup } from 'semantic-ui-react'

import { SurveysContext } from '../../../../../../context'
import { ChannelModal } from '../../../../../SelectModal/Channel'
import { AddedItemProps as AddedChannel } from '../../../../../SelectModal/Channel/interface'
import { FormModal } from '../../../../../SelectModal/Form'
import { AddedItemProps as AddedForm } from '../../../../../SelectModal/Form/interface'
import { LocalModal } from '../../../../../SelectModal/Local'
import { AddedItemProps as AddedLocal } from '../../../../../SelectModal/Local/interface'
import { PDVModal } from '../../../../../SelectModal/PDV'
import { AddedItemProps as AddedPdv } from '../../../../../SelectModal/PDV/interface'
import { ProductModal } from '../../../../../SelectModal/Products'
import { AddedItemProps as AddedProducts } from '../../../../../SelectModal/Products/interface'
import { UserModal } from '../../../../../SelectModal/Users'
import { AddedItemProps as AddedUsers } from '../../../../../SelectModal/Users/interface'
import { CreateSurveyFormData } from '../../../../interface'

import { SelectFormsProps } from './options'
import * as S from './styles'

export interface selectedForm {
  form: AddedForm
  local: AddedLocal
  channel: AddedChannel
  pdv: AddedPdv
  product: AddedProducts
  user: AddedUsers
}

export const SelectForms = ({
  type,
  selectedItems,
  setSelectedItems,
}: SelectFormsProps) => {
  const { setOpenSelectModal } = useContext(SurveysContext)
  const methods = useFormContext<CreateSurveyFormData>()

  const firstAdded =
    selectedItems.form?.Default?.items[0] ||
    selectedItems.form?.Personalizado?.items[0]

  const require_store_rule =
    type !== 'form' &&
    type !== 'product' &&
    type !== 'user' &&
    firstAdded &&
    !firstAdded.require_store

  const products_step_rule =
    type !== 'form' &&
    type !== 'channel' &&
    type !== 'local' &&
    type !== 'user' &&
    type !== 'pdv' &&
    firstAdded &&
    !firstAdded.products_step

  const isDisabled = !methods.watch('pilar')

  const selectForm = {
    form: {
      title: 'Formulários*',
      modal: (
        <FormModal
          createSelected={selectedItems.form}
          creteSetSelected={setSelectedItems}
        />
      ),
      info: null,
    },
    local: {
      title: 'Local',
      modal: (
        <LocalModal
          createSelected={selectedItems.local}
          creteSetSelected={setSelectedItems}
          methods={methods}
        />
      ),
      info: null,
    },
    channel: {
      title: 'Canal | Tipologia',
      modal: (
        <ChannelModal
          createSelected={selectedItems.channel}
          creteSetSelected={setSelectedItems}
        />
      ),
      info: null,
    },
    pdv: {
      title: 'Hierarquia de PDV',
      modal: (
        <PDVModal
          createSelected={selectedItems.pdv}
          creteSetSelected={setSelectedItems}
        />
      ),
      info: 'PDV, Grupo, Rede e Bandeira.',
    },
    product: {
      title: 'Hierarquia de Produtos',
      modal: (
        <ProductModal
          createSelected={selectedItems.product}
          creteSetSelected={setSelectedItems}
        />
      ),
      info: 'Produto, Fabricante, Marca, Categoria, Sub-Categoria e Linha de Produto.',
    },
    user: {
      title: 'Hierarquia de Usuário',
      modal: (
        <UserModal
          createSelected={selectedItems.user}
          creteSetSelected={setSelectedItems}
          methods={methods}
        />
      ),
      info: 'Usuários, Função e Equipe.',
    },
  }

  useEffect(() => {
    require_store_rule &&
      setSelectedItems((prev) => ({
        form: prev.form,
        channel: null,
        local: null,
        pdv: null,
        product: prev.product,
        user: prev.user,
      }))
  }, [require_store_rule])

  useEffect(() => {
    products_step_rule &&
      setSelectedItems((prev) => ({
        form: prev.form,
        channel: prev.channel,
        local: prev.local,
        pdv: prev.pdv,
        product: null,
        user: prev.user,
      }))
  }, [products_step_rule])

  return (
    <S.InputIconContainer>
      <S.Label>
        <span>{selectForm[type].title}</span>
        {selectForm[type].info != null && (
          <Popup
            on='click'
            trigger={<MwIcon type='feather' icon='info' />}
            content={
              <>
                <span>Hierarquia é formada por:</span>
                <p>{selectForm[type].info}</p>
              </>
            }
            position='top center'
            className='popup-field'
            inverted
            wide
          />
        )}
      </S.Label>
      <S.Input
        style={
          isDisabled || require_store_rule || products_step_rule
            ? { opacity: 0.5 }
            : { cursor: 'pointer' }
        }
        onClick={() =>
          !isDisabled &&
          !require_store_rule &&
          !products_step_rule &&
          setOpenSelectModal(selectForm[type].modal)
        }
      >
        <span>
          {!selectedItems[type]
            ? 'Selecione'
            : `Há
              ${
                Object.values(selectedItems[type])
                  .map((i) => i.items)
                  .flat().length
              }
                ${
                  Object.values(selectedItems[type])
                    .map((i) => i.items)
                    .flat().length > 1
                    ? 'Selecionados'
                    : 'Selecionado'
                }
            `}
        </span>
        <FaTasks />
      </S.Input>
    </S.InputIconContainer>
  )
}
