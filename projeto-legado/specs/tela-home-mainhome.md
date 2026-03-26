# Tela Home (MainHome)

Este documento consolida o entendimento atual da nova tela **Home** que estamos desenvolvendo em `src/standardized/pages/MainHome`, incluindo arquitetura, fluxo de dados (mockado), layout dos cards e rotas de detalhamento.

## Objetivo

Entregar uma Home em formato de **dashboard** com:

- Barra superior de filtros (Visão / Nível / Data) e menu de impressão.
- Grid de cards (cards `card-1` a `card-21`) com layout fixo.
- Abertura de páginas de **detalhe** por card (rotas `/dashboard-home/card-x`), inicialmente com mocks e placeholders.

## Onde fica no código

- Página principal: `src/standardized/pages/MainHome/index.tsx`
- Contexto/estado de filtros: `src/standardized/pages/MainHome/context.tsx`
- Layout do grid (ordem dos cards): `src/standardized/pages/MainHome/constants.ts`
- Config de cards (loader + builder): `src/standardized/pages/MainHome/cardsConfig.ts`
- Tipos dos dados (contratos atuais mockados): `src/standardized/pages/MainHome/types.ts`
- Mocks/serviços (simulando API): `src/standardized/pages/MainHome/services.ts`
- Componentes:
  - Barra de filtros: `src/standardized/pages/MainHome/components/FiltersBar`
  - Grid e container: `src/standardized/pages/MainHome/components/CardsGrid`
  - “Moldura” do card: `src/standardized/pages/MainHome/components/Card`
  - Cards individuais: `src/standardized/pages/MainHome/components/cards/Card1` … `Card21`
- Detalhes:
  - Configs: `src/standardized/pages/MainHome/details/constants.ts`
  - Páginas: `src/standardized/pages/MainHome/details/pages.tsx`
  - Placeholder genérico: `src/standardized/pages/MainHome/details/components/DetailPlaceholder`

## Rotas e navegação

- Home (MainHome): rota registrada no grupo `home` com `path: ''` (URL final: `/main/home`).
- Ao clicar no ícone de detalhe (↗) no header do card, a Home navega para:
  - `/main/home/dashboard-home/<cardId>` (ex.: `/main/home/dashboard-home/card-1`)
- As rotas de detalhe são geradas a partir de `MAIN_HOME_DETAIL_CONFIGS` e mapeadas para componentes `MainHomeDetail.<cardId>`.

## Barra de filtros (FiltersBar)

Arquivos: `src/standardized/pages/MainHome/components/FiltersBar/*`.

### Visão (HierarchyFilter)

- Usa `MwInput` com `type='select'`.
- “Trigger” customizado abre o select automaticamente via `ref.click()`.
- Opções carregadas via `loader` com base em `hierarchies` do contexto.

### Nível (LevelFilter)

- Usa `MwInput` com `type='select-multiple'` + `search` + `selectAll`.
- Mostra “Todos” quando nenhum nível está selecionado; caso contrário mostra “X selecionado(s)”.

### Data (DateFilter)

- Usa `MwCalendar` `type='single'`.
- Label amigável é gerado por `formatSingleDateLabel` (`src/standardized/utils/date.ts`).

### Menu (PrintMenu)

- Menu com opção “Imprimir” (`window.print()`).

## Contexto da Home (MainHomeProvider)

Arquivo: `src/standardized/pages/MainHome/context.tsx`

Estado que fica persistido dentro do provider:

- `hierarchies` + loading.
- `levels` + loading (recarregado sempre que a hierarquia muda).
- `selectedHierarchyId` (inicializa com o primeiro item da lista de hierarquias).
- `selectedLevelIds` (multi seleção).
- `selectedDate` (string `YYYY-MM-DD` via `toLocalISODate`).

Observação: hoje os dados de hierarquia/níveis vêm de mocks em `services.ts`. No futuro serão alimentados por API.

## Grid e layout fixo dos cards

Arquivo: `src/standardized/pages/MainHome/constants.ts`

- O grid é definido por `CARD_LAYOUT`, uma matriz de linhas/colunas.
- Cada posição é uma “coluna” (array) que pode conter **1 ou mais cards** empilhados no mesmo slot (ex.: `['card-9', 'card-10']`).

Renderização:

- `CardsGrid` (`components/CardsGrid/index.tsx`) itera `CARD_LAYOUT` e renderiza `CardContainer` para cada `cardId`.

## Como cada card carrega e monta a UI

Arquivos-chave:

- `src/standardized/pages/MainHome/cardsConfig.ts`
- `src/standardized/pages/MainHome/components/CardsGrid/CardContainer.tsx`
- `src/standardized/pages/MainHome/components/Card/index.tsx`

