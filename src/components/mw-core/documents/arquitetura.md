# Arquitetura

## Visao geral

O modulo `finac-ui/mw-core/mw-core.js` expoe o namespace global:

- `FinacUIMWCore.theme`
- `FinacUIMWCore.html(html)`
- `FinacUIMWCore.mount(target, item, options)`
- `FinacUIMWCore.createButton(config)`
- `FinacUIMWCore.createCalendar(config)`
- `FinacUIMWCore.createCard(config)`
- `FinacUIMWCore.createFilters(config)`
- `FinacUIMWCore.createGrid(config)`
- `FinacUIMWCore.createIcon(config)`
- `FinacUIMWCore.createIndicator(config)`
- `FinacUIMWCore.createInput(config)`
- `FinacUIMWCore.createLink(config)`
- `FinacUIMWCore.createLoader(config)`
- `FinacUIMWCore.createMenu(config)`
- `FinacUIMWCore.createModal(config)`
- `FinacUIMWCore.createPlaceholder(config)`
- `FinacUIMWCore.createProgressBar(config)`
- `FinacUIMWCore.createSelect(config)`
- `FinacUIMWCore.createSignature(config)`
- `FinacUIMWCore.createTabs(config)`
- `FinacUIMWCore.createTextArea(config)`
- `FinacUIMWCore.createToastManager(config)`
- `FinacUIMWCore.createZoom(config)`

## Estrutura

- helpers de DOM e de conteudo renderizavel
- tema compartilhado com cores, espacamentos e tamanhos
- fabricas vanilla para os componentes do kit
- CSS centralizado em `mw-core.css`

## Decisao principal

Os wrappers `mw-*` devem ficar finos. Comportamento compartilhado entra no core; especificidades locais ficam nas pastas individuais.

## Papel atual do modal dentro do core

O `createModal(config)` do core passou a concentrar os comportamentos que precisam ser compartilhados entre todos os wrappers de modal:

- abertura e fechamento do overlay
- protecao contra fechamento indevido via `beforeClose`
- troca dinamica do rodape via `setFooterActions()`
- exibicao de loading do corpo
- atualizacao de titulo, conteudo e mensagem de rodape

Com isso:

- `mw-modal` continua fino
- logicas de loading assincrono em botoes nao precisam ser duplicadas em cada wrapper
- templates como `ConfirmDelete` e `ConfirmEdit` herdam o mesmo contrato base

## CSS compartilhado

O `mw-core.css` continua responsavel pelo container principal do modal.

Ajuste relevante da versao atual:

- `.gumw-modal-content` usa `box-sizing: border-box` para reduzir overflow acidental quando o modal recebe `customSize` e padding interno.
