import React, { useEffect, useState } from 'react'

import fileDownload from 'js-file-download'
import toast from 'react-hot-toast'
import { FiDownload } from 'react-icons/fi'
import { Loader } from 'semantic-ui-react'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../components/Toaster'
import { AccordionImagesBodyInterface } from '../../../../../interface'

import ImageCache from './components/ImageCache'
import { ColletData } from './interface'
import { GetColletData, exportPdfFile } from './service'
import * as S from './style'

const Collect = (props: AccordionImagesBodyInterface) => {
  const [data, setData] = useState<ColletData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)

  const GetData = async () => {
    setLoading(true)
    try {
      const data = await GetColletData(props.id)
      setData(data)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetData()
  }, [props.id])

  const handleExportFile = async () => {
    setDownloadLoading(true)
    try {
      const response = await exportPdfFile(props.id)

      await fileDownload(response, `${props.store.name}.pdf`)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setDownloadLoading(false)
    }
  }

  return (
    <S.Content>
      {loading ? (
        <S.LoaderContainer>
          <Loader active />
        </S.LoaderContainer>
      ) : (
        <React.Fragment>
          <S.Header>
            <S.HeaderInfo>
              <S.Form>
                <strong>Formulário: {data ? data.form.name : ''}</strong>
                {downloadLoading ? (
                  <S.PDFDownload>
                    <p>
                      <Loader active size='tiny' />
                    </p>
                  </S.PDFDownload>
                ) : (
                  <S.PDF onClick={handleExportFile}>
                    <p>
                      PDF <FiDownload size={10} />
                    </p>
                  </S.PDF>
                )}
              </S.Form>
              <span>
                Id do Formulário: {data ? data.form.id : ''} - Id do Registro:{' '}
                {data ? data.registry_id : ''}
              </span>
            </S.HeaderInfo>
          </S.Header>
          <S.Container>
            <S.Wrapper>
              {(data ? data.fields : []).map((field, index) => {
                const map = {
                  F: () => (
                    <React.Fragment>
                      <strong>
                        {++index} - {field.field_name}
                      </strong>
                      {field.answers.map((answer: any) => (
                        <ImageCache answer={answer} key={answer.id} />
                      ))}
                    </React.Fragment>
                  ),
                  SPF: () => (
                    <React.Fragment>
                      <strong>
                        {++index} - {field.field_name}
                      </strong>
                      {field.children.map((child) => (
                        <S.Questions key={child.title}>
                          <legend>
                            <span>{child.title}</span>
                          </legend>
                          {child.fields.map((childField, answerIndex) => (
                            <S.Answer key={childField.field_id}>
                              <strong>
                                {`${index}.${++answerIndex}`} -{' '}
                                {childField.field_name}
                              </strong>
                              {childField.answers.map((answer) => {
                                if (typeof answer === 'object') {
                                  return (
                                    <ImageCache
                                      answer={answer}
                                      key={answer.id}
                                    />
                                  )
                                }
                                const answerHTML = answer
                                return (
                                  <span
                                    key={answer}
                                    dangerouslySetInnerHTML={{
                                      __html: answerHTML,
                                    }}
                                  ></span>
                                )
                              })}
                            </S.Answer>
                          ))}
                        </S.Questions>
                      ))}
                    </React.Fragment>
                  ),
                }

                const children = (
                  map[field.field_type] ||
                  (() => (
                    <React.Fragment>
                      <strong>
                        {++index} - {field.field_name}
                      </strong>
                      <S.Answer>
                        {field.answers.map((answer) => (
                          <span key={answer}>{answer}</span>
                        ))}
                      </S.Answer>
                    </React.Fragment>
                  ))
                )()

                return <S.Info key={index}>{children}</S.Info>
              })}
            </S.Wrapper>
          </S.Container>
        </React.Fragment>
      )}
    </S.Content>
  )
}

export default Collect
