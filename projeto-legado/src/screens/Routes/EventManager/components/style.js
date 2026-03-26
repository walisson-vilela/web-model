import styled from 'styled-components';
import {Segment} from "semantic-ui-react";

export const Wrapper = styled.div`

    height: 343.53px;

    .h4, h5, h6 {
        margin: 0;
    }

    h5 {
        color: var(--black-50);
        font-size: 13px;
    }

    h4 {
        margin: 3px 0;
        color: var(--dark-blue)
    }

    p {
        color: var(--black-50);
        font-size: 12px;
    }

    .top.attached.header {
        background-color: #465F98 !important;
        color: #FFF !important;
        border-radius: 0 !important;
        border: 0 !important;
        flex-grow: inherit !important;
    }

    .sub.header {
        margin-top: 4px !important;
    }

    .ui.pointing.secondary.menu {
        margin-bottom: 0!important;
    }
    .ui.pointing.secondary.menu + .segment {
        margin-top: 0!important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
        min-height: 372px;
    }

    .segments {
        border-radius: 0 !important;
    }
`

export const WrapperMulticontas = styled(Segment)`
  form {
    height: 100%;
  }

  .mc-content {
    height: 0!important;
    overflow: auto;
  }

  .grid {
    .row {
      .column.source {
        padding-right: .5rem !important;
      }

      .column.destiny {
        padding-left: .5rem !important;
      }
    }
  }

  .menu {
    .item:first-child {
      padding-left: 1rem !important;
    }
  }

  .menu + .segment {
    border-radius: 0 !important;
    border-top: 0 !important;
  }

  .right.menu.search {
    width: 100%;
    padding: 0 1rem;

    .input {
      width: 100%;
    }
  }

  .list {
    .item {
      padding-left: 1rem !important;
      padding-bottom: 0 !important;

      .checkbox {
        width: 100%;
        padding: 12px 0;
      }
    }
  }
`;
