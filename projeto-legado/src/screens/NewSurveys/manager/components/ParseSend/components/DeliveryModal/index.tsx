import React, { useContext, useState } from 'react'

import { Dropdown, SearchFilter } from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { download } from '../../../../../../../utils/DownloadFile'
import { SurveysContext } from '../../../../../context'

import Manager from './components/Manager'
import { getDetails } from './components/Manager/service'
import * as S from './styles'

interface Props {
  id: number
  name: string
}

export const DeliveryModal = ({ id, name }: Props) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  const [search, setSearch] = useState<string>('')

  const onExtractData = async (): Promise<any> => {
    try {
      const { success, data } = await getDetails(id, search, null, true)

      if (success) {
        download(data.url)
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  const dropdownItems = [
    {
      content: 'Extrair dados',
      onClick: onExtractData,
      rules: [],
    },
  ]

  return (
    <Modal open size='large'>
      <S.HeaderContainer>
        <span>Relatório Entrega de Tarefa</span>
      </S.HeaderContainer>
      <S.Container>
        <S.InfoContainer>
          <span>
            Nome: <strong>{name}</strong>
          </span>

          <S.InfoInputsContainer>
            <SearchFilter setSearch={setSearch} />
            <S.More>
              <Dropdown
                items={dropdownItems}
                loading={false}
                axis='y'
                centerCoodinates={{ y: 100 }}
              />
            </S.More>
          </S.InfoInputsContainer>
        </S.InfoContainer>

        <Manager search={search} setSearch={setSearch} id={id} />
      </S.Container>
      <Modal.Actions>
        <Button
          primary
          content='Ok'
          size='tiny'
          onClick={() => setOpenSelectModal(<React.Fragment />)}
        />
      </Modal.Actions>
    </Modal>
  )
}
