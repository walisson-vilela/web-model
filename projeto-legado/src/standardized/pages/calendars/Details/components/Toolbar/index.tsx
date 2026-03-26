import styled from 'styled-components'

import * as Components from './components'

const Toolbar = Object.assign(
  styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.getColor('lightestGrey', 80)};
    gap: 1px;
    padding: 1px 0;

    > div {
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    > div.search {
      flex: 1;
    }
    > div.filter {
      padding: ${({ theme }) => theme.spacings.s3};
      ${({ theme }) => theme.useTypography('p')};
      line-height: 17px;
    }
    > div.button {
      padding: 0 ${({ theme }) => theme.spacings.s1};
    }
  `,
  Components,
)

export default Toolbar
