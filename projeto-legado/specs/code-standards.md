# Trade Result WEB – Code Standards

Este documento consolida padrões de código e de normalização que devem ser seguidos no Trade Result WEB.  
Sempre que surgirem novas correções ou alinhamentos, este arquivo deve ser atualizado.

## Estrutura e Organização

- **Priorizar `src/standardized`**  
  - Novos códigos devem ser criados em `src/standardized`, onde as regras de TypeScript e ESLint são mais restritivas.  
  - Código fora de `standardized` deve ser apenas mantido, evitando novas features nessas áreas legadas.

- **Pastas e escopo de regras**  
  - Arquivos na raiz de `src` usam o `tsconfig` raiz, com regras “fracas” e sem ESLint dedicado.  
  - Em `src/standardized`, respeitar integralmente as regras de lint/TS e ajustes solicitados via correções.

## HTTP e Normalização de Dados

- **Instância de Axios**  
  - Todas as requisições HTTP devem usar **apenas** a instância em `src/services/Axios/instance.ts`.  
  - Não criar novas instâncias com `Axios.create` nem usar `fetch` diretamente.

- **Normalização de datas/horários de API**  
  - Para campos de data/hora vindos da API que precisam ser normalizados para formato padrão:
    - Utilizar `dateOrDefault` (de `src/utils/Formatters.ts`) em vez de `notEmptyStringOrDefault`.
    - Especificar os formatos de entrada e saída explicitamente.  
    - Exemplo (cálculo de deslocamento):  
      - Formato de entrada e saída: `YYYY-MM-DD HH:mm:ss`.  
      - Conversão posterior para `Date` deve considerar essa normalização.

## UI, Componentes e Bibliotecas Internas

- **mw-ui**  
  - Em novos desenvolvimentos, **priorizar sempre** o uso dos componentes e tema do `@mw-kit/mw-ui` (inputs, botões, ícones, containers, tipografia e espaçamentos).  
  - Evitar criar componentes visuais ad-hoc quando já existir equivalente em `mw-ui`.

- **mw-manager**  
  - Para listagens de dados com filtros/paginação (especialmente com scroll infinito), utilizar o componente padrão do `@mw-kit/mw-manager`.

- **Toasts e feedbacks (Toaster)**  
  - Erros de operações devem ser comunicados via `ToasterContent` e estilos `ErrorStyle`.  
  - Em operações internas como o cálculo de deslocamento de rota:
    - **Não** exibir toast de sucesso; apenas tratar e exibir toast em caso de falha.

## Regras de Código e ESLint

- **Importação de React**  
  - Sempre importar `React` quando forem utilizados `React.Fragment` ou padrões que dependam explicitamente do objeto `React`.  
  - Exemplo: `import React, { useMemo } from 'react'` ao usar `<React.Fragment>`.

- **`@typescript-eslint/no-use-before-define`**  
  - Funções utilitárias, tipos e helpers devem ser declarados **antes** do primeiro uso no arquivo.  
  - Evitar depender apenas de “hoisting” de funções; prefira reordenar o arquivo ou usar `const nome = () => {}` quando necessário.  
  - Desabilitar a regra (`// eslint-disable-next-line @typescript-eslint/no-use-before-define`) só é aceitável em casos legados/muito específicos, documentando o motivo.

- **`prefer-const`**  
  - Variáveis que não são reassinadas após a inicialização devem ser declaradas com `const` (inclusive dentro de laços `for`/`for-of`).  
  - Em refactors, sempre revisar blocos com `let` e trocar para `const` onde o valor não muda; isso reduz mutabilidade acidental e evita warnings de ESLint.

- **Linhas em branco e formatação**  
  - Evitar linhas em branco extras em blocos (`if`, `try/catch`, funções e objetos) que violem regras como:
    - `padded-blocks` (não “acolchoar” blocos com linhas em branco desnecessárias).  
    - `no-multiple-empty-lines` (nenhuma linha em branco no final do arquivo; não usar múltiplas linhas em branco consecutivas).
  - Ao refatorar (por exemplo, removendo `toast` de sucesso), revisar o bloco para não deixar espaços vazios entre o fechamento de estruturas e o próximo token.

- **Updates de estado em componentes que serão desmontados**  
  - Evitar chamadas de `setState` imediatamente antes de fechar/desmontar o componente (por exemplo, em `onSubmit` de popups que sempre chamam `onClose` em seguida), pois o próximo render não ocorrerá:
    - Prefira retornar diretamente em casos inválidos, sem restaurar valores no estado local.

## Workflow: Prettier e ESLint por Arquivo

- **Formatação com Prettier**  
  - Após editar **arquivos TypeScript** (`.ts`, `.tsx`), rodar o Prettier específico daquele arquivo:  
    - `./exec.sh yarn prettier-file caminho/relativo/arquivo.ts`  
    - `./exec.sh yarn prettier-file caminho/relativo/arquivo.tsx`  
  - Não é necessário rodar este script automaticamente para arquivos de outros tipos (`.md`, `.json`, `.css`, etc.).

- **Lint com ESLint**  
  - Em seguida, rodar o ESLint específico para o **mesmo arquivo `.ts` ou `.tsx`**:  
    - `./exec.sh yarn eslint-file caminho/relativo/arquivo.ts`  
    - `./exec.sh yarn eslint-file caminho/relativo/arquivo.tsx`
  - Não executar `eslint-file` para arquivos que não sejam TypeScript.

- **Responsabilidade do desenvolvimento**  
  - Mesmo quando o ambiente automatizado não conseguir executar os scripts (ex.: restrições de Docker), os arquivos devem ser mantidos coerentes com o resultado esperado de `prettier` + `eslint`.  
  - Em desenvolvimento local, é obrigatório garantir que ambos comandos sejam executados sem erros antes de subir alterações.

## Manutenção dos Documentos em `specs`

- Todos os documentos dentro da pasta `specs/` devem refletir os alinhamentos feitos em conversa (padrões de código, normalização de dados, fluxo de ferramentas etc.).
- Sempre que uma correção ou nova regra for definida (por exemplo, escopo de execução de Prettier/ESLint, uso de helpers específicos ou ajustes de UI), o(s) arquivo(s) relevante(s) em `specs/` deve(m) ser atualizado(s) imediatamente.
