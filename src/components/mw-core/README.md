# mw-core

Base compartilhada em JavaScript puro para os componentes procedurais extraidos do `mw-ui`.

## O que esta pasta entrega

- `mw-core.js`: helpers de DOM, tema e implementacoes vanilla dos componentes.
- `mw-core.css`: tokens e estilos base reutilizados pelas pastas `mw-*`.
- `documents/`: contexto para manutencao e evolucao do core compartilhado.

## Objetivo

Centralizar o comportamento comum para evitar duplicacao entre `mw-button`, `mw-input`, `mw-select`, `mw-calendar`, `mw-filters`, `mw-modal` e os demais componentes procedurais.

## Uso

```html
<link rel="stylesheet" href="/finac-ui/mw-core/mw-core.css"/>
<script src="/finac-ui/mw-core/mw-core.js"></script>
```

Os wrappers individuais chamam essa base por meio de `window.FinacUIMWCore`.

## Pontos relevantes da versao atual

- `createModal(config)` agora aceita `beforeClose`, permitindo bloquear o fechamento do modal durante operacoes assincronas.
- a instancia retornada por `createModal()` agora expoe `setFooterActions(actions)`, permitindo trocar botoes do rodape dinamicamente.
- `.gumw-modal-content` passou a usar `box-sizing: border-box`, reduzindo efeitos colaterais de overflow em modais com `customSize`.

## Arquivos de apoio

Leia tambem `./documents/README.md`.
