import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{i,t as a}from"./components-DJRlJOe-.js";import{a as o,c as s,i as c,l,n as u,r as d,s as f,t as p,u as m}from"./argTypes-BVglTDE1.js";var h,g,_,v,y;t((()=>{s(),h=e(n(),1),a(),u(),g=r(),_={id:`SelectSingle`,title:`Components/Select/Single`,component:i,parameters:{layout:`fullscreen`},tags:[`autodocs`],argTypes:p},v={args:{label:`Personagem de Star Wars`,placeholder:`Selecione o personagem`,clearable:!0,rules:m},render:e=>{let[t,n]=(0,h.useState)(null);return(0,g.jsx)(c,{children:(0,g.jsx)(i,{type:`single-select`,...e,loader:l,getKey:f,OptionComponent:d,ValueComponent:o,value:t,setValue:n})})}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Personagem de Star Wars',
    placeholder: 'Selecione o personagem',
    clearable: true,
    rules
  },
  render: args => {
    const [value, setValue] = useState<Option | null>(null);
    return <StoryWrapper>
        <Select type='single-select' {...args as SelectSingleProps<Option>} loader={loader} getKey={getKey} OptionComponent={OptionComponent} ValueComponent={ValueComponent} value={value} setValue={setValue} />
      </StoryWrapper>;
  }
}`,...v.parameters?.docs?.source}}},y=[`SelectSingle`]}))();export{v as SelectSingle,y as __namedExportsOrder,_ as default};