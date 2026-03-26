import React, { useRef } from 'react'

import { MwButton, MwGrid } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'
import { Popup } from 'semantic-ui-react'

import { ModalState } from '../../../../../components/MwModal'
import { useHookFormsAsState } from '../../../../../utils/hooks'
import useContext from '../../context'

import * as Components from './components'
import * as S from './styles'

const Planogram = (props: {
  setModal: React.Dispatch<React.SetStateAction<ModalState | null>>
}) => {
  const { setModal } = props
  const { setValueOptions, form } = useContext()

  const fileInput = useRef<HTMLInputElement | null>(null)

  const [files, setFiles] = useHookFormsAsState('files', {
    ...form,
    setValueOptions,
  })

  const onAdd = (file: File) =>
    setFiles((prev) => (prev.length > 3 ? prev : [...prev, file]))

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target
    if (files.length < 1) return

    if (files[0].size <= Math.pow(1024, 2)) {
      onAdd(files[0])
      return
    }

    setModal({
      title: 'Tamanho excedido',
      content: 'A imagem selecionada excete o limite máximo de tamanho (1 MB).',
      buttonType: 'MwButton',
      actions: [
        {
          type: 'button',
          onClick: () => setModal(null),
          children: 'OK',
        },
      ],
    })
  }

  const onRemove = (index: number) =>
    setFiles((prev) => {
      if (!prev[index]) return prev

      const files = [...prev]
      files.splice(index, 1)
      return files
    })

  const onClickLoad = () => {
    fileInput && fileInput.current && fileInput.current.click()
  }

  return (
    <MwGrid
      borderless
      spacing='s4'
      rows={{
        spacing: { left: '0', right: '0' },
        borderless: true,
        horizontalAlign: 'between',
        verticalAlign: 'center',
      }}
      cols={{ spacing: '0' }}
    >
      <MwGrid.Row>
        <MwGrid.Col width='auto'>
          <S.Title>Galeria de Imagens</S.Title>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row spacing={{ left: '0', right: '0', bottom: 's3', top: 's3' }}>
        <MwGrid.Col>
          <MwGrid
            borderless
            rows={{ spacing: '0' }}
            cols={{ spacing: { top: '0', bottom: '0', right: '0' } }}
          >
            <MwGrid.Row>
              <MwGrid.Col width='4'>
                <Components.ImageOverlay
                  file={files[0]}
                  onRemove={() => onRemove(0)}
                  height='314px'
                />
              </MwGrid.Col>

              <MwGrid.Col width='2'>
                <MwGrid
                  borderless
                  rows={{ spacing: '0', borderless: true }}
                  cols={{ spacing: { top: '0', bottom: '0' } }}
                  style={{ gap: '7px' }}
                >
                  <MwGrid.Row verticalAlign='top'>
                    <MwGrid.Col style={{ height: '100%' }}>
                      <Components.ImageOverlay
                        file={files[1]}
                        onRemove={() => onRemove(1)}
                      />
                    </MwGrid.Col>
                  </MwGrid.Row>

                  <MwGrid.Row verticalAlign='center'>
                    <MwGrid.Col style={{ height: '100%' }}>
                      <Components.ImageOverlay
                        file={files[2]}
                        onRemove={() => onRemove(2)}
                      />
                    </MwGrid.Col>
                  </MwGrid.Row>

                  <MwGrid.Row verticalAlign='bottom'>
                    <MwGrid.Col style={{ height: '100%' }}>
                      <Components.ImageOverlay
                        file={files[3]}
                        onRemove={() => onRemove(3)}
                      />
                    </MwGrid.Col>
                  </MwGrid.Row>
                </MwGrid>
              </MwGrid.Col>
            </MwGrid.Row>
          </MwGrid>
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <MwGrid
            borderless
            rows={{ spacing: '0', verticalAlign: 'center' }}
            cols={{
              spacing: { top: '0', bottom: '0', left: 's3', right: 's3' },
            }}
          >
            <MwGrid.Row>
              <MwGrid.Col>
                <S.Description>
                  <p>Quantidade máxima de imagens: 4 arquivos</p>
                  <p>Tamanho máximo por arquivo: 1 MB</p>
                </S.Description>
              </MwGrid.Col>

              <MwGrid.Col width='auto'>
                <Controller
                  name='files'
                  control={form.control}
                  render={({ field: props }) => (
                    <input
                      {...props}
                      ref={fileInput}
                      type='file'
                      accept='image/*'
                      disabled={files.length > 3}
                      onChange={onChange}
                      style={{ display: 'none' }}
                      value=''
                    />
                  )}
                />

                <Popup
                  wide
                  on='hover'
                  inverted
                  position='top right'
                  className='popup-field'
                  disabled={files.length <= 3}
                  trigger={
                    <div>
                      <MwButton
                        type='button'
                        content='Escolher Arquivo'
                        appearance='bordered'
                        onClick={onClickLoad}
                        disabled={files.length > 3}
                      />
                    </div>
                  }
                  content={
                    <>
                      <p style={{ margin: 0 }}>
                        O limite de imagens foi atingido.
                      </p>
                      <p style={{ margin: 0 }}>
                        Exclua alguma imagem para realizar um upload.
                      </p>
                    </>
                  }
                />
              </MwGrid.Col>
            </MwGrid.Row>
          </MwGrid>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Planogram
