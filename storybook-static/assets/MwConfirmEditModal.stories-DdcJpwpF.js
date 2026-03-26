import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Button-BLRRkxhG.js";import{n as o,t as s}from"./Modal-BHf3hx4n.js";import{n as c,r as l,t as u}from"./argTypes-jMQ-pZed.js";var d,f,p,m,h;t((()=>{d=e(n(),1),i(),o(),l(),f=r(),p={id:`ConfirmEditModal`,title:`Components/Modal/ConfirmEditModal`,component:s.Audit,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:u},m={args:{...c},render:e=>{let[t,n]=(0,d.useState)(!1),[r,i]=(0,d.useState)(!1);return(0,f.jsxs)(d.Fragment,{children:[(0,f.jsx)(a,{content:`Open modal`,onClick:()=>n(!0)}),(0,f.jsx)(s.ConfirmEdit,{...e,openState:[t,n],homeAction:()=>alert(`Go Home`),cancelAction:()=>alert(`Cancelar`),confirmAction:()=>i(!0)}),(0,f.jsx)(s.ConfirmEdit,{...e,openState:[r,i],homeAction:()=>i(!1),cancelAction:()=>alert(`Cancelar`),confirmAction:()=>alert(`Confirmado`),content:`teste`})]})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs
  },
  render: args => {
    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);
    return <React.Fragment>
        <Button content='Open modal' onClick={() => setOpen(true)} />

        <Modal.ConfirmEdit {...args} openState={[open, setOpen]} homeAction={() => alert('Go Home')} cancelAction={() => alert('Cancelar')} confirmAction={() => setOpen2(true)} />

        <Modal.ConfirmEdit {...args} openState={[open2, setOpen2]} homeAction={() => setOpen2(false)} cancelAction={() => alert('Cancelar')} confirmAction={() => alert('Confirmado')} content='teste' />
      </React.Fragment>;
  }
}`,...m.parameters?.docs?.source}}},h=[`ConfirmEditModal`]}))();export{m as ConfirmEditModal,h as __namedExportsOrder,p as default};