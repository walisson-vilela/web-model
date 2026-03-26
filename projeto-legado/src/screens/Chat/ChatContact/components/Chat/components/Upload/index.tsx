import React from 'react'

import { FiPlus, FiSend } from 'react-icons/fi'
import { Popup } from 'semantic-ui-react'

import { useChat } from '../../context'

import Icon from './components/Icon'
import Preview from './components/Preview'
import * as S from './styles'

const Upload = () => {
  const { filesData, uploadFiles, selectedFile } = useChat()

  return (
    <S.Container>
      <S.UploadBody>
        {filesData.length > 0 && selectedFile && (
          <React.Fragment>
            <Preview file={selectedFile} />
            <strong> {filesData.length} anexos a serem enviados </strong>
          </React.Fragment>
        )}
      </S.UploadBody>

      <S.UploadFooter>
        <S.Upload>
          <S.Carrosel>
            {filesData &&
              filesData.map((file: any) => <Icon key={file.id} file={file} />)}
          </S.Carrosel>
          <Popup
            on='click'
            pinned
            disabled={filesData.length < 15}
            className='popup-field'
            position='left center'
            content={
              <S.WarningMessage>
                <p>Você não pode anexar mais que 15 documentos</p>
              </S.WarningMessage>
            }
            trigger={
              <S.Label>
                {filesData.length < 15 && (
                  <input
                    type='file'
                    multiple
                    onChange={(e) => uploadFiles(e)}
                  />
                )}
                <FiPlus color='#c8c8c8' />
              </S.Label>
            }
          />
        </S.Upload>
        <S.Send>
          <FiSend size={21} color='#3455AB' />
        </S.Send>
      </S.UploadFooter>
    </S.Container>
  )
}

export default Upload
