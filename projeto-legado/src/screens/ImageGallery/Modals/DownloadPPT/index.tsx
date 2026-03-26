import React, { useCallback, useState } from 'react'

import { MwButton, MwIcon, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Message, Popup } from 'semantic-ui-react'

import { Grid } from '../../../../components/FormFields'
import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'

import { DownloadIMGProps, PayloadData } from './interfaces'
import { extractionTypes, grouping, qualities } from './labels'
import { downloadPPT } from './services'
import * as S from './styles'

const DownloadIMG = ({ ids, setModal, numberOfImages }: DownloadIMGProps) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    extractionType: '',
    quality: '',
    grouping: '',
  })

  const getQualityOptions = useCallback(qualities, [])
  const getExtractionTypeOptions = useCallback(extractionTypes, [])
  const getGroupingOptions = useCallback(grouping, [])

  const onSubmit = async () => {
    setLoading(true)

    const payload: PayloadData = {
      type: 'PPTX',
      options: {
        ids: ids,
        options: {
          type_cover: form.extractionType,
          quality: form.quality,
          grouping: form.grouping,
        },
      },
    }
    try {
      const { success } = await downloadPPT(payload)

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        setModal(null)
      }
    } catch (e) {
      console.log(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      modal={{
        size: 'small',
        title: 'Baixar Apresentação (PPT)',
        titleColor: 'blue',
        content: (
          <>
            <Grid.Row>
              <Grid.Column size={7}>
                <Grid.Row align='center'>
                  <span>
                    <b>Tipo de Extração</b>
                  </span>

                  <Popup
                    on='click'
                    trigger={
                      <MwIcon type='feather' icon='info' color='black' />
                    }
                    content={
                      <S.GroupingPopup>
                        <p>A extração pode apresentar duas visões:</p>
                        <p>
                          - Visão Simples: Apenas uma imagens por slide com
                          informação padrão.
                        </p>
                        <p>
                          - Visão Comparada: Traz duas imagens comparando o
                          antes e o depois.
                        </p>
                      </S.GroupingPopup>
                    }
                    position='right center'
                    className='popup-field'
                    inverted
                    wide
                  />
                </Grid.Row>

                <S.GridRow>
                  <MwInput
                    type='select'
                    placeholder='Selecione'
                    value={form.extractionType}
                    setValue={(value) => {
                      setForm((prev) => ({
                        ...prev,
                        extractionType: value,
                        customSubtitles: [],
                      }))
                    }}
                    loader={getExtractionTypeOptions}
                  />
                </S.GridRow>

                <Grid.Row align='center' itemSpacing={[14, 7]}>
                  <span>
                    <b>Qualidade</b>
                  </span>

                  <Popup
                    on='click'
                    trigger={
                      <MwIcon type='feather' icon='info' color='black' />
                    }
                    content={
                      <S.QualityPopup>
                        <p>
                          A qualidade das imagens em que o download será feito:
                        </p>

                        <ul>
                          <li>Original - 100% da qualidade original</li>
                          <li>Média - 70% da qualidade original</li>
                          <li>Original - 35% da qualidade original</li>
                        </ul>
                      </S.QualityPopup>
                    }
                    position='right center'
                    className='popup-field'
                    inverted
                    wide
                  />
                </Grid.Row>

                <S.GridRow>
                  <MwInput
                    type='select'
                    placeholder='Selecione'
                    value={form.quality}
                    setValue={(value) =>
                      setForm((prev) => ({ ...prev, quality: value }))
                    }
                    loader={getQualityOptions}
                  />
                </S.GridRow>

                <Grid.Row align='center' itemSpacing={[14, 7]}>
                  <span>
                    <b>Agrupamento</b>
                  </span>

                  <Popup
                    on='click'
                    trigger={
                      <MwIcon type='feather' icon='info' color='black' />
                    }
                    content={
                      <S.GroupingPopup>
                        <p>
                          Ao escolher um agrupamento, será gerado um PPT para
                          cada elemento deste agrupamento.
                        </p>
                        <p>
                          Ex.: Se escolher agrupar por Categoria, será criado um
                          PPT para cada Categoria listada.
                        </p>
                      </S.GroupingPopup>
                    }
                    position='right center'
                    className='popup-field'
                    inverted
                    wide
                  />
                </Grid.Row>

                <S.GridRow>
                  <MwInput
                    type='select'
                    placeholder='Selecione'
                    value={form.grouping}
                    setValue={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        grouping: value,
                      }))
                    }
                    loader={getGroupingOptions}
                  />
                </S.GridRow>
              </Grid.Column>

              <Grid.Column size={9}>
                <Message
                  warning
                  header='Notificação'
                  style={{ margin: '26px 31.5px 0 56.5px' }}
                  content='A quantidade máxima por PPT é de 100 slides, após isso haverá quebra para um novo arquivo (PPT). O arquivo ZIP estará disponível no menu Download após o processamento.'
                />
              </Grid.Column>
            </Grid.Row>
          </>
        ),
        actions: [
          <Grid.Row justify='between' align='center'>
            <span>
              <b>{numberOfImages}</b>{' '}
              {numberOfImages > 1
                ? 'imagens selecionadas'
                : 'imagem selecionada'}
            </span>

            <Grid.Row align='center' itemSpacing={[0, 7]}>
              <MwButton
                content='Cancelar'
                appearance='borderless'
                onClick={() => setModal(null)}
              />

              <MwButton
                content='Processar'
                loading={loading}
                size='small'
                disabled={
                  loading ||
                  !form.quality ||
                  !form.extractionType ||
                  !form.grouping
                }
                onClick={() => onSubmit()}
              />
            </Grid.Row>
          </Grid.Row>,
        ],
      }}
    />
  )
}

export default DownloadIMG
