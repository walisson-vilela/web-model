import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Button-BLRRkxhG.js";import{n as o,t as s}from"./Modal-BHf3hx4n.js";import{n as c,r as l,t as u}from"./argTypes-jMQ-pZed.js";var d,f,p,m,h;t((()=>{d=e(n(),1),i(),o(),l(),f=r(),p={id:`AuditModal`,title:`Components/Modal/AuditModal`,component:s.Audit,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:u},m={args:{...c},render:e=>{let[t,n]=(0,d.useState)(!1);return(0,f.jsxs)(d.Fragment,{children:[(0,f.jsx)(a,{content:`Open modal`,onClick:()=>n(!0)}),(0,f.jsx)(s.Audit,{...e,openState:[t,n],cancelAction:()=>alert(`Cancelar`),confirmAction:()=>alert(`Confirmado`)})]})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs
  },
  render: args => {
    const [open, setOpen] = useState<boolean>(false);
    return <React.Fragment>
        <Button content='Open modal' onClick={() => setOpen(true)} />

        <Modal.Audit {...args} openState={[open, setOpen]} cancelAction={() => alert('Cancelar')} confirmAction={() => alert('Confirmado')} />
      </React.Fragment>;
  }
}`,...m.parameters?.docs?.source}}},h=[`AuditModal`]}))();export{m as AuditModal,h as __namedExportsOrder,p as default};