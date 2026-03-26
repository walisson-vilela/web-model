# Trade Result WEB – Organização e Convenções

Este documento descreve a organização do projeto Trade Result WEB, suas principais dependências e recursos internos que devem ser utilizados no desenvolvimento.

## Visão Geral da Aplicação

- Aplicação SPA em **React 18** integrada com a **Trade Result API** (REST).
- Fluxo inicial:
  - Inicia na **tela de login**;
  - Após autenticar, redireciona para uma **SPA** com:
    - Menu superior (dados do usuário logado);
    - Menu lateral esquerdo com acesso às telas/rotas.

## Organização de Rotas e Abas

- As rotas são orquestradas por `src/routes/TabsProvider/index.tsx`.
- Cada rota aberta corresponde a **uma aba na interface**.
- Cada rota possui:
  - Um **componente** de tela;
  - Um **provider** associado.
- Comportamento de ciclo de vida:
  - Ao alternar entre abas:
    - O **provider da rota permanece montado**;
    - O **componente da tela é desmontado/montado** conforme a aba ganha foco.
  - Dessa forma, dados salvos no provider **não são perdidos** ao trocar de rota/aba.
  - Os dados são descartados apenas quando o usuário **fecha a aba** correspondente.

## Estrutura de Pastas e Regras de Código

- Arquivos em `src/` (raiz):
  - Submetidos ao `tsconfig` raiz, com regras **mais fracas**;
  - Não há ESLint configurado diretamente para esses arquivos.

- Pasta `src/standardized/`:
  - Criada para ser o **novo padrão** do projeto;
  - Possui regras de **TypeScript** e **ESLint** mais **restritivas**;
  - Nova implementação deve ser priorizada **sempre que possível** nesta pasta;
  - Código legado que está fora de `standardized` deve ser **apenas mantido**, não expandido.

## Requisições HTTP e Axios

- Todas as requisições devem utilizar a **instância de Axios** já configurada:
  - Arquivo: `src/services/Axios/instance.ts`.
- Essa instância é responsável por:
  - Definir o `baseURL` de acordo com o `window.location.hostname` (ambientes `traderesult.app`, `traderesult.ninja`, etc.);
  - Injetar automaticamente o **token JWT** (`Bearer`) a partir do cookie `_GIV_USER`, exceto em endpoints específicos de autenticação/verificação;
  - Configurar cabeçalhos comuns:
    - `Content-Type`, `Accept`;
    - `Accept-Timezone` (fuso horário do browser);
    - `Accept-Language` (valor armazenado em `_GIV_LOCALE` ou `pt-br`).
  - Tratar `FormData` ajustando `Content-Type` para `multipart/form-data`;
  - Redirecionar para logout (`Logout`) em respostas `401`/`403` quando apropriado.
- **Padrão obrigatório**: não criar novas instâncias de `Axios` nem usar `fetch` diretamente. Sempre reutilizar `src/services/Axios/instance.ts`.

## Bibliotecas Internas

O projeto utiliza um conjunto de bibliotecas internas, que devem ser priorizadas diante de alternativas externas ou implementações customizadas:

- **`@mw-kit/mw-ui` (mw-ui)**  
  - Base de componentes da aplicação (inputs, botões, loadings, etc.);
  - Integrado ao **tema** de `styled-components` do projeto (cores, espaçamentos, tipografias);
  - Em novos recursos, **sempre priorizar** o uso dos componentes e tokens de tema do `mw-ui`.

- **`@mw-kit/mw-manager` (mw-manager)**  
  - Fornece um componente reutilizável para:
    - Tabelas/listagens;
    - Filtros;
    - Paginação com scroll infinito.
  - Deve ser utilizado como padrão para telas com listagens de dados.

- **`@mw-kit/eslint-config` (mw-eslint)**  
  - Exporta configurações padrão de:
    - **ESLint**;
    - **TSConfig**;
    - **Prettier**;
  - Usado no projeto para padronizar linting, tipagem e formato de código, principalmente em `src/standardized`.

## Principais Dependências Externas

Resumo das dependências mais relevantes (além das internas MW):

- **SPA / Core**
  - `react`, `react-dom` (18);
  - `react-router`, `react-router-dom` (v5);
  - `redux`, `react-redux`, `redux-thunk`.

- **Formulários e validação**
  - `react-hook-form`, `@hookform/resolvers`, `yup`;
  - `redux-form` (form stack mais antigo ainda presente).

- **UI / Layout / Feedback**
  - `semantic-ui-react`, `semantic-ui-css`, `react-semantic-toasts`;
  - `react-icons`, `react-hot-toast`;
  - `styled-components`, `stylis`;
  - `react-quill`, `react-color`, `react-avatar-editor`, `react-easy-crop`, `react-chips`;
  - `@lottiefiles/react-lottie-player`, `animate.css`;
  - `react-to-print`, `swagger-ui-react`.

- **Datas, gráficos e visualização**
  - `date-fns`, `moment`;
  - `highcharts`, `highcharts-react-official`;
  - `react-d3-tree`;
  - `@react-google-maps/api`.

- **Utilitários e integração**
  - `axios`, `qs`, `lodash`, `uuid`;
  - `js-file-download`, `browser-image-compression`, `jwt-decode`;
  - `pusher-js` (tempo real);
  - `@tanstack/react-virtual` (listas virtualizadas).

- **Internacionalização**
  - `react-intl`, `react-intl-translations-manager`.

## Pasta `specs`

- A pasta `specs/` na raiz do projeto é destinada a **documentos de especificação**, decisões e acordos de arquitetura/processo.
- Este arquivo (`specs/projeto-traderesult-web.md`) consolida:
  - Organização de rotas/abas;
  - Estrutura de pastas;
  - Convenções de requisições com Axios;
  - Uso de bibliotecas internas e principais dependências externas.
- Sempre que novas regras ou mudanças forem definidas sobre estes temas, este documento deve ser **atualizado e incrementado**, em vez de criar documentos paralelos conflitantes.

