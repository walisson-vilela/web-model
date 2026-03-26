# Contrato da API

## Namespace global

```js
window.FinacUIMWCore
```

## Recursos principais

- `theme`: tokens visuais compartilhados
- `html(html)`: marca conteudo HTML confiavel
- `mount(target, item, options)`: monta um `Node` ou instancia em um seletor ou `Node`
- `create*`: fabrica os componentes vanilla usados pelos wrappers `mw-*`

## Fabricas compartilhadas mais usadas

- `createButton(config)`
- `createLoader(config)`
- `createInput(config)`
- `createSelect(config)`
- `createCalendar(config)`
- `createFilters(config)`
- `createTabs(config)`
- `createToastManager(config)`
- `createModal(config)`

## Contrato de `createModal(config)`

Campos mais usados:

- `title`
- `content`
- `footer`
- `footerMessage`
- `loading`
- `size`
- `customSize`
- `color`
- `inverted`
- `closeOnClickOutside`
- `closeOnEsc`
- `beforeClose(instance)`
- `contentPadding`

### `beforeClose(instance)`

Quando informado:

- e executado antes do fechamento real do modal
- se retornar `false`, o fechamento e cancelado
- vale para:
  - clique fora do modal
  - `Esc`
  - botao de fechar
  - chamadas internas que usam `instance.close()`

## Metodos da instancia retornada por `createModal()`

- `instance.open()`
- `instance.close()`
- `instance.setTitle(value)`
- `instance.setContent(value)`
- `instance.setLoading(value)`
- `instance.setFooterMessage(value)`
- `instance.setFooterActions(actions)`

### `setFooterActions(actions)`

Permite reconstruir dinamicamente os botoes do rodape.

Formato esperado:

```js
instance.setFooterActions([
  {
    content: 'Cancelar',
    appearance: 'borderless',
    disabled: false,
    onClick: function (event, instance) {}
  },
  {
    content: 'Salvar',
    loading: true,
    disabled: true,
    onClick: function (event, instance) {}
  }
])
```

## Regras

- a base deve continuar funcionando sem build
- a base nao pode depender de React
- alteracoes compartilhadas devem ser feitas primeiro aqui, antes dos wrappers
- quando a API do modal mudar, os wrappers dependentes devem ser revisados
