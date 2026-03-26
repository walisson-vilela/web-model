# Icon

O componente `Icon` é a porta única para ícones do projeto.

## Regra de uso

- Prefira usar `Icon` para qualquer ícone interno do sistema.
- O tipo `feather` usa o registry central `src/assets/icons/feather`.
- Todos os ícones do projeto devem ser consumidos a partir de `src/assets/icons/feather`.
- O tipo `svg` deve ser usado apenas quando o ícone vier como componente React externo.
- O tipo `jsx` é reservado para casos pontuais em que o ícone já está pronto como elemento.

## Registry central

O arquivo [`src/assets/icons/feather/index.ts`](/home/walisson/Projetos/finac/apps/web/src/assets/icons/feather/index.ts) concentra os SVGs padrão do projeto.
O arquivo [`mwCoreIcons.ts`](./mwCoreIcons.ts) ficou apenas como wrapper de compatibilidade.

Ele exporta:

- `featherIcons`
- `featherIconNames`
- `FeatherIconName`

### Exemplo

```tsx
import { Icon } from '@/components'

<Icon type='feather' icon='dashboard' />
<Icon type='feather' icon='settings' />
<Icon type='feather' icon='contract' />
```

## Nomes disponíveis

Os nomes do registry seguem o padrão técnico do projeto e ficam disponíveis para autocomplete via TypeScript:

- `settings`
- `import_export`
- `invoice_management`
- `invoice`
- `management`
- `global`
- `doc_checked`
- `contract`
- `table`
- `classification`
- `group`
- `user`
- `dashboard`

## Observação

Os textos exibidos na interface podem continuar no idioma do produto.
Componentes e páginas seguem inglês e `camelCase`.
As chaves do registry de ícones seguem o barrel de `src/assets/icons/feather` e, hoje, usam `snake_case` por compatibilidade.
