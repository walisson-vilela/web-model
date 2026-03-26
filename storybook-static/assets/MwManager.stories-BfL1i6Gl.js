import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{n as o,t as s}from"./Button-BLRRkxhG.js";import{n as c,t as l}from"./Input-CNfwAAHR.js";import{a as u,c as d,d as f,f as p,g as m,h,i as g,l as _,n as v,o as y,p as b,r as x,s as S,t as C,u as w}from"./MwManager-bfz1LzHc.js";var T,E,D=t((()=>{r(),T=i.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > div {
    position: initial;

    display: flex;
    align-items: center;
    height: 100%;

    > label input {
      border: 0;
    }
    > label button {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
    }
    > label + div {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      left: 14px;
      height: 17px;
      width: calc(100% - 24px - 28px);
    }
  }
`,E=i.div`
  & > div {
    position: initial;
    & > div {
      border: none;
    }
  }
`})),O,k,A=t((()=>{n(),c(),m(),w(),d(),y(),g(),p(),D(),O=a(),k=e=>{let{filters:t,search:n,reloader:r,loading:i,pagination:a,calendar:o,calendarInterval:s,children:c,before:d,after:p}=e,m=e.except||{paginator:!0,calendar:!0,calendarInterval:!0},g=[];d&&g.push(...Array.isArray(d)?d:[d]);let v=()=>{};if(a){let{setPage:e,reset:t,isLastPage:n,paginator:r}=a;v=t||(()=>e?.(1)),r&&!m.paginator&&g.push((0,O.jsx)(u,{loader:r,loading:i,isLastPage:n}))}if(r&&!m.reloader&&g.push((0,O.jsx)(x,{reloader:r,loading:i})),n&&!m.search){let{setSearch:e,search:t}=n;g.push((0,O.jsx)(f,{search:t,setSearch:t=>{e(t),v()},disabled:i,icon:`feather`,width:`250px`,transparent:!0,fluid:!0}))}if(t){let{appliedFilters:e,setAppliedFilters:n,bottomMargin:r}=t,a=e=>{n(e),v()};m.applied||g.push((0,O.jsx)(_,{setAppliedFilters:a,appliedFilters:e,loading:i})),m.filters||g.push((0,O.jsx)(S,{appliedFilters:e,setAppliedFilters:a,filters:t.filters,loading:i,bottomMargin:r}))}if(o&&!m.calendar){let{date:e,setDate:t}=o;g.push((0,O.jsx)(T,{children:(0,O.jsx)(l,{type:`datepicker`,picker:{position:`right bottom`},value:e,setValue:t,disabled:i,borderless:!0,paddingless:!0})}))}if(s&&!m.calendarInterval){let{dateInterval:e,setDateInterval:t}=s;g.push((0,O.jsx)(E,{children:(0,O.jsx)(l,{type:`date-interval-picker`,value:e,setValue:t,disabled:i,borderless:!0,paddingless:!0})}))}return p&&g.push(...Array.isArray(p)?p:[p]),(0,O.jsx)(h,{left:c,right:g})},k.useDefaultDateIntervalState=l.useDefaultDateIntervalState,k.__docgenInfo={description:``,methods:[],displayName:`Toolbar`,props:{filters:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  filters: Filter[]
  appliedFilters: AppliedFilter[]
  setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
  bottomMargin?: number
}`,signature:{properties:[{key:`filters`,value:{name:`Array`,elements:[{name:`Filter`}],raw:`Filter[]`,required:!0}},{key:`appliedFilters`,value:{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`,required:!0}},{key:`setAppliedFilters`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}],required:!0}},{key:`bottomMargin`,value:{name:`number`,required:!1}}]}},description:``},search:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  search?: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}`,signature:{properties:[{key:`search`,value:{name:`string`,required:!1}},{key:`setSearch`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<string>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<string>`,elements:[{name:`string`}]}],required:!0}}]}},description:``},reloader:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``},pagination:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  setPage?: React.Dispatch<React.SetStateAction<number>>
  reset?: () => void
  isLastPage: boolean
  paginator?: () => void
}`,signature:{properties:[{key:`setPage`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<number>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<number>`,elements:[{name:`number`}]}],required:!1}},{key:`reset`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}},{key:`isLastPage`,value:{name:`boolean`,required:!0}},{key:`paginator`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}}]}},description:``},calendar:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
}`,signature:{properties:[{key:`date`,value:{name:`string`,required:!0}},{key:`setDate`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<string>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<string>`,elements:[{name:`string`}]}],required:!0}}]}},description:``},calendarInterval:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  dateInterval: [string, string]
  setDateInterval: React.Dispatch<
    React.SetStateAction<[string, string]>
  >
}`,signature:{properties:[{key:`dateInterval`,value:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}],required:!0}},{key:`setDateInterval`,value:{name:`ReactDispatch`,raw:`React.Dispatch<
  React.SetStateAction<[string, string]>
>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<[string, string]>`,elements:[{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]}]}],required:!0}}]}},description:``},children:{required:!1,tsType:{name:`union`,raw:`React.ReactElement | React.ReactElement[]`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`},{name:`Array`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`}],raw:`React.ReactElement[]`}]},description:``},before:{required:!1,tsType:{name:`union`,raw:`React.ReactElement | React.ReactElement[]`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`},{name:`Array`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`}],raw:`React.ReactElement[]`}]},description:``},after:{required:!1,tsType:{name:`union`,raw:`React.ReactElement | React.ReactElement[]`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`},{name:`Array`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`}],raw:`React.ReactElement[]`}]},description:``},except:{required:!1,tsType:{name:`Except`},description:``}}}})),j,M,N,P,F,I,L,R,z,B,V;t((()=>{j=e(n(),1),M=e(n(),1),o(),v(),A(),N=a(),P=[{label:`Status`,name:`status`,options:[{label:`Ativo`,value:`ativo`},{label:`Inativo`,value:`inativo`},{label:`Pendente`,value:`pendente`}]},{label:`Categoria`,name:`categoria`,options:[{label:`Financeiro`,value:`financeiro`},{label:`Operacional`,value:`operacional`},{label:`Comercial`,value:`comercial`}]}],F=[{content:`Nome`,key:`name`,width:5,sortKey:`name`},{content:`Altura`,key:`height`,width:3,sortKey:`height`,textAlign:`center`,type:`numeric`},{content:`Filmes`,key:`films`,width:2,sortKey:`films`,textAlign:`center`,type:`numeric`},{content:`Veiculos`,key:`vehicles`,width:3,sortKey:`vehicles`,textAlign:`center`,type:`numeric`},{content:`Naves`,key:`starships`,width:3,sortKey:`starships`,textAlign:`center`,type:`numeric`}],I=[{name:`Luke Skywalker`,height:172,films:5,vehicles:2,starships:2},{name:`C-3PO`,height:167,films:6,vehicles:0,starships:0},{name:`R2-D2`,height:96,films:7,vehicles:0,starships:0},{name:`Darth Vader`,height:202,films:4,vehicles:0,starships:1},{name:`Leia Organa`,height:150,films:5,vehicles:1,starships:0},{name:`Owen Lars`,height:178,films:3,vehicles:0,starships:0},{name:`Beru Whitesun lars`,height:165,films:3,vehicles:0,starships:0},{name:`R5-D4`,height:97,films:1,vehicles:0,starships:0},{name:`Biggs Darklighter`,height:183,films:1,vehicles:0,starships:1},{name:`Obi-Wan Kenobi`,height:182,films:6,vehicles:1,starships:5}],L=e=>[{content:`Editar`,onClick:()=>void 0,rules:[],closeOnClick:!0},{content:`Excluir`,onClick:()=>void 0,rules:[],closeOnClick:!0}],R=()=>{let[e,t]=(0,M.useState)(1),[n,r]=(0,M.useState)(null),[i,a]=(0,M.useState)([]),[o,c]=(0,M.useState)(``),[l,u]=(0,M.useState)(new Date().toISOString().slice(0,10)),[d,f]=(0,M.useState)(k.useDefaultDateIntervalState()),[p,m]=(0,M.useState)([]),h=I,g=(0,M.useMemo)(()=>({checkeds:i,setCheckeds:a}),[i,a]);return(0,N.jsxs)(b,{children:[(0,N.jsx)(k,{filters:{filters:P,appliedFilters:p,setAppliedFilters:m},search:{search:o,setSearch:c},loading:!1,reloader:()=>void 0,pagination:{setPage:t,isLastPage:!0},calendar:{date:l,setDate:u},calendarInterval:{dateInterval:d,setDateInterval:f},except:{paginator:!0,calendar:!1,calendarInterval:!1},children:[(0,N.jsx)(j.Fragment,{children:`Elemento 1`},`left-1`),(0,N.jsx)(j.Fragment,{children:(0,N.jsx)(s,{appearance:`bordered`,size:`tiny`,content:`Botão 1`})},`left-2`)],before:[(0,N.jsx)(j.Fragment,{children:`Elemento 3`},`before-1`)],after:[(0,N.jsx)(j.Fragment,{children:`Elemento 4`},`after-1`)]}),(0,N.jsx)(C,{columns:F,rows:h,hasFilters:!1,loading:!1,page:e,setPage:t,sort:{sort:n,setSort:r},paginator:()=>void 0,checkeds:g,getItemMenu:L,itemMenuVerticalAlign:`center`,borderless:!1})]})},z={id:`Manager`,title:`Components/Manager`,component:C,parameters:{layout:`fullscreen`},tags:[`autodocs`]},B={render:()=>(0,N.jsx)(R,{})},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <ManagerExample />
}`,...B.parameters?.docs?.source}}},V=[`Example`]}))();export{B as Example,V as __namedExportsOrder,z as default};