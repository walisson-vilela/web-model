import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Tabs-C2C64xq0.js";var o,s,c,l,u,d,f,p;t((()=>{o=e(n(),1),i(),s=r(),c={id:`Tabs`,title:`Components/Tabs`,component:a,parameters:{layout:`centered`},tags:[`autodocs`]},l=a.buildComponent(e=>((0,o.useEffect)(()=>(console.log(e.data,`mount component`),()=>{console.log(e.data,`unmount component`)}),[e.data]),(0,s.jsx)(o.Fragment,{children:e.label})),e=>((0,o.useEffect)(()=>(console.log(e.data,`mount provider`),()=>{console.log(e.data,`unmount provider`)}),[e.data]),(0,s.jsx)(o.Fragment,{children:e.children}))),u=a.mapComponents({MyTabComponent:l}),d=[{key:0,data:0,label:`Painel de Controle`,component:`MyTabComponent`},{key:1,data:1,label:`Editar PDV 200578`,component:`MyTabComponent`,group:`stores`},{key:2,data:2,label:`Editar Usuário 102547`,component:`MyTabComponent`,group:`users`},{key:3,data:3,label:`Calendário`,component:`MyTabComponent`},{key:4,data:4,label:`Usuários`,component:`MyTabComponent`,group:`users`,primary:!0},{key:5,data:5,label:`Editar Usuário 101518`,component:`MyTabComponent`,group:`users`},{key:6,data:6,label:`Editar PDV 200112`,component:`MyTabComponent`,group:`stores`},{data:7,label:`PDV`,component:`MyTabComponent`,group:`stores`,primary:!0}],f={args:{},render:()=>{let[e,t]=(0,o.useState)(0),[n,r]=(0,o.useState)(d);return(0,s.jsxs)(o.Fragment,{children:[(0,s.jsx)(a,{active:[e,(e,n)=>{console.log({active:e,data:n}),t(e)}],options:[n,r],components:u}),(0,s.jsx)(`input`,{type:`number`,placeholder:`type the active tab and hit enter`,onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),t(parseInt(e.target.value)))},min:0,max:n.length,style:{width:`432px`}})]})}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const [active, setActive] = useState(0);
    const [tabs, setTabs] = useState(initial);
    return <React.Fragment>
        <Tabs active={[active, (active, data) => {
        console.log({
          active,
          data
        });
        setActive(active);
      }]} options={[tabs, setTabs]} components={components} />

        <input type='number' placeholder='type the active tab and hit enter' onKeyDown={e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const value: number = parseInt((e.target as HTMLInputElement).value);
        setActive(value);
      }} min={0} max={tabs.length} style={{
        width: '432px'
      }} />
      </React.Fragment>;
  }
}`,...f.parameters?.docs?.source}}},p=[`TabsStory`]}))();export{f as TabsStory,p as __namedExportsOrder,c as default};