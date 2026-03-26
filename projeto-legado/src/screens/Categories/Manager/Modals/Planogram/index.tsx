import React, { useCallback, useState } from 'react'

import {
  MwButton,
  MwGrid,
  MwInput,
  MwScrollContainer,
  MwTextArea,
} from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { asyncFileToBase64 } from '../../../../../utils/FileFormatter'
import { isNumber } from '../../../../../utils/Validators'

import * as Modals from './Modals'
import { PlanogramProps, PlanogramRegistries } from './interfaces'
import { submit } from './services'
import * as S from './styles'

const Planogram = ({ setOpen, planogramData, loadData }: PlanogramProps) => {
  const getActualPlanograms = (): PlanogramRegistries[] => {
    return planogramData.planograms
      ? planogramData.planograms.map((e) => {
          return {
            id: e.id,
            base64: e.file.url,
            subject: e.title,
            description: e.comment,
          }
        })
      : []
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<PlanogramRegistries[]>(
    getActualPlanograms(),
  )

  const [inputRef, setInputRef] = useState<HTMLInputElement>(null)
  const [updatingImageIndex, setUpdatingImageIndex] = useState<number>(null)

  const onChangeFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<any> => {
    const { files: inputFiles } = e.target
    if (inputFiles.length < 1) return

    if (inputFiles[0].size > 1048576) {
      setOpen(<Modals.Confirmation setOpen={() => setOpen(null)} />)

      return
    }

    const base64 = await asyncFileToBase64(inputFiles[0])

    setFiles((prev) => {
      const aux = [...prev]

      if (isNumber(updatingImageIndex)) {
        aux[updatingImageIndex] = {
          ...aux[updatingImageIndex],
          image: inputFiles[0],
          base64: base64,
          id: undefined,
        }

        setUpdatingImageIndex(null)
      } else {
        aux.push({
          image: inputFiles[0],
          base64: base64,
          subject: '',
          description: '',
        })
      }

      return aux
    })
  }

  const onClickUpdate = () => {
    if (!inputRef) return

    inputRef.click()
  }

  const onClickFile = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.currentTarget.value = null
  }

  const onSubmit = useCallback(async () => {
    setLoading(true)

    try {
      await submit(files, planogramData.id)

      toast(<ToasterContent color='normal' />, SuccessStyle)
      loadData()
      setOpen(null)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [files, planogramData.id])

  return (
    <Modal.Modal
      open
      size='large'
      style={{
        height: '600px',
        width: '1095px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Adicionar Planograma</Modal.Header>

      <Modal.Body $paddingTop='0'>
        <MwGrid borderless>
          <MwGrid.Row borderless spacing={{ bottom: '0', left: '0' }}>
            <MwGrid.Col>
              <S.TitleContainer>
                <S.Title>Planograma</S.Title>

                <S.Subtitle>
                  Faça upload das suas imagens para o Planograma.
                </S.Subtitle>
              </S.TitleContainer>
            </MwGrid.Col>
          </MwGrid.Row>

          <MwGrid.Row borderless>
            <MwGrid.Col>
              <S.FileInput disabled={files.length >= 4}>
                <span>Upload da Imagem</span>

                <input
                  type='file'
                  name='avatar'
                  accept='image/*'
                  ref={setInputRef}
                  onChange={onChangeFile}
                  onClick={onClickFile}
                />
              </S.FileInput>
              <S.FileLimits>
                <p>Quantidade máxima: 4 Imagens</p>
                <p>Tamanho máximo: 1 MB.</p>
              </S.FileLimits>
            </MwGrid.Col>
          </MwGrid.Row>
        </MwGrid>

        <MwScrollContainer loading={loading}>
          <MwGrid borderless spacing={{ top: 's3' }}>
            {files.map((file, index) => (
              <MwGrid.Row key={index} spacing={{ bottom: 's5', top: 's5' }}>
                <MwGrid.Col width='auto'>
                  <S.ImageContainer src={file.base64} />
                </MwGrid.Col>

                <MwGrid.Col spacing={{ left: 's3' }}>
                  <S.InputsContainer>
                    <div>
                      <MwInput
                        label='Assunto'
                        placeholder='Assunto'
                        type='text'
                        value={file.subject}
                        onChange={(data) =>
                          setFiles((prev) => {
                            const aux = [...prev]

                            aux[index].subject = data.target.value

                            return aux
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label>
                        <div>Descrição *</div>

                        <MwTextArea
                          height='128px'
                          width='100%'
                          placeholder='Descrição'
                          value={file.description}
                          onChange={(data) =>
                            setFiles((prev) => {
                              const aux = [...prev]

                              aux[index].description = data.target
                                .value as string

                              return aux
                            })
                          }
                        />
                      </label>
                    </div>
                  </S.InputsContainer>
                </MwGrid.Col>

                <MwGrid.Col spacing={{ left: 's3' }}>
                  <S.ActionsContainer>
                    <MwButton
                      type='button'
                      content='Remover'
                      size='tiny'
                      color='red'
                      onClick={() =>
                        setFiles((prev) => {
                          const aux = [...prev]

                          aux.splice(index, 1)

                          return aux
                        })
                      }
                    />

                    <MwButton
                      type='button'
                      content='Alterar Imagem'
                      size='tiny'
                      color='blue'
                      onClick={() => {
                        setUpdatingImageIndex(index)
                        onClickUpdate()
                      }}
                    />
                  </S.ActionsContainer>
                </MwGrid.Col>
              </MwGrid.Row>
            ))}
          </MwGrid>
        </MwScrollContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          content='Cancelar'
          onClick={() => setOpen(null)}
        />

        <MwButton
          type='button'
          content='Salvar'
          disabled={
            files.length < 1 ||
            files.filter((e) => !e.description || !e.subject).length > 0
          }
          onClick={onSubmit}
          loading={loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Planogram
