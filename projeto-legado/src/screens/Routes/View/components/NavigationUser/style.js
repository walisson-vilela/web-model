import { List } from "semantic-ui-react";
import styled from 'styled-components';

export const ListWrapper = styled(List)`
  small {
    color: var(--black-70) !important;
    font-weight: normal !important;
  }

  .header {
    > div {
      font-size: 14px;
      line-height: 24px;
    }
  }

  .description {
    font-size: 13px;
  }

  .item {
    display: flex !important;
    align-items: center !important;
  }
`
