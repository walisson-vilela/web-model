# Frontend Architecture

Este projeto foi organizado para ser consumido como aplicação React com
`Context` para estado compartilhado. Não usamos Redux.

## Camadas

- `src/components`
  - Componentes reutilizáveis do sistema.
  - Não devem depender de `src/pages`.
  - O componente `Icon` consome os ícones centralizados em `src/assets/icons/feather`.
  - Todos os ícones do projeto devem ser utilizados a partir de `src/assets/icons/feather`.
  - O registry expõe nomes com autocomplete via `FeatherIconName`.

- `src/pages`
  - Telas e features de rota.
  - Cada página tem sua própria estrutura local.
  - Componentes exclusivos da página vivem em `components/` dentro da própria página.
  - `Home` funciona como shell da área autenticada.
  - A área autenticada usa uma camada própria de `screens` para as telas internas, exibidas dentro do shell via tabs.

- `src/contexts`
  - Estado compartilhado de baixa complexidade.
  - Usar para auth, sessão, tema de UI, preferências do usuário e outros estados globais pequenos.
  - Não usar Redux neste projeto.

- `src/routes`
  - Definição de rotas e proteções de navegação.
  - O fluxo atual usa `RequireAuth` para proteger a área autenticada.

- `src/theme`
  - Tokens, fontes, tema base e provider global.

- `src/services`
  - Integração com backend e lógica de persistência compartilhada.

- `src/hooks`
  - Hooks reutilizáveis.

- `src/functions`
  - Helpers puros e utilitários.

## Regras

- Estado compartilhado simples vai para `src/contexts`.
- Estado local de página fica em `src/pages/<PageName>`.
- Estado local de componente fica no próprio componente.
- Se um dado precisa sobreviver ao reload, o contexto deve persistir em `storage` ou backend.
- Serviços não renderizam UI.
- Componentes compartilhados não importam páginas.
- Páginas não devem importar diretamente módulos de outras páginas.
- O provider de auth é montado no bootstrap da aplicação e o `RequireAuth` decide se a rota pode renderizar.
- Componentes, pastas técnicas e nomes de arquivos devem seguir `camelCase` e inglês.
- Labels, títulos e textos exibidos na interface podem continuar localizados em português.

## Padrão de página

```text
src/pages/<PageName>/
  index.tsx
  styles.module.css
  services.ts
  interfaces.ts
  components/
```

## Padrão de contexto

```text
src/contexts/<context>/
  index.tsx
  useAuth.ts
  interfaces.ts
  services.ts
```

## Padrão de rota protegida

- Rotas privadas ficam atrás de `RequireAuth`.
- Login deve redirecionar para a área autenticada quando a sessão já existir.
- A rota pública principal é `/login`.
- A rota autenticada atual é `/main`.

## Fluxo da área autenticada

```text
src/pages/Home/
  index.tsx
  components/
    HomeLayout/
      components/
        Header/
        Menu/
      styles.module.css
  screens/
    index.tsx
    Dashboard/
    ScreenPlaceholder/
```

- `HomePage` é a porta de entrada da área autenticada.
- `HomeLayout` monta o shell visual da aplicação.
- `Tabs` renderiza as screens abertas e recebe um `header` separado para título, subtítulo e ações da screen ativa.
- `screens/index.tsx` concentra o catálogo de telas internas, seus paths, labels, descrições e hierarquia.
- O menu lateral e o router consomem o mesmo catálogo, evitando duplicar rotas e labels.
- A screen `home` aparece como `Painel de Controle` no tab.
- `ScreenPlaceholder` é o contrato visual usado enquanto uma screen real ainda não foi implementada.

## Fluxo atual

- `main.tsx` monta `ThemeProvider`, `AuthProvider` e `BrowserRouter`.
- `Login` lê e grava a sessão via `Context`.
- `Home` representa a área autenticada inicial e hospeda as telas internas no layout padrão.
- `Storybook` também recebe `AuthProvider` e router para conseguir renderizar telas dependentes de contexto.
