import { useCallback, useEffect, useState } from 'react'

import { UseFormReturn } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router'

import Modal, { ModalState } from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { RouteTabContextProps } from '../../../../../../../routes/types'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import { Form, IFormStores } from '../../interfaces'
import { PopupSealQuality } from '../../sections/DocumentData/components'
import { addById } from '../../services'

import Manager from './Manager'
import { getByCoordinate } from './services'
import { PopupSubtitle, Subtitle } from './styles'
import { BodyInterface, LocatedStoresProps } from './types'

const LocatedStoresModal = (props: LocatedStoresProps) => {
  const { onClose, closeTab } = props

  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState<BodyInterface | null>(null)

  const onSubmit = useCallback(async () => {
    if (!checked) return

    setLoading(true)

    try {
      await addById(checked.id)
      closeTab(`/main/stores/home/edit/${checked.id}`)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [checked])

  return (
    <Modal.Modal open>
      <Modal.Header children='PDVs Localizados' color='blue' />

      <Modal.Body>
        <Subtitle>
          <div>
            Foram encontrados PDVs em um Raio de 50m do endereço e número
            digitados.
            <PopupSealQuality position='bottom center'>
              <PopupSubtitle>
                <b>Resultado CEP + Número</b>
              </PopupSubtitle>

              <div>
                - O Resultado da Pesquisa de CEP e Número trará todos os PDVs em
                um raio de 50m
              </div>
            </PopupSealQuality>
          </div>

          <div>
            Verifique se o PDV que esta cadastrando é algum dos abaixo:Verifique
            se o PDV que esta cadastrando é algum dos abaixo:
          </div>
        </Subtitle>

        <Modal.Toolbar.ManagerContainer>
          <Manager {...props} checked={[checked, setChecked]} />
        </Modal.Toolbar.ManagerContainer>
      </Modal.Body>

      <Modal.Footer
        buttonType='MwButton'
        actions={[
          {
            type: 'button',
            appearance: 'borderless',
            children: 'Cancelar',
            onClick: onClose,
          },
          {
            type: 'button',
            children: 'Associar e Salvar',
            onClick: onSubmit,
            disabled: !checked,
            loading: loading,
          },
        ]}
      />
    </Modal.Modal>
  )
}

const useLocatedStoresModal = (props: {
  form: UseFormReturn<Form>
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
  loading: boolean
  mode: IFormStores['mode']
  closeTab: RouteTabContextProps['close']
}) => {
  const { form, setModal, loading, mode, closeTab } = props

  const address_lat = form.watch('address_lat')
  const address_lng = form.watch('address_lng')
  const source_status = form.watch('source_status')

  const routeParams = useParams<{ id: string }>()
  const id = isObject(routeParams)
    ? notEmptyStringOrDefault(routeParams.id)
    : null

  const loadStores = useCallback(async () => {
    // executa somente no modo PDV
    if (mode !== 'stores') {
      return
    }

    // executa somente em cricação
    if (id) {
      return
    }

    // executa somente se o selo for diferente de VALID ou UPDATED
    if (source_status && ['VALID', 'UPDATED'].includes(source_status)) {
      return
    }

    // executa somente se tiver coordenadas do endereço
    if (!address_lat || !address_lng) {
      return
    }

    // executa somente ao finalizar o carregamento do formulario
    if (loading) {
      return
    }

    try {
      const response = await getByCoordinate(
        address_lat,
        address_lng,
        [],
        '',
        null,
        1,
      )

      if (response.data.length < 1) return

      setModal(
        <LocatedStoresModal
          lat={address_lat}
          lng={address_lng}
          {...response}
          onClose={() => setModal(null)}
          closeTab={closeTab}
        />,
      )
    } catch (e) {
      console.error(e)
    }
  }, [source_status, address_lat, address_lng])

  useEffect(() => {
    const id = setTimeout(loadStores, 1000)
    return () => clearTimeout(id)
  }, [loadStores])
}

export default useLocatedStoresModal
