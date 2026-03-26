import styled from 'styled-components'

import { Tab } from './types'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

interface TabsContainerProps {
  currentTab: Tab
}

export const TabsContainer = styled.div<TabsContainerProps>`
  display: flex;
  flex-wrap: ${(props) =>
    props.currentTab === '' ||
    props.currentTab === 'important' ||
    props.currentTab === 'sent'
      ? 'nowrap'
      : 'wrap'};
  gap: ${({ theme }) => theme.spacings.s3};
  flex: 1;
  padding-bottom: ${({ theme }) => theme.spacings.s1};
  overflow: hidden;
`