### Configuração por card (CARD_CONFIGS)

Cada card tem um `CardConfig`:

- `load`: função async (mock hoje) que retorna os dados do card.
- `build`: função que converte dados → `CardView` (title/content/footer/status).
- `placeholderType`: tipo de skeleton do `MwPlaceholder`.

Se um `cardId` não existir em `CARD_CONFIGS`, o `CardContainer` usa `fetchCardData(cardId)` e exibe um conteúdo genérico (“Dados mockados…”).

### Carregamento em fila (evita “burst” de requests)

`CardContainer` usa uma fila global (`loadQueue`) para carregar os cards sequencialmente.
Isso reduz re-render e picos de requisições quando a página monta.

### Estrutura visual padrão do Card

O componente `Card` suporta:

- Header com `title` + botão de detalhe (ícone `arrow_up_right`).
- `status` opcional:
  - Exibe uma borda/indicador lateral.
  - Ao clicar, abre um tooltip com legenda (2 colunas quando necessário).
  - Fecha ao clicar fora via `useOnClickOutState`.
- Body renderiza o conteúdo.
- Footer é opcional.

## Padrões adotados nos cards (implementação atual)

### Formatação (pt-BR)

- Números: `Intl.NumberFormat('pt-BR')`.
- Porcentagens:
  - Quando necessário, exibir com `%`.
  - Em alguns cards a regra é “sempre 1 casa decimal” (ex.: card 20).

### Gráficos (Highcharts)

- Cards que recebem `chart_data` usam Highcharts via `highcharts-react-official`.
- O padrão adotado nos cards 16/17:
  - Definir defaults de layout (altura, eixos, 0–100 etc.).
  - Fazer merge do `chart_data` da API/mocks com os defaults para garantir consistência visual.

### Range (MwInput type='range')

Nos cards 16 e 17:

- `MwInput type='range'` com `markers` no próprio componente:
  - `markers: [{ label, value }]`
  - `strict: true`, `position: 'bottom'`
  - `min/max` compatíveis com a quantidade de períodos.
- `hideNavbar` usado para não exibir a numeração (0..N) abaixo do range, mantendo apenas os labels.
- Ao mudar o range, o card recarrega os dados (mock hoje; será API depois).

### Listas com rolagem ocupando o “restante” do card

Nos cards 16/17:

- A lista de ocorrências fica em uma área com `flex` e `min-height: 0` para ocupar o espaço restante e habilitar scroll.
- O “badge”/pill de contagem (`DetailCount`) é pequeno e tem largura intrínseca (não estica na linha).

## Assets (ícones)

- Os ícones do card 9 (“Humor”) são SVGs servidos em `public/assets/icons/mood/*` e referenciados por path absoluto:
  - `/assets/icons/mood/mood_very_bad.svg`
  - `/assets/icons/mood/mood_bad.svg`
  - `/assets/icons/mood/mood_neutral.svg`
  - `/assets/icons/mood/mood_good.svg`
  - `/assets/icons/mood/mood_great.svg`

## Páginas de detalhe (detalhamento dos cards)

Arquivos:

- `src/standardized/pages/MainHome/details/constants.ts` define `MAIN_HOME_DETAIL_CONFIGS` (id/title/description).
- `src/standardized/pages/MainHome/details/pages.tsx` monta `MAIN_HOME_DETAIL_PAGES`.

Status atual:

- `card-1` já tem base implementada no padrão “Header + Toolbar + MwManager” (modelo `Roles`):
  - Provider: `src/standardized/pages/MainHome/details/Card1/provider.tsx` (usa `useManagerProps`).
  - Manager com mocks e colunas: `src/standardized/pages/MainHome/details/Card1/Manager/*`.
  - O detalhe do `card-1` não usa coluna de seleção (sem checkboxes).
- Os demais detalhes continuam usando `DetailPlaceholder` (até definirmos layout/contrato).

Observação: os `title/description` dos detalhes serão refinados conforme evoluirmos (alguns ainda estão genéricos/placeholder).

## Processo combinado durante o desenvolvimento

- A implementação tem sido feita com o fluxo:
  1) Planejar o card/tela.
  2) Validar com o “Aprovado”.
  3) Só então codificar.
- Enquanto os contratos de API não estão definidos, os dados ficam mockados em `services.ts`, mas os tipos já existem em `types.ts` para facilitar a futura integração.

## Próximos passos (quando os contratos chegarem)

- Substituir `fetchCardXData` mockados por chamadas reais usando `src/services/Axios/instance.ts`.
- Conectar os filtros globais (hierarquia/nível/data) como parâmetros das chamadas.
- Para detalhes:
  - Definir contratos da API e filtros específicos.
  - Implementar managers e layouts de cada `card-x` seguindo os mocks.

