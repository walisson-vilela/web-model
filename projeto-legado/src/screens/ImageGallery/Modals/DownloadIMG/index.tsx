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

import { DownloadIMGProps } from './interfaces'
import { customSubtitles, extractionTypes, qualities } from './labels'
import { downloadZip } from './services'
import * as S from './styles'

const DownloadIMG = ({ ids, setModal, numberOfImages }: DownloadIMGProps) => {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    quality: '',
    extractionType: '',
    customSubtitles: [],
  })

  const getQualityOptions = useCallback(qualities, [])
  const getExtractionTypeOptions = useCallback(extractionTypes, [])
  const getCustomSubtitleOptions = useCallback(customSubtitles, [])

  const onSubmit = async () => {
    setLoading(true)

    let payload: any = {
      type: 'IMGGLR',
      options: {
        ids: ids,
        quality: form.quality,
        subtitle: {
          xlsx: form.extractionType !== 'S' ? true : false,
          image: form.extractionType !== 'S' ? true : false, // Trás false sem legenda estiver habilitado.
          overlap: form.extractionType !== 'L' ? false : true,
          fields: form.customSubtitles,
        },
      },
    }

    if (form.extractionType === 'S') {
      payload.options.subtitle.fields = []
    }
    if (form.extractionType === 'L') {
      payload.options.subtitle.fields = [
        'datetime',
        'store_name',
        'executor_name',
        'store_id',
        'executor_id',
      ]
    }

    try {
      const { success } = await downloadZip(payload)
      if (success) {
        setModal(null)
        toast(<ToasterContent color='normal' />, SuccessStyle)
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
        title: 'Baixar Imagem (ZIP)',
        titleColor: 'blue',
        content: (
          <>
            <Grid.Row>
              <Grid.Column size={7}>
                <Grid.Row align='center'>
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
                    <b>Tipo de Extração</b>
                  </span>

                  <Popup
                    on='click'
                    trigger={
                      <MwIcon type='feather' icon='info' color='black' />
                    }
                    content={
                      <S.ExtractionTypePopup>
                        <div>
                          <p>Sem Legenda:</p>
                          <p>- Extrai as imagens sem uso de legenda.</p>
                        </div>

                        <div>
                          <p>Legenda Padrão:</p>
                          <p>- Matrícula e Nome do Executor.</p>
                          <p>- Data/Hora, Código e Nome do PDV.</p>
                        </div>

                        <div>
                          <p>Legenda Personalizada:</p>
                          <p>- Exibe informações definidas pelo usuário.</p>
                        </div>
                      </S.ExtractionTypePopup>
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
                    setValue={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        extractionType: value,
                        customSubtitles: [],
                      }))
                    }
                    loader={getExtractionTypeOptions}
                  />
                </S.GridRow>

                <Grid.Row itemSpacing={14}>
                  <MwInput
                    type='select-multiple'
                    label={<b>Informações da Legenda Personalizada</b>}
                    placeholder='Selecione'
                    value={form.customSubtitles}
                    setValue={(value) =>
                      setForm((prev) => ({ ...prev, customSubtitles: value }))
                    }
                    loader={getCustomSubtitleOptions}
                    disabled={form.extractionType !== 'P'}
                  />
                </Grid.Row>
              </Grid.Column>

              <Grid.Column size={9}>
                <Message
                  warning
                  header='Notificação'
                  style={{ margin: '26px 35.5px 0 56.5px' }}
                  content='O arquivo ZIP estará disponível no menu Download após o processamento.'
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
                  (form.extractionType === 'P' &&
                    form.customSubtitles.length < 1)
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
