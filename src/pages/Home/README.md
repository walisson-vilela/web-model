# Home

A `Home` é o shell da área autenticada.

Ela foi organizada para seguir a lógica do legado:

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

## Papel de cada camada

- `index.tsx`
  - Ponto de entrada da página.
  - Renderiza o layout base da Home.

- `components/HomeLayout`
  - Componente shell.
  - Concentra header, menu lateral, o `MwTabs` compartilhado, comportamento de colapso/expansão e a área que recebe as telas internas.
  - A navegação interna é controlada pelo próprio shell, que sincroniza a URL com a aba ativa.
  - O `MwTabs` recebe um `header` separado para título, subtítulo e ações da screen ativa.

- `screens/index.tsx`
  - Catálogo único das telas internas da Home.
  - É usado tanto pelo router quanto pelo menu lateral.
  - Evita duplicar nomes, paths e hierarquia em lugares diferentes.

- `screens/Dashboard`
  - Screen real inicial da Home.
  - Nome técnico em inglês e em camelCase para seguir o padrão do projeto.
  - Exibe o título e a descrição inicial da área autenticada.
  - No shell, essa screen aparece com o título de aba `Painel de Controle`.

- `screens/ScreenPlaceholder`
  - Screen provisória para módulos ainda não implementados.
  - Serve como contrato visual e estrutural para novas telas, sempre com título e descrição.

## Estrutura atual

```text
src/pages/Home/
  index.tsx
  components/
    HomeLayout/
      index.tsx
      styles.module.css
      components/
        Header/
          index.tsx
          styles.module.css
        Menu/
          index.tsx
          styles.module.css
  screens/
    index.tsx
    Dashboard/
      index.tsx
    ScreenPlaceholder/
      index.tsx
      styles.module.css
```

## Como a Home funciona

- A rota `/main` redireciona para `/main/home`.
- O `HomeLayout` monta o shell visual da aplicação.
- O menu lateral usa o catálogo de `screens` para abrir novas tabs.
- O `MwTabs` renderiza as screens abertas e permite fechar e alternar abas.
- O header da screen é separado do conteúdo para permitir título, subtítulo e ações dinâmicas.
- O conteúdo da screen entra abaixo do header, sem fundo próprio obrigatório.
- `Dashboard` é a primeira screen real da Home.
- `ScreenPlaceholder` é a base para novas telas até a implementação final.
- Todos os ícones usados na Home vêm de `src/assets/icons/feather` via `MwIcon`.

## Comportamento

- As tabs da Home são controladas pelo `MwTabs` compartilhado.
- Cada screen aberta fica visível dentro da própria barra de tabs.
- O menu lateral é padrão da Home e também serve como base para outras telas internas.
- Quando o menu está colapsado, o hover mostra o flyout com os itens do grupo.
- Quando o menu está expandido, os grupos viram seções com submenu interno.
- O conteúdo principal pode rolar sem afetar a estrutura da página.

## Evolução esperada

Quando uma nova screen for criada:

1. Adicione a screen em `src/pages/Home/screens`.
2. Registre o item no catálogo `screens/index.tsx`.
3. A rota, o menu e as tabs passam a enxergar a tela a partir da mesma fonte de verdade.
