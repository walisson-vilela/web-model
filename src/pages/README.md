# Pages

Cada nova tela deve seguir esta estrutura:

```text
src/pages/<PageName>/
  index.tsx
  styles.module.css
  services.ts
  interfaces.ts
  components/
```

Regras:

- `index.tsx` é o ponto de composição da tela.
- `styles.module.css` concentra somente os estilos da página.
- `services.ts` concentra regras, chamadas assíncronas e helpers específicos da tela.
- `interfaces.ts` concentra os tipos da página.
- `components/` guarda componentes exclusivos daquela tela.
- Componentes reutilizáveis do sistema continuam em `src/components` e não devem ser duplicados aqui.
- Se a tela crescer, prefira quebrar em componentes pequenos dentro de `components/` antes de colocar mais lógica no `index.tsx`.
- A página deve ser responsável por compor estado, navegar e orquestrar a UI.
- Se a página precisar conversar com estado compartilhado, use `Context` em vez de Redux.
- Lógica de autenticação, persistência ou preparo de dados deve ficar em `services.ts` ou no `Context` apropriado.
- Por padrão, novos componentes deverão ser criados em `CamelCase` e em inglês.
- Textos de interface, labels e mensagens podem continuar no idioma do produto.

As telas já padronizadas neste workspace são:

- `Login`
- `Home`

## Home

A tela `Home` virou a porta de entrada da área autenticada.

Ela segue esta separação:

```text
src/pages/Home/
  index.tsx
  components/
    HomeLayout/
  screens/
    index.tsx
    Dashboard/
    ScreenPlaceholder/
```

- `HomeLayout` concentra o shell da aplicação: header, menu lateral e área de conteúdo.
- `screens/index.tsx` é a fonte de verdade das telas internas da Home.
- `HomeLayout` usa o `MwTabs` compartilhado para exibir as screens abertas.
- O `MwTabs` da Home recebe um header separado para título, subtítulo e ações da screen ativa.
- O menu lateral também consome o catálogo de `screens`, então rotas e navegação compartilham a mesma estrutura.
- `Painel de Controle` é a label da tab inicial da screen `home`.
- `Dashboard` é o nome técnico em inglês da screen inicial da Home.
- `Home` é a screen inicial da área autenticada e representa o painel principal.
- A Home mantém um shell próprio com menu lateral, barra de tabs e screens internas.
- As demais entradas do menu podem usar `ScreenPlaceholder` até a implementação completa de cada módulo.

## Estrutura da Home

```text
src/pages/Home/
  index.tsx
  components/
    HomeLayout/
      index.tsx
      styles.module.css
      components/
        Header/
        Menu/
  screens/
    index.tsx
    Dashboard/
      index.tsx
    ScreenPlaceholder/
      index.tsx
      styles.module.css
```

- `index.tsx` apenas conecta a página ao shell.
- `HomeLayout` gerencia navegação, menu lateral e tabs.
- `Header` monta o topo da aplicação.
- `Menu` controla o menu lateral e a abertura das screens.
- `screens/index.tsx` é o catálogo central com labels, paths, ícones, descrições e rotas filhas.
- `Dashboard` é a primeira screen real da Home.
- `ScreenPlaceholder` é a base para novas screens antes da implementação final.
- Os ícones exibidos pelas screens devem vir de `src/assets/icons/feather` via `MwIcon`.

## Fluxo de criação de screen

1. Crie a screen em `src/pages/Home/screens/<NomeDaScreen>/`.
2. Registre a screen em `src/pages/Home/screens/index.tsx`.
3. O menu lateral passa a exibir a entrada a partir do catálogo.
4. O router já resolve a rota via `flattenHomeScreenRoutes`.
5. O `MwTabs` abre a screen e renderiza o header + conteúdo da tab.

## Exemplo prático

Na tela de login:

- `Login`, `LoginForm` e `LoginFooter` são componentes exclusivos da página.
- O estado de autenticação global é lido de `src/contexts/auth`.
- A rota `/login` é pública e `/main` é protegida.
