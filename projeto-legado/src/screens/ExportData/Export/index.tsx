import React, { useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Button, Popup } from 'semantic-ui-react'

import { InputChips } from '../../../components/InputChips'
import MwModal, { ModalState } from '../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import { isValidEmail } from '../../../utils/Validators'
import useExportDataContext from '../../ExportData/provider'
import ConfigurationParams from '../Export/Modal'
import { createProcesses as request } from '../Manager/services'
import * as S from '../styles'

interface ExportProps {
  handleLoadData: () => void
}

const Export = (props: ExportProps): JSX.Element => {
  const { handleLoadData } = props

  const {
    modalState: [modal, setModal],
    selectedItems: [selectedItems, setSelectedItems],
    type: [type, setType],
    emails: [emails, setEmails],
  } = useExportDataContext()
  // estado responsável por verificar se o email possui erro
  const [haveEmailErrors, setHaveEmailErrors] = useState<boolean>(true)
  // estado responsável por controlar o modal de confirmação
  const [confirmModal, setConfirmModal] = useState<ModalState | null>(null)
  // estado responsável por controlar a mensagem ao clicar no botão de gerar
  const [message, setMessage] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const options = [
    {
      key: 'Modelo Planillha Unificada',
      text: 'Modelo Planillha Unificada',
      value: 'PG',
      onClick: () => setType('PG'),
    },

    {
      key: 'Formulário',
      text: 'Formulário',
      value: 'F',
      onClick: () => setType('F'),
    },
    {
      key: 'Ordernação de Produtos',
      text: 'Ordernação de Produtos',
      value: 'OP',
      onClick: () => setType('OP'),
    },
  ]

  useEffect(() => {
    let haveErrors: boolean = false

    for (const email of emails) {
      if (!isValidEmail(email)) {
        haveErrors = true
        break
      }
    }
    setHaveEmailErrors(haveErrors)
  }, [emails])

  const validateTypeForOP = () => {
    if ((type === 'F' || type === 'OP') && emails.length <= 0) {
      setMessage('Informe pelo o menos um e-mail para notificação')
    }
  }

  const validatePGWithNoEmailsAndNoItensSelected = () => {
    if (
      type === 'PG' &&
      Object.keys(selectedItems).length <= 0 &&
      emails.length <= 0
    ) {
      setMessage(
        'Para prosseguir com a extração do arquivo é necessario estabelecer os parametros de configuração e informar pelo menos um e-mail de notificação.',
      )
    }
  }

  const validatePGWithSelectedItemsAndNoEmails = () => {
    if (
      type === 'PG' &&
      Object.keys(selectedItems).length > 0 &&
      emails.length <= 0
    ) {
      setMessage('Informe pelo o menos um e-mail para notificação')
    }
  }
  const validatePgWithNoSelectedItensWithInvalidEmails = () => {
    if (
      type === 'PG' &&
      Object.keys(selectedItems).length <= 0 &&
      emails.length > 0 &&
      !haveEmailErrors
    ) {
      setMessage(
        'Para prosseguir com a extração é necessário estabelecer os parametros de configuração.',
      )
    }
  }

  const firstValidation = () => {
    if (
      type === '' &&
      Object.keys(selectedItems).length <= 0 &&
      message === null &&
      emails.length <= 0
    ) {
      setMessage(
        'Para prosseguir com a extração do arquivo é necessario estabelecer os parametros de configuração e informar pelo menos um e-mail de notificação.',
      )
    }
  }

  const validateValidEmailsAndNoTypeProvided = () => {
    if (emails.length > 0 && !haveEmailErrors && type !== '') {
      setMessage(
        'Para prosseguir com a extração é necessário estabelecer o tipo de extração.',
      )
    }
  }
  useEffect(() => {
    validateTypeForOP()
    validatePGWithNoEmailsAndNoItensSelected()
    validatePGWithSelectedItemsAndNoEmails()
    validatePgWithNoSelectedItensWithInvalidEmails()
    firstValidation()
    validateValidEmailsAndNoTypeProvided()
  }, [Object.keys(selectedItems), emails, type, haveEmailErrors])

  const handleConfirmation = async () => {
    setLoading(true)
    const params: any = {}
    const havePdv = Object.keys(selectedItems).find((item) => item === 'LOJAS')
    if (havePdv) {
      params.abas = Object.keys(selectedItems).join(',')
      params.situacao_loja = selectedItems['LOJAS'].status
    } else {
      params.abas = Object.keys(selectedItems).join(',')
    }

    const data: any = {}
    switch (type) {
      case 'F': {
        ;(data.type = type), (data.emails = [...emails]), (data.params = {})
        break
      }
      case 'OP': {
        ;(data.type = type), (data.emails = [...emails]), (data.params = {})
        break
      }

      case 'PG': {
        ;(data.type = type), (data.emails = [...emails])
        data.params = params
      }
    }

    try {
      await request(data)
      setEmails([])
      setSelectedItems({})
      showConfirmModal()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }
  const showConfirmModal = () => {
    setConfirmModal({
      title: `Confirmação!`,
      size: 'small',
      content: (
        <React.Fragment>
          <S.ModalDescription>
            {' '}
            Sua Solicitação foi gerada com sucesso.
          </S.ModalDescription>
          <S.ModalText>
            Como esse processo poderá levar alguns minutos do processamento até
            a liberação do download, você receberá um e-mail de notifcação.
          </S.ModalText>
        </React.Fragment>
      ),
      actions: [
        {
          type: 'button',
          content: 'Compreendi',
          color: 'blue',
          onClick: () => {
            handleLoadData()
            setConfirmModal(null)
          },
        },
      ],
    })
  }

  return (
    <>
      <S.SubSection>
        <S.LeftContent>
          <S.Title>Parâmetros de Extração</S.Title>
          <S.Text>
            Defina os tipos de extração em XLS e realize as configurações.
          </S.Text>

          <S.Item>
            <MwInput
              type='select'
              label='Tipo de Extração'
              placeholder='Selecione'
              value={type}
              setValue={(value) => {
                setType(value)
              }}
              loader={async () => ({
                options: options.map(({ text, value }) => ({
                  label: text,
                  value,
                  data: {},
                })),
                lastPage: true,
              })}
            />
          </S.Item>

          <S.Content visible={type === 'PG' ? 1 : 0}>
            <S.ParametersText>Definir Parâmetros</S.ParametersText>
            <S.Parameters>
              <Button
                primary
                content={'Configurar'}
                onClick={() => setModal(<ConfigurationParams />)}
              />
              <S.ConfigurationText
                style={{ color: '#9398A2', marginLeft: 8, display: 'block' }}
              >
                {Object.keys(selectedItems).length > 0
                  ? `Há ${Object.keys(selectedItems).length} ite${
                      Object.keys(selectedItems).length > 1 ? 'ns' : 'm'
                    } configurad${
                      Object.keys(selectedItems).length > 1 ? 'os' : 'o'
                    }.`
                  : `Não há configurações estabelecidas até momento`}
              </S.ConfigurationText>
            </S.Parameters>
          </S.Content>
        </S.LeftContent>

        <S.RightContent>
          <S.Title>Destinatário do E-mail</S.Title>
          <S.Text>
            Informe o(s) e-mail(s) que irá receber a notificação quando o
            disponível o download
          </S.Text>

          <S.Divider>
            <S.EmailInputsContainer>
              <InputChips
                value={{
                  value: emails,
                  setValue: setEmails,
                }}
                placeholder='Exemplo:mari@gmail.com'
                chipError={(value) => !isValidEmail(value)}
              />
            </S.EmailInputsContainer>

            <Popup
              on='click'
              content={message}
              inverted
              position='left center'
              className='popup-field'
              disabled={
                (emails.length > 0 &&
                  (type === 'PG' || type === 'OP' || type === 'F')) ||
                (emails.length < 0 &&
                  (type === 'PG' || type === 'OP' || type === 'F'))
              }
              trigger={
                <S.ButtonContainer>
                  <Button
                    primary
                    type='button'
                    content='Gerar'
                    loading={loading}
                    disabled={
                      ((emails.length > 0 || haveEmailErrors) && type === '') ||
                      !(
                        type === 'OP' ||
                        type === 'F' ||
                        (type === 'PG' &&
                          !haveEmailErrors &&
                          emails.length > 0 &&
                          Object.keys(selectedItems).length > 0)
                      ) ||
                      emails.length <= 0 ||
                      haveEmailErrors
                    }
                    onClick={handleConfirmation}
                  />
                </S.ButtonContainer>
              }
            />
          </S.Divider>
        </S.RightContent>
      </S.SubSection>

      <MwModal modal={confirmModal} />

      <MwModal modal={modal} />
    </>
  )
}

export default Export
