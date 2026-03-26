import React, { useEffect, useState } from 'react'

import { MwButton, MwCalendar, MwIcon, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'
import toast from 'react-hot-toast'

import Calendar from '../../../assets/img/svgs/calendar.svg?react'
import ExcelIcon from '../../../assets/img/svgs/ms-excel.svg?react'
import { Grid } from '../../../components/FormFields'
import Modal, { ModalState } from '../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { notEmptyStringOrDefault } from '../../../utils/Formatters'
import { isObject, isValidEmail } from '../../../utils/Validators'
import FormModal from '../Modals/Form'
import HeaderError from '../Modals/HeaderError'
import Meta from '../Modals/Meta'
import Setting from '../Modals/Setting'

import { FormProps, FormStateInterface } from './interfaces'
import { save } from './services'
import * as S from './styles'

const Form = (props: FormProps) => {
  const {
    form: [form, setForm],
  } = props

  const typeOptions = [
    {
      label: 'Modelo Planilha Unificada',
      value: 'G',
      url: 'https://importacaomw.s3.sa-east-1.amazonaws.com/layout_planilha_geral.xlsx',
      onClickSetting: () =>
        setModal(
          <Setting {...{ setModal, setForm, selected: form.settings }} />,
        ),
    },
    {
      label: 'Formulário',
      value: 'F',
      url: 'https://importacaomw.s3.sa-east-1.amazonaws.com/layout_planilha_formulario.xlsx',
      onClickSetting: () =>
        setModal(
          <FormModal
            setModal={setModal}
            setForm={setForm}
            selected={form.settings}
          />,
        ),
    },
    {
      label: 'Ordenação de Produtos',
      value: 'OP',
      url: 'https://importacaomw.s3.sa-east-1.amazonaws.com/layout_planilha_ordenacao.xlsx',
    },
    {
      label: 'Meta Loja Modelo',
      value: 'SC',
      url: 'https://importacaomw.s3.sa-east-1.amazonaws.com/layout_planilha_loja_modelo.xlsx',
      onClickSetting: () =>
        setModal(
          <Meta
            setModal={setModal}
            setForm={setForm}
            selected={form.settings}
          />,
        ),
    },
  ]

  const allowedFormats = ['.xlsx', '.xls']

  const [modal, setModal] = useState<ModalState>(null)
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [validMail, setValidMail] = useState(null)

  const onChangeFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<any> => {
    const { files: inputFiles } = e.target
    if (inputFiles.length < 1) return

    setForm((prev) => {
      const aux = { ...prev }

      aux.file = null

      allowedFormats.forEach((format) => {
        if (inputFiles[0].name.endsWith(format)) {
          aux.file = inputFiles[0]
        }
      })

      return aux
    })
  }

  const onClickFile = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.currentTarget.value = null
  }

  const onSubmit = async () => {
    setLoading(true)

    try {
      let form_data = new FormData()
      form_data.append('type', form.type)
      form_data.append('emails', form.email)
      form_data.append('notbefore', form.dateTime)
      form_data.append('file[file]', form.file)
      form_data.append('params', JSON.stringify(form.settings))

      const { success } = await save(form_data)

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)

        setForm((prev) => ({
          ...prev,
          dateTime: moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          email: '',
          file: null,
          settings: null,
        }))

        props.reload(true)
      }
    } catch (e) {
      if (
        isObject(e['response']) &&
        isObject(e['response'].data) &&
        isObject(e['response'].data.data) &&
        isObject(e['response'].data.data.errors) &&
        isObject(e['response'].data.data.errors.file) &&
        'header' in e['response'].data.data.errors.file
      ) {
        setModal(<HeaderError setModal={setModal} />)
      } else {
        toast(<ToasterContent color='error' />, ErrorStyle)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    if (form && form.email) {
      setValidMail(isValidEmail(form.email))
    }
  }, [form])

  return (
    <S.Container itemSpacing={0}>
      <Grid.Column size={8}>
        <Grid.Row justify='between' align='center'>
          <S.Title>Parâmetros da Importação</S.Title>

          <S.Link
            href={typeOptions.find((e) => e.value === form.type).url}
            download
          >
            <div style={{ cursor: 'pointer' }}>
              <Grid.Row align='center'>
                <MwIcon type='svg' icon={ExcelIcon} width={18} height={18} />

                <span>
                  {typeOptions.find((e) => e.value === form.type).label}
                </span>
              </Grid.Row>
            </div>
          </S.Link>
        </Grid.Row>

        <Grid.Row itemSpacing={0}>
          <span>Defina as configurações e faça upload.</span>
        </Grid.Row>

        <Grid.Row itemSpacing={[7, 35]}>
          <Grid.Column size={5}>
            <MwInput
              width='210px'
              type='select'
              label='Tipo de Importação:'
              placeholder='Selecione'
              value={form.type}
              setValue={(value) => {
                if (notEmptyStringOrDefault(value)) {
                  setForm((prev) => ({
                    ...prev,
                    settings: {},
                  }))

                  setForm((prev) => ({
                    ...prev,
                    type: value as FormStateInterface['type'],
                  }))
                }
              }}
              loader={async () => ({
                options: typeOptions.map(({ label, value }) => ({
                  label,
                  value,
                  data: {},
                })),
                lastPage: true,
              })}
            />
          </Grid.Column>

          <Grid.Column size={11}>
            <Grid.Row>
              <span>Selecione o arquivo:</span>
            </Grid.Row>

            <Grid.Row align='center'>
              <S.FileInput>
                <span>Upload</span>

                <input
                  type='file'
                  name='avatar'
                  accept={allowedFormats.join(',')}
                  onChange={onChangeFile}
                  onClick={onClickFile}
                />
              </S.FileInput>

              <S.FileName>{form.file ? form.file.name : ''}</S.FileName>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>

        {typeOptions.find((e) => e.value === form.type).onClickSetting && (
          <S.Configuration>
            <Grid.Row itemSpacing={7}>
              <span>Parâmetros de Configuração:</span>
            </Grid.Row>

            <Grid.Row itemSpacing={0} align='center'>
              <MwButton
                onClick={
                  typeOptions.find((e) => e.value === form.type).onClickSetting
                }
                content='Configurar'
                color='blue'
                disabled={!form.file}
              />

              <S.ItemConfigurated>
                {form.settings &&
                  Object.keys(form.settings).length > 0 &&
                  `Há ${Object.keys(form.settings).length} ${
                    Object.keys(form.settings).length > 1
                      ? 'itens configurados'
                      : 'item configurado'
                  }.`}
              </S.ItemConfigurated>
            </Grid.Row>
          </S.Configuration>
        )}
      </Grid.Column>

      <Grid.Column size={8}>
        <Grid.Row>
          <S.Title>Destinatário do E-mail:</S.Title>
        </Grid.Row>

        <Grid.Row itemSpacing={0}>
          <span>
            Informe o e-mail que receberá a notificação da importação.
          </span>
        </Grid.Row>

        <Grid.Row itemSpacing={21} align='center' style={{ marginTop: '34px' }}>
          <Grid.Column size={8}>
            <MwInput
              width='400px'
              type='text'
              placeholder='Exemplo: maria@gmail.com'
              value={form.email}
              onBlur={() => setValidMail(isValidEmail(form.email))}
              setValue={(value) => {
                if (validMail) setValidMail(null)
                setForm((prev) => ({ ...prev, email: value }))
              }}
            />
          </Grid.Column>

          <Grid.Column>
            {validMail === false && (
              <S.EmailError>E-mail inválido!</S.EmailError>
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row itemSpacing={7} justify='between' align='bottom'>
          <Grid.Column size={4}>
            <Grid.Row>
              <span>Agendamento:</span>
            </Grid.Row>

            <Grid.Row align='center'>
              <MwInput
                type='text'
                placeholder='--/--/---- --:--'
                readOnly
                value={
                  form.dateTime
                    ? moment(form.dateTime).format('DD/MM/YYYY HH:mm')
                    : form.dateTime
                }
              />

              <div style={{ position: 'relative' }}>
                <MwIcon
                  type='svg'
                  icon={Calendar}
                  onClick={() => setOpenCalendar((prev) => !prev)}
                />

                <MwCalendar
                  type='single'
                  absolute
                  open={openCalendar}
                  time={{}}
                  initialValue={moment(form.dateTime).toDate()}
                  min={moment().toDate()}
                  onSubmit={{
                    onClick: (value) => {
                      setForm((prev) => ({
                        ...prev,
                        dateTime: moment(value).format('YYYY-MM-DD HH:mm:ss'),
                      }))

                      setOpenCalendar(false)
                    },
                  }}
                />
              </div>
            </Grid.Row>
          </Grid.Column>

          <MwButton
            style={{ width: '114px' }}
            content='Enviar'
            loading={loading}
            disabled={
              loading ||
              !validMail ||
              Object.keys(form).filter((e) => !form[e]).length > 0
            }
            onClick={onSubmit}
          />
        </Grid.Row>
      </Grid.Column>

      <Modal modal={modal} />
    </S.Container>
  )
}

export default Form
