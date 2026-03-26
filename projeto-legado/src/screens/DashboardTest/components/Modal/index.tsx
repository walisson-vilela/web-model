import React from 'react'

import Highcharts from 'highcharts'
import HighchartReact from 'highcharts-react-official'
import { Icon } from 'semantic-ui-react'

import {
  ChildrenWrapper,
  Content,
  Header,
  Modal as SemanticModal,
} from './styles'

interface ModalProps {
  text: string
  description?: string
  options?: any
  isOpen?: boolean
  onClose: Function
  children?: JSX.Element
  hasChildren?: boolean
}

export const Modal = ({
  text,
  children,
  options,
  isOpen,
  onClose,
  hasChildren,
}: ModalProps) => {
  //@ts-ignore
  let modalOptions = _.cloneDeep(options)

  if (modalOptions && modalOptions.chart) {
    modalOptions.chart.height = '60%'
  }

  return (
    <SemanticModal open={isOpen} size='large'>
      {hasChildren && (
        <ChildrenWrapper>
          <div className='header-children'>
            <strong> {text}</strong>

            <Icon
              name='close'
              onClick={() => {
                onClose(false)
              }}
            />
          </div>
          <Content>{children}</Content>
        </ChildrenWrapper>
      )}

      {!hasChildren && (
        <>
          <Header>
            <div>
              <strong> {text} </strong>
            </div>
            <Icon
              name='close'
              onClick={() => {
                onClose(false)
              }}
            />
          </Header>
          <Content>
            <HighchartReact Highcharts={Highcharts} options={modalOptions} />
          </Content>
        </>
      )}
    </SemanticModal>
  )
}
