import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./RadioButton-D-rEoQwX.js";var o,s=t((()=>{o={name:{description:`required prop to register the input `,table:{defaultValue:{summary:`String`}}},label:{description:`text that will be next to the input`,table:{defaultValue:{summary:``}}},disabled:{description:`Define if the button is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},checked:{description:`Define if the button is checked.`,table:{defaultValue:{summary:`false`}},control:`boolean`},required:{description:`Define if the button is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if the button is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},onChange:{description:`Input action handler.`,table:{type:{summary:`(event) => void`,detail:`event:  FormEvent<HTMLInputElement>`},defaultValue:{summary:`() => {}`}}},onClick:{description:`Input action handler.`,table:{type:{summary:`(event) => void`,detail:`event: MouseEvent<HTMLButtonElement, MouseEvent>`},defaultValue:{summary:`() => {}`}}},type:{description:`Input type.`,table:{defaultValue:{summary:`radio`}}}}})),c,l,u,d,f;t((()=>{c=e(n(),1),i(),s(),l=r(),u={id:`Radio`,title:`Components/Input/type="radio"`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:o},d={args:{name:``,label:`Input label`,disabled:!1,checked:!1,required:!1,invalid:!1},render:e=>{let[t,n]=(0,c.useState)(!1);return(0,l.jsx)(a,{...e,type:`radio`,onChange:e=>n(e.target.checked),checked:t})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    name: '',
    label: 'Input label',
    disabled: false,
    checked: false,
    required: false,
    invalid: false
  },
  render: args => {
    const [checked, setChecked] = useState(false);
    return <Radio {...args} type='radio' onChange={e => setChecked(e.target.checked)} checked={checked} />;
  }
}`,...d.parameters?.docs?.source}}},f=[`RadioStory`]}))();export{d as RadioStory,f as __namedExportsOrder,u as default};