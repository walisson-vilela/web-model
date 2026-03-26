import { useState } from 'react'

import { Button } from 'semantic-ui-react'

import Tabs from '../../../../../../../../components/Tabs'

import type { CheckValidationModalProps } from './interfaces'
import * as S from './styles'

export const CheckValidationModal = (props: CheckValidationModalProps) => {
  const {
    title,
    store_title,
    store_subtitle,
    options,
    onClose,
    showTabs = true,
  } = props.data

  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <S.Modal open size='large'>
      <S.ModalHeader>{title}</S.ModalHeader>
      <S.Main>
        <S.Wrapper>
          <strong>{store_title}</strong>
          <p>{store_subtitle}</p>

          {showTabs ? (
            <Tabs
              active={{ active: activeTab, setActive: setActiveTab }}
              options={options}
            />
          ) : null}

          <S.MainContent>{options[activeTab].component}</S.MainContent>
        </S.Wrapper>
      </S.Main>
      <S.Footer>
        <Button primary onClick={onClose}>
          OK
        </Button>
      </S.Footer>
    </S.Modal>
  )
}
