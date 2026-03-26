# Manutencao por IA

## Objetivo

Definir como uma IA deve trabalhar no `mw-core` sem quebrar os wrappers procedurais que dependem dele.

## Regras obrigatorias

1. nao adicionar React, Vue, bundler ou dependencia externa no uso final
2. preservar `window.FinacUIMWCore`
3. manter `mw-core.js` e `mw-core.css` utilizaveis por inclusao direta
4. atualizar exemplos e docs dos wrappers quando o contrato compartilhado mudar

## Fluxo recomendado

1. ler `mw-core/README.md`
2. ler `mw-core/documents/contrato-da-api.md`
3. ajustar o comportamento compartilhado aqui
4. atualizar os wrappers `mw-*` apenas se a API publica realmente mudar

## Pontos sensiveis atuais

- `createModal()` e usado por varios wrappers
- `beforeClose` afeta qualquer fluxo que dependa de `instance.close()`
- `setFooterActions()` re-renderiza botoes e pode alterar referencias antigas
- ajustes de CSS em `.gumw-modal*` impactam todos os wrappers de modal

## Checklist minimo

- validar sintaxe do `mw-core.js`
- revisar wrappers que usam `createModal()`
- garantir que `beforeClose` nao bloqueia fluxos validos sem querer
- garantir que `setFooterActions()` continua respeitando `loading`, `disabled`, `appearance` e `color`
- verificar overflow visual do modal depois de ajustes em `mw-core.css`
