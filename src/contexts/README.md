# Contexts

Use `Context` para estado compartilhado de UI e sessão quando o estado precisa
ser lido e alterado em mais de uma tela.

Regras:

- Não usar Redux neste projeto.
- Estado global pequeno e previsível deve viver em `src/contexts`.
- Estado exclusivo de uma página continua dentro de `src/pages/<PageName>`.
- Estado de componente continua local no próprio componente.
- Lógica de persistência fica em `services.ts` do contexto.
- Tipos ficam em `interfaces.ts`.
- O provider fica no `index.tsx`.
- O hook de consumo pode viver em `useAuth.ts` ou arquivo equivalente do contexto.
- Evite misturar lógica de UI com persistência no mesmo arquivo do provider quando isso impactar Fast Refresh ou legibilidade.

Estrutura sugerida:

```text
src/contexts/
  index.ts
  README.md
  auth/
    index.tsx
    useAuth.ts
    interfaces.ts
    services.ts
```

Contextos hoje:

- `AuthProvider`
- `useAuth`

## Auth

O contexto de auth atual controla:

- sessão autenticada
- persistência em `localStorage` ou `sessionStorage`
- `signIn`
- `signOut`

Esse contexto é consumido por:

- `Login`
- `Home`
- `RequireAuth`
- `Storybook`
