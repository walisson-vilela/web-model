import React, { useEffect, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Popup, Radio } from 'semantic-ui-react'
import * as yup from 'yup'

import { DropdownHook, InputHook } from '../../../components'
import { Loader } from '../../../components/Loader'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import axios from '../../../services/Axios/instance'

import {
  Container,
  Content,
  Footer,
  Form,
  Header,
  RadioContainer,
  StoreItem,
  SubmitButton,
} from './styles'
import './styles.css'

const formSchema = yup.object({
  id: yup.number().integer().positive(),
  name: yup
    .string()
    .typeError('O nome é obrigatório!')
    .required('O nome é obrigatório!'),
  store_id: yup
    .string()
    .typeError('Selecionar o PDV é obrigatório!')
    .required('Selecionar o PDV é obrigatório!'),
  apportionment: yup
    .string()
    .typeError('Definir a forma de rateio é obrigatório!')
    .required('Definir a forma de rateio é obrigatório!'),
  active: yup.boolean(),
})

interface formType {
  id: number | null
  name: string
  store_id: number
  apportionment: number
  active: boolean
}

export const Create = ({ setOpen, editData, loadData }) => {
  const defaultData: formType = {
    id: (editData && editData.id) || null,
    name: (editData && editData.name) || '',
    store_id: (editData && editData.store_id) || null,
    apportionment:
      editData && editData.apportionment != null
        ? editData.apportionment
        : null,
    active: !editData ? true : !!editData.active ? true : false,
  }

  // TODO: fix validation schema to remove type never
  const resolver = yupResolver(formSchema) as never as Resolver<formType>
  const {
    handleSubmit,
    register,
    control,
    getValues,
    watch,
    formState,
    setValue,
  } = useForm<formType>({
    resolver,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: defaultData,
  })

  const { errors, isDirty, isValid } = formState
  const firstRender = useRef(true)
  const [loading, setLoading] = useState({
    name: false,
    stores: false,
    apportionment: false,
    form: false,
  })

  const apportionmentOptions = [
    { key: 0, value: 0, text: 'Linear' },
    { key: 1, value: 1, text: 'Ponderado por faturamento loja' },
    { key: 2, value: 2, text: 'Não se aplica' },
  ]

  const [storesOptions, setStoresOptions] = useState<any[]>([])
  const [validName, setValidName] = useState<boolean>(
    editData && editData.name ? true : null,
  )
  const [modalTitle, setModalTitle] = useState('')
  const [btnLabel, setBtnLabel] = useState('')
  const [labelName, setLabelName] = useState('')

  const checkName = async (name: string) => {
    setLoading({ ...loading, name: true })

    try {
      if (name) {
        let data = {}

        if (editData && editData.id) data['id'] = editData.id
        data['name'] = name

        const res = await axios.get('/v1/distribution-centers/check-name', {
          params: { ...data },
        })

        setValidName(res.data.success)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading({ ...loading, name: false })
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      setValidName(null)
      const timeoutID = setTimeout(() => checkName(getValues('name')), 1000)
      return () => clearTimeout(timeoutID)
    }
  }, [watch('name')])

  const getStores = async () => {
    setLoading({ ...loading, stores: true })

    try {
      const res = await axios.get(`/v1/stores`, {
        params: {
          contain: 'DistributionCenters,DistributionCentersMany',
          limit: 9999,
        },
      })

      const {
        data: { data },
      } = res

      if (data.length > 0) {
        let options = []
        data.map((store) => {
          if (store.distribution_centers_many.length == 0) {
            options.push({
              key: store.id,
              value: store.id,
              text: `${store.name} (${store.id})` || '-',
              disabled: store.distribution_centers.length > 0,
              content: (
                <Popup
                  inverted
                  pinned
                  className='popup-disable-item-menu'
                  disabled={
                    store.distribution_centers.length > 0 ? false : true
                  }
                  content={
                    <div>
                      <div>Notificação</div>
                      <div>
                        O PDV está unificado a central{' '}
                        <b>
                          {store.distribution_centers &&
                          store.distribution_centers[0]
                            ? store.distribution_centers[0].name
                            : '-'}
                        </b>
                      </div>
                    </div>
                  }
                  position='right center'
                  trigger={
                    <StoreItem>
                      <p>{`${store.name} (${store.id})` || '-'}</p>
                      <p>{store.formatted_address || '-'}</p>
                    </StoreItem>
                  }
                />
              ),
            })
          } else {
            options.push({
              key: store.id,
              value: store.id,
              text: `${store.name} (${store.id})` || '-',
              disabled: true,
              content: (
                <Popup
                  inverted
                  pinned
                  // className="popup-disable-item-menu"
                  content={
                    <div>
                      <div>Notificação</div>
                      <div>
                        O PDV está associado a{' '}
                        {store.distribution_centers_many.length}{' '}
                        {store.distribution_centers_many.length === 1
                          ? 'central'
                          : 'centrais'}
                      </div>
                    </div>
                  }
                  position='right center'
                  trigger={
                    <StoreItem>
                      <p>{`${store.name} (${store.id})` || '-'}</p>
                      <p>{store.formatted_address || '-'}</p>
                    </StoreItem>
                  }
                />
              ),
            })
          }
        })
        setStoresOptions(options)
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading({ ...loading, stores: false })
    }
  }

  useEffect(() => {
    getStores()

    if (editData) {
      register('id')
      setModalTitle('Editar Central de Compra')
      setBtnLabel('Confirmar')
      setLabelName('Nome da Central*')
    } else {
      setModalTitle('Criar Central de Compra')
      setBtnLabel('Confirmar')
      setLabelName('Atribua um nome a Central de Compra*')
    }
  }, [])

  const onSubmit: SubmitHandler<formType> = async (formData: formType) => {
    setLoading({ ...loading, form: true })

    try {
      let res

      if (formData.id) {
        // UPDATE
        res = await axios.put(
          `/v1/distribution-centers/edit/${formData.id}`,
          formData,
        )
      } else {
        // CREATE
        res = await axios.post('/v1/distribution-centers/add', formData)
      }

      if (res.data.success) {
        setOpen(false)
        toast(<ToasterContent color='normal' />, SuccessStyle)
        loadData()
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading({ ...loading, form: false })
    }
  }

  return (
    <Container>
      <Header>{modalTitle}</Header>

      <Content>
        {loading.form ? (
          <Loader />
        ) : (
          <Form
            id='create'
            onSubmit={handleSubmit(onSubmit)}
            loading={loading.form}
            autocomplete='off'
          >
            <Form.Group
              widths='equal'
              style={{ marginBottom: 'auto !important' }}
            >
              <Form.Field
                error={errors.name || validName === false}
                style={{ marginBottom: '0 !important' }}
              >
                <label>{labelName}</label>

                <InputHook
                  name='name'
                  controlHook={control}
                  className='form-field'
                  placeholder='Exemplo: Carrefour Centro-Oeste'
                  loading={loading.name}
                  readonly={loading.name}
                />

                <small>
                  {(() => {
                    if (errors.name) return errors.name.message
                    else if (validName === false)
                      return 'O nome informado já está sendo utilizado.'

                    return <React.Fragment>&nbsp;</React.Fragment>
                  })()}
                </small>
              </Form.Field>

              <Form.Field style={{ marginBottom: '0 !important' }}>
                <RadioContainer>
                  <div>
                    <span>Inativo</span>

                    <Controller
                      name='active'
                      control={control}
                      render={() => {
                        return (
                          <Radio
                            toggle
                            label='Ativo'
                            name='active'
                            checked={getValues('active')}
                            onChange={() =>
                              setValue('active', !getValues('active'), {
                                shouldDirty: true,
                                shouldValidate: true,
                              })
                            }
                          />
                        )
                      }}
                    />
                  </div>
                </RadioContainer>
              </Form.Field>
            </Form.Group>

            <Form.Field
              error={errors.store_id}
              style={{ margin: 'auto 0 !important' }}
            >
              <label>Unifique a central a um PDV*</label>

              <Popup
                inverted
                wide
                className='popup-field'
                disabled={!editData}
                position='right center'
                header='Notificação'
                content='Não é permitido alterar o PDV unificado à Central.'
                trigger={
                  <div className='form-field'>
                    <DropdownHook
                      fluid
                      selection
                      search
                      clearable
                      floating
                      disabled={editData || loading.stores}
                      loading={loading.stores}
                      controlHook={control}
                      selectOnBlur={false}
                      name='store_id'
                      className='form-field'
                      noResultsMessage='Nenhum PDV encontrado'
                      placeholder='Selecione'
                      options={storesOptions}
                    />
                  </div>
                }
              />

              <small>
                {errors.store_id ? (
                  errors.store_id.message
                ) : (
                  <React.Fragment>&nbsp;</React.Fragment>
                )}
              </small>
            </Form.Field>

            <Form.Field
              error={errors.apportionment}
              style={{ margin: 'auto 0 !important' }}
            >
              <label>Defina a forma de rateio do faturamento*</label>

              <div className='form-field'>
                <DropdownHook
                  fluid
                  selection
                  search
                  clearable
                  floating
                  disabled={loading.apportionment}
                  loading={loading.apportionment}
                  controlHook={control}
                  selectOnBlur={false}
                  name='apportionment'
                  className='form-field'
                  noResultsMessage='Nenhum rateio encontrado'
                  placeholder='Selecione'
                  options={apportionmentOptions}
                />
              </div>

              <small>
                {errors.apportionment ? (
                  errors.apportionment.message
                ) : (
                  <React.Fragment>&nbsp;</React.Fragment>
                )}
              </small>
            </Form.Field>
          </Form>
        )}
      </Content>

      <Footer>
        <div>
          <Button
            basic
            className='tertiary'
            type='button'
            content='Cancelar'
            onClick={() => setOpen(false)}
          />

          <SubmitButton
            form='create'
            type='submit'
            color='blue'
            content={btnLabel}
            disabled={
              !isDirty ||
              !isValid ||
              loading.form ||
              loading.name ||
              validName !== true
            }
          />
        </div>
      </Footer>
      <Toaster position='bottom-right' />
    </Container>
  )
}
