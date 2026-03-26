# Criação de novas telas e definição de rotas

Este documento descreve o fluxo padrão para criação de **novas telas** na aplicação web (SPA) e como elas são expostas via **rotas** e **abas**. Todas as regras aqui seguem os alinhamentos de `projeto-traderesult-web.md` e `code-standards.md`.

## Visão geral do fluxo

Quando criamos uma nova tela, normalmente passamos por estes passos:

1. Criar o componente de página em `src/standardized/pages/...`, usando `createRouteTab`.
2. Registrar o componente na tabela de componentes em `src/routes/RouteComponents/index.tsx`.
3. Configurar a rota em `src/routes/RouteList/index.tsx`, associando:
   - Prefixo (ex.: `home`, `users`, `accounts`);
   - Caminho relativo (`path`);
   - Rótulo (`label`) e agrupamento (`group`);
   - Nome do componente (string) compatível com o mapeamento de `RouteComponents`.
4. (Opcional) Ajustar **homepage** padrão e redirecionamentos, quando a nova tela passa a ser a “tela inicial” do sistema.

Todo esse fluxo é integrado ao sistema de **abas** (Tabs) através do `TabsProvider` e do `MwTabs`.

## 1. Criando a página em `standardized/pages`

- Nova implementação deve, sempre que possível, ser criada em `src/standardized/pages`.
- A página deve exportar um componente padrão criado com `createRouteTab`:
  - Isso garante integração com o sistema de abas (`TabsProvider`) e com o `MwTabs`.
  - O componente recebe `props` no formato esperado pelo `createRouteTab` (incluindo `data.route` quando necessário).

Exemplo simplificado de página:

```ts
import MwManagerContainer from '../../../components/ManagerContainer'
import { Header } from '../../../components/Header'
import { createRouteTab } from '../../../routes'

const ExamplePage = createRouteTab(() => {
  return (
    <MwManagerContainer>
      <Header description='Título da Tela' />

      <div />

      <div />
    </MwManagerContainer>
  )
})

export default ExamplePage
```

Pontos importantes:

- Usar os componentes internos (`Header`, `MwManagerContainer`, etc.) quando fizer sentido.
- Se a tela depende de contexto próprio (estado complexo, fetch, etc.), criar um `Provider` específico e passá-lo como segundo argumento para `createRouteTab`, seguindo o padrão de telas como `Peoples`, `Roles`, `Teams`, etc.

## 2. Registrando o componente em `RouteComponents`

O arquivo `src/routes/RouteComponents/index.tsx` é responsável por mapear **nomes de componentes** (strings) usados nas rotas para os **React components** reais.

Passos:

1. Importar o componente da página:

```ts
import ExamplePage from '../../standardized/pages/ExamplePage'
```

2. Adicionar a entrada no objeto passado para `MwTabs.mapComponents`:

```ts
const RouteComponents = MwTabs.mapComponents<
  string,
  {
    route: RouteComponentProps
    dirty?: boolean
  }
>({
  // ...
  ExamplePage,
  // ...
})
```

Regras:

- A chave usada no objeto (`ExamplePage`, no exemplo) **deve** ser igual ao valor usado em `component` na configuração da rota em `RouteList`.
- Nomes em formato `"Namespace.Name"` (ex.: `'ControlPanel.Home'`, `'Users.Grid'`) também são suportados, desde que consistentes entre `RouteList` e `RouteComponents`.

## 3. Definindo a rota em `RouteList`

O arquivo `src/routes/RouteList/index.tsx` contém o mapa de rotas de negócio (`RouteList`), agrupado por prefixo:

```ts
const RouteList: {
  [K: string]: RouteListItem[]
} = {
  home: [ /* rotas de home */ ],
  accounts: [ /* rotas de contas */ ],
  users: [ /* rotas de usuários */ ],
  // ...
}
```

Cada item (`RouteListItem`) descreve:

- `path`: segmento da URL após o prefixo;
- `component`: nome do componente conforme mapeado em `RouteComponents`;
- `label`: rótulo da aba;
- `group`: agrupamento para organização no menu / métricas;
- `primary?`: indica rota “principal” daquele grupo;
- `by?`: define como a rota é comparada (`route`, `pathname` ou `url`) no contexto de abas;
- `data.route`: sempre inicializado com `{} as RouteComponentProps` (placeholder).

### Montagem do path final

A rota real que o usuário acessa segue o padrão:

- URL base protegida: `/main`;
- Prefixo do grupo: chave de `RouteList` (ex.: `home`, `users`);
- `path` do item.

Ou seja, o `MainRoutes` monta:

