import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{i,t as a}from"./components-DJRlJOe-.js";import{c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./argTypes-BVglTDE1.js";var h,g,_,v,y;t((()=>{o(),h=e(n(),1),a(),l(),g=r(),_={id:`SelectMulti`,title:`Components/Select/Multi`,component:i,parameters:{layout:`fullscreen`},tags:[`autodocs`],argTypes:{...p,applyRules:{description:`List of rules to enable the apply button.`},finder:{description:`Callback used to apply a local search when toggling the "selected" switch.`}}},v={args:{label:`Personagem de Star Wars`,placeholder:`Selecione os personagens`,clearable:!0,finder:u,rules:m,applyRules:[{id:`min`,allow:e=>e.length>=2,Component:()=>`Selecione pelo menos 2 personagens`},{id:`max`,allow:e=>e.length<=4,Component:()=>`Selecione até 4 personagens`}]},render:e=>{let[t,n]=(0,h.useState)([]);return(0,g.jsx)(s,{children:(0,g.jsx)(i,{type:`multi-select`,...e,loader:c,finder:u,getKey:f,OptionComponent:d,rules:m,value:t,setValue:n})})}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Personagem de Star Wars',
    placeholder: 'Selecione os personagens',
    clearable: true,
    finder,
    rules,
    applyRules: [{
      id: 'min',
      allow: value => value.length >= 2,
      Component: () => 'Selecione pelo menos 2 personagens'
    }, {
      id: 'max',
      allow: value => value.length <= 4,
      Component: () => 'Selecione até 4 personagens'
    }]
  },
  render: args => {
    const [value, setValue] = useState<Option[]>([]);
    return <StoryWrapper>
        <Select type='multi-select' {...args as SelectMultiProps<Option>} loader={loader} finder={finder} getKey={getKey} OptionComponent={OptionComponent} rules={rules} value={value} setValue={setValue} />
      </StoryWrapper>;
  }
}`,...v.parameters?.docs?.source}}},y=[`SelectMulti`]}))();export{v as SelectMulti,y as __namedExportsOrder,_ as default};