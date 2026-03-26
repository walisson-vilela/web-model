import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap');

    body, html, #root {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
         background-color:#FCFCFC;
         box-shadow:none !important;
         overflow-y: hidden;
    }

    .ui.basic.button.transparent, .ui.basic.button.transparent:hover  {
      background: transparent !important;
      box-shadow: inherit !important;
    }

    .input-error {
      padding-top: 30px;
    }
`;





