import styled from 'styled-components';

export const Wrapper = styled.div`

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
        margin-bottom: 0 !important;
    }

    .ui.pointing.secondary.menu + .segment {
        margin-top: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
        min-height: 372px;
    }

    .segments {
        border-radius: 0 !important;
    }
`

export const RepeatWrapper = styled.div`
    .ui.selection.dropdown {
      min-width: inherit !important;
    }

    .fields.days {
        flex-wrap: wrap;

        > label {
            display: block !important;
            width: 100% !important;
            margin-bottom: 6px !important;
        }

        > div.field {
            width: 103px !important;
            padding-right: 0 !important;

            &:nth-child(n+6) {
                margin-top: .7rem !important;
            }
        }
    }

    .buttons {
        margin-top: 0 !important;

        .button {
            font-weight: normal !important;
        }
    }
`

export const CheckboxWrapper = styled.div`

  label {
    font-weight: bold;
    font-size: 15px !important;
    padding-top: 0 !important;
  }

  div.field {
    margin-bottom: 0 !important;
  }

  div.field + div {
    padding-left: 63px;
    color: var(--black-60);
    line-height: 16px;

    :not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  div.disabled.field + div {
    opacity: .45;
  }
`
