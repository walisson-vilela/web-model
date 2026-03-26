import React, { useCallback, useEffect, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'
import * as MainStyles from '../styled'

import Selector from './Selector'
import { Store } from './interfaces'
import { getInside, getOutside, transferStores } from './services'
import * as S from './styled'

interface StoresManagerProps {
  distribution_center_id: number
  closeModal: Function
  reload: Function
  title?: JSX.Element | string
}

const StoresManager = (props: StoresManagerProps) => {
  const { distribution_center_id, closeModal, reload, title } = { ...props }

  const [final, setFinal] = useState<Store[] | null>(null)

  const [inside, setInside] = useState<Store[]>([])
  const [insideChecked, setInsideChecked] = useState<Store[]>([])
  const [insideLoading, setInsideLoading] = useState<boolean>(false)
  const [insideSearch, setInsideSearch] = useState<string>('')
  const [insidePage, setInsidePage] = useState<number>(1)
  const [insideLastPage, setInsideLastPage] = useState<boolean>(true)

  const [outside, setOutside] = useState<Store[]>([])
  const [outsideChecked, setOutsideChecked] = useState<Store[]>([])
  const [outsideLoading, setOutsideLoading] = useState<boolean>(false)
  const [outsideSearch, setOutsideSearch] = useState<string>('')
  const [outsidePage, setOutsidePage] = useState<number>(1)
  const [outsideLastPage, setOutsideLastPage] = useState<boolean>(true)

  const insideLoader = useCallback(async () => {
    setInsideLoading(true)
    const responseData = await getInside(
      distribution_center_id,
      insideSearch,
      insidePage,
    )

    // setando se a pagina atual e a ultima
    setInsideLastPage(
      !(
        isObject(responseData.pagination) &&
        responseData.pagination.has_next_page === true
      ),
    )
    const data = responseData.data || []
    const parsed = data
      .filter((store: any) => isObject(store.store))
      .map(
        (store: any): Store => ({
          id: numberOrDefault(store.store.id),
          name: notEmptyStringOrDefault(store.store.name),
          formatted_address: notEmptyStringOrDefault(
            store.store.formatted_address,
          ),
          added: false,
          disabled: false,
          checkIcon: false,
        }),
      )

    setFinal((prev) => (prev !== null ? prev : parsed))

    setInside((prev) => {
      const lower = insideSearch.toLowerCase()

      if (insidePage === 1) {
        /**
         * se for a pagina 1, faz o filtro do estado anterior mantendo somente os que tem added === true e
         * correspondem a string de busca, e concatena os resultados da request
         */
        return prev
          .filter(
            (store) =>
              store.added === true &&
              (store.name.toLowerCase().includes(lower) ||
                store.formatted_address.toLowerCase().includes(lower)),
          )
          .concat(parsed)
      }

      /**
       * se a pagina for diferente de 1, faz o filtro do estado anterior, para os que tem added === false ou
       * correspondem a string de busca, concatena os resultados da request com added: false
       */
      return prev
        .filter(
          (store) =>
            store.added === false ||
            store.name.toLowerCase().includes(lower) ||
            store.formatted_address.toLowerCase().includes(lower),
        )
        .concat(parsed)
    })

    setInsideLoading(false)
  }, [insidePage, insideSearch])

  useEffect(() => {
    insideLoader()
  }, [insideLoader])

  const outsideLoader = useCallback(async () => {
    setOutsideLoading(true)
    const responseData = await getOutside(outsideSearch, outsidePage)

    // setando se a pagina atual e a ultima
    setOutsideLastPage(
      !(
        isObject(responseData.pagination) &&
        responseData.pagination.has_next_page === true
      ),
    )

    const data = responseData.data || []
    const parsed = data
      .filter((store: any) => {
        if (
          !Array.isArray(store.distribution_centers_many) ||
          !Array.isArray(store.distribution_centers)
        )
          return false

        return true

        // if (store.distribution_centers_many.length === 0) return true

        // return store.distribution_centers_many.some((item: any) => item.id === distribution_center_id)
      })
      .map((store: any): Store => {
        const data: Store = {
          id: numberOrDefault(store.id),
          name: notEmptyStringOrDefault(store.name),
          formatted_address: notEmptyStringOrDefault(store.formatted_address),
          added: false,
          disabled: false,
          checkIcon: false,
        }

        if (store.distribution_centers_many.length > 0) {
          data.checkIcon = data.disabled = store.distribution_centers_many.some(
            (item: any) => item.id === distribution_center_id,
          )
          // data.message = <React.Fragment>
          //     O PDV está associado a {store.distribution_centers_many.length} {store.distribution_centers_many.length === 1 ? 'Central' : 'Centrais'}
          // </React.Fragment>
        }

        if (store.distribution_centers.length > 0) {
          data.disabled = true
          data.checkIcon = false
          data.message = (
            <React.Fragment>
              O PDV já está associado à central{' '}
              <b>
                {notEmptyStringOrDefault(
                  store.distribution_centers[0].name,
                  '-',
                )}
              </b>
              , logo, não pode ser selecionado
            </React.Fragment>
          )
        }

        return data
      })

    setOutside((prev) => {
      const lower = outsideSearch.toLowerCase()

      if (outsidePage === 1) {
        /**
         * se for a pagina 1, faz o filtro do estado anterior mantendo somente os que tem added === true e
         * correspondem a string de busca, e concatena os resultados da request
         */
        return prev
          .filter(
            (store) =>
              store.added === true &&
              (store.name.toLowerCase().includes(lower) ||
                store.formatted_address.toLowerCase().includes(lower)),
          )
          .concat(parsed)
      }

      /**
       * se a pagina for diferente de 1, faz o filtro do estado anterior, para os que tem added === false ou
       * correspondem a string de busca, concatena os resultados da request com added: false
       */
      return prev
        .filter(
          (store) =>
            store.added === false ||
            store.name.toLowerCase().includes(lower) ||
            store.formatted_address.toLowerCase().includes(lower),
        )
        .concat(parsed)
    })

    setOutsideLoading(false)
  }, [outsidePage, outsideSearch])

  useEffect(() => {
    outsideLoader()
  }, [outsideLoader])

  const onClickAdd = () => {
    setInside((prev) =>
      prev.concat(outsideChecked.map((store) => ({ ...store, added: true }))),
    )
    setFinal((prev) => prev.concat(outsideChecked))
    setOutsideChecked([])
  }

  const onClickRemove = () => {
    const ids = insideChecked.map((store) => store.id)

    const newInside = inside.filter((store) => !ids.includes(store.id))
    setInside(newInside)
    setFinal((prev) => prev.filter((store) => !ids.includes(store.id)))
    setInsideChecked([])
  }

  useEffect(() => {
    if (final === null) return
    const ids = final.map((store) => store.id)
    setOutside((prev) =>
      prev.map((store) => ({ ...store, disabled: ids.includes(store.id) })),
    )
  }, [final])

  const setLoading = (newState: boolean) => {
    setInsideLoading(newState)
    setOutsideLoading(newState)
  }

  const onClickConfirm = async () => {
    if (final === null) {
      console.error('the "final" state is null')
      return
    }

    setLoading(true)

    try {
      const success = await transferStores(
        distribution_center_id,
        final.map((store) => store.id),
      )

      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      closeModal()
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <Modal size='large' open>
        <S.ModalHeader content='Transferir PDVs' />

        <MainStyles.Content>
          {title && <S.Title>{title}</S.Title>}

          <S.Row>
            <S.ColContainer>
              <S.Title>
                <S.BoldText>Relação de PDVs</S.BoldText>
              </S.Title>
              <S.TableContainer>
                <Selector
                  data={outside}
                  checkeds={outsideChecked}
                  setCheckeds={setOutsideChecked}
                  loading={outsideLoading}
                  setSearch={setOutsideSearch}
                  page={outsidePage}
                  setPage={setOutsidePage}
                  lastPage={outsideLastPage}
                />
              </S.TableContainer>
              <S.ButtonContainer>
                <Button
                  type='button'
                  onClick={onClickAdd}
                  content='Adicionar'
                  size='tiny'
                  disabled={outsideChecked.length === 0}
                  className='btn-add'
                />
              </S.ButtonContainer>
            </S.ColContainer>

            <S.ColContainer>
              <S.Title>
                <S.BoldText>PDVs associados</S.BoldText>
              </S.Title>
              <S.TableContainer>
                <Selector
                  data={inside}
                  checkeds={insideChecked}
                  setCheckeds={setInsideChecked}
                  loading={insideLoading}
                  setSearch={setInsideSearch}
                  page={insidePage}
                  setPage={setInsidePage}
                  lastPage={insideLastPage}
                />
              </S.TableContainer>
              <S.ButtonContainer>
                <Button
                  type='button'
                  color='red'
                  onClick={onClickRemove}
                  content='Remover'
                  size='tiny'
                  disabled={insideChecked.length === 0}
                />
              </S.ButtonContainer>
            </S.ColContainer>
          </S.Row>
        </MainStyles.Content>

        <Modal.Actions>
          <Button
            basic
            className='tertiary'
            type='button'
            content='Cancelar'
            onClick={() => closeModal()}
          />
          <Button
            type='button'
            content='Confirmar'
            color='blue'
            disabled={false}
            onClick={onClickConfirm}
            style={{ marginRight: 0 }}
          />
        </Modal.Actions>
      </Modal>
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default StoresManager