```ts
path = [basePath, prefix, url].join('/')
```

Na prática:

- Prefixo `home`, `path: ''` → `/main/home`
- Prefixo `home`, `path: 'dashboard-home'` → `/main/home/dashboard-home`
- Prefixo `users`, `path: 'people'` → `/main/users/people`

### Exemplo de rota para uma nova página

No grupo `home`, uma nova tela pode ser registrada assim:

```ts
home: [
  {
    path: '',
    data: {
      route: {} as RouteComponentProps,
    },
    primary: true,
    group: 'home/main',
    label: 'Home',
    component: 'ExamplePage',
  },
  // demais rotas (dashboard-home, control-panel, etc.)
]
```

Detalhes:

- `path: ''` faz com que a URL final seja `/main/home`.
- `component: 'MainHome'` **precisa** existir em `RouteComponents`.
- `primary: true` indica que esta é a rota “principal” do grupo `home`.
- `group: 'home/main'` é usado para organização e relatórios internos.

## 4. Integração com abas (`TabsProvider` e `createRouteTab`)

- `TabsProvider` (`src/routes/TabsProvider`) é responsável por:
  - Gerenciar a lista de abas abertas;
  - Restaurar abas a partir de `localStorage` (`TABS_CACHE_KEY`);
  - Mapear um `RouteComponentProps` para um `RouteListItem` via `getInfo`/`getInfoAndIndex`;
  - Determinar a homepage via `getHomePage()` (com base nos cookies do usuário).
- `createRouteTab` converte um componente de página em um componente compatível com `MwTabs`, integrando:
  - `setTitle` (atualização de label da aba);
  - `close` e `beforeClose` (fechamento da aba, incluindo lógica de redirecionamento de volta para a homepage);
  - `dirty` (controle de alterações não salvas).

Ao registrar a rota em `RouteList` e o componente em `RouteComponents`, qualquer acesso à URL (`/main/...`) passa a:

1. Ser validado pelo `RouteList` (via `getInfo`);
2. Ser empurrado para o contexto de abas (`push` do `TabsProvider`);
3. Renderizar o componente wrapped pelo `createRouteTab`.

## 5. Homepage e nova tela inicial

O processo de definição da “tela inicial” usa os cookies de usuário e o helper `getHomePage`:

- No login (`src/screens/Login/Form/index.tsx`):
  - Após autenticar, é definido um `home` (ex.: `'/main/home'`) e salvo em:
    - `data.homepage`;
    - cookie `_GIV_USER.HOME_URL`.
- Em `TabsProvider/functions.ts`:
  - `getHomePage()` lê o cookie (`getUserCookies`) e devolve o `homepage` como URL padrão.
  - Ao fechar todas as abas ou ao precisar redirecionar para a home, esta função é usada.
- Outros pontos de fallback (ex.: renovação de senha ou aceite de termos) também usam `HOME_URL` ou um padrão estático (`'/main/home'`).

Quando uma nova tela passa a ser a “Home” do sistema, é necessário:

1. Ajustar o valor padrão usado no login para o novo path (ex.: `'/main/home'`).
2. Atualizar fallbacks em pontos como:
   - Renovação de senha (`src/screens/PasswordUpdate/Form/services/renew/index.ts`);
   - Aceite de termos pendentes (`src/standardized/pages/Terms/Pendings/index.tsx`);
3. Garantir que `RouteList` e `RouteComponents` estejam configurados para essa nova rota.

## 6. Resumo do passo a passo para novas telas

Para criar uma nova tela acessível por rota e aba:

1. **Criar a página**
   - Em `src/standardized/pages/NomeDaTela/index.tsx`;
   - Exportar como `default` um componente criado com `createRouteTab`.

2. **Registrar em `RouteComponents`**
   - Importar a página em `src/routes/RouteComponents/index.tsx`;
   - Adicionar a entrada no objeto de `MwTabs.mapComponents` com a chave que será usada em `RouteList.component`.

3. **Adicionar rota em `RouteList`**
   - Escolher o prefixo (`home`, `users`, `accounts`, etc.);
   - Definir `path`, `label`, `group`, `component` e `primary?` no array do prefixo escolhido.

4. **(Opcional) Tornar a nova tela a homepage**
   - Atualizar o path padrão de `home` após login;
   - Ajustar fallbacks de `HOME_URL` em fluxos de renovação de senha, aceite de termos etc.;
   - Confirmar que `getHomePage()` aponta para a nova rota.

Seguindo estes passos, a nova tela fica integrada ao menu, às rotas `/main/...` e ao gerenciamento de abas da aplicação.
