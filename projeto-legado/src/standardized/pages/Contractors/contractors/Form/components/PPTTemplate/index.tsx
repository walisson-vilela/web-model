import React, { useCallback, useState } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { PPT_TEMPLATES } from '../../constants'
import useContext from '../../context'
import { Form } from '../../types'

import {
  ColorInput,
  DownloadTemplate,
  ImageInput,
  WarningTemplate,
} from './components'
import ImageOverlay from './components/ImageOverlay'
import * as S from './styles'

const array_move = <T extends unknown[] = unknown[]>(
  arr: T,
  old_index: number,
  new_index: number,
): T => {
  if (new_index < 0 || new_index >= arr.length) throw new Error('Invalid index')
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr
}

const labels: { [key in keyof Form['ppt_templates']]: string } = {
  cover_content: 'Capa',
  cover_information: 'Imagem Única',
  header_place: 'Imagem Dupla',
}

const PPTTemplate = () => {
  const {
    form: { watch, setValue, setValueOptions },
    viewMode,
  } = useContext()

  const [order, setOrder] = useState<(keyof Form['ppt_templates'])[]>([
    'cover_content',
    'cover_information',
    'header_place',
  ])

  const templates = watch('ppt_templates')

  const setTemplates = useCallback(
    (
      value:
        | Form['ppt_templates']
        | React.SetStateAction<Form['ppt_templates']>,
    ) => {
      setValue(
        'ppt_templates',
        typeof value === 'function' ? value(templates) : value,
        setValueOptions,
      )
    },
    [templates],
  )

  const setTemplate = useCallback(
    <K extends keyof Form['ppt_templates']>(
      key: K,
      value:
        | Form['ppt_templates'][K]
        | React.SetStateAction<Form['ppt_templates'][K]>,
    ) => {
      setTemplates((prev) => ({
        ...prev,
        [key]: typeof value === 'function' ? value(prev[key]) : value,
      }))
    },
    [setTemplates],
  )

  const removeTemplate = <K extends keyof Form['ppt_templates']>(key: K) => {
    setTemplate(key, (prev) => {
      const newState = { ...prev }
      delete newState.file
      newState.url = PPT_TEMPLATES[order[0]].url
      return newState
    })
  }

  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's1',
          bottom: 's1',
          right: 's1',
        },
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col spacing='0'>
          <S.Title children='Modelo de Apresentação (Power Point - PPT)' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='4'>
          <ImageOverlay
            viewMode={viewMode}
            disabled={
              templates[order[0]].file === undefined &&
              !templates[order[0]].url.startsWith('http')
            }
            onRemove={() => removeTemplate(order[0])}
            label={labels[order[0]]}
            url={templates[order[0]].url}
          />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <S.ImagesContainer>
            {order.slice(1).map((key, i) => {
              return (
                <ImageOverlay
                  key={key}
                  url={templates[key].url}
                  label={labels[key]}
                  onClick={() =>
                    setOrder((prev) => array_move([...prev], i + 1, 0))
                  }
                />
              )
            })}
          </S.ImagesContainer>
        </MwGrid.Col>

        <MwGrid.Col>
          <S.LabelsContainer>
            <b children={labels[order[0]]} />

            <ColorInput
              viewMode={viewMode}
              onChange={(e) =>
                setTemplate(order[0], (prev) => {
                  const newState = { ...prev }
                  newState.color = e.hex.toUpperCase()
                  return newState
                })
              }
              color={templates[order[0]].color}
            />

            <DownloadTemplate />

            {!viewMode && (
              <React.Fragment>
                <ImageInput
                  onChange={(e) => {
                    if (e.target.files === null) {
                      return
                    }

                    const file = e.target.files[0]
                    setTemplate(order[0], (prev) => ({
                      ...prev,
                      file,
                      name: file.name,
                      url: URL.createObjectURL(file),
                    }))
                  }}
                />

                <WarningTemplate />
              </React.Fragment>
            )}
          </S.LabelsContainer>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default PPTTemplate
