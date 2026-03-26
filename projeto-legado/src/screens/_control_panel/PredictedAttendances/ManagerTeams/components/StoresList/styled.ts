import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
  width: 450px;
`

export const Header = styled.div`
  display: flex;
  margin-bottom: 14px;

  > :first-child {
    flex: 1;
  }

  > :last-child {
    display: flex;
    align-items: end;
  }
`

export const Title = styled.span`
  font-size: 16px;
  font-weight: bolder;
  display: block;
  margin-bottom: 7px;
`

export const List = styled.div`
  height: 100%;
  overflow-y: auto;
`

export const Item = styled.div`
  border-top: 1px solid #ddd;
  padding: 7px 14px;
  display: flex;

  > div {
    :first-child {
      width: calc(100% - 100px);
    }

    :last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin-left: auto;
    }
  }
`

interface CheckIconProps {
  checked?: boolean
}

export const CheckIcon = styled(Icon)<CheckIconProps>`
  font-size: 17px !important;
  width: 17px !important;
  height: 17px !important;
  line-height: 17px !important;

  color: ${(props) => (props.checked ? '#32BA7C' : '#EAE6E6')};
`

export const OpacityEllipsis = styled(EllipsisContainer)`
  opacity: 0.5;
`

export const ListContainer = styled.div`
  height: 200px;
  position: relative;
`

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
`
