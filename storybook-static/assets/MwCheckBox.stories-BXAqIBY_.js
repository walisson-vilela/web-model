import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Form-BqpbciIA.js";import{n as o,t as s}from"./Checkbox-BAIuYiF7.js";var c,l=t((()=>{c={name:{description:`Form field name. Required to Form Context to work`,table:{defaultValue:{summary:`Name`}},control:`text`},label:{description:`text that will be next to the input`,table:{defaultValue:{summary:``}}},disabled:{description:`Define if the button is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},required:{description:`Define if the button is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if the button is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},onChange:{description:`Input action handler.`,table:{type:{summary:`(event) => void`,detail:`event:  FormEvent<HTMLInputElement>`},defaultValue:{summary:`() => {}`}}},onClick:{description:`Input action handler.`,table:{type:{summary:`(event) => void`,detail:`event: MouseEvent<HTMLButtonElement, MouseEvent>`},defaultValue:{summary:`() => {}`}}},padding:{description:`Input padding.`},type:{description:`Input type.`,table:{defaultValue:{summary:`checkbox`}}}}})),u,d,f,p,m;t((()=>{u=e(n(),1),i(),o(),l(),d=r(),f={id:`Checkbox`,title:`Components/Input/type="checkbox"`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p={args:{name:`name`,label:`Input label`,disabled:!1,required:!1,invalid:!1,padding:{top:`s1`,left:`s2`,bottom:`s3`,right:`21px`},type:`checkbox`},render:e=>{let[t,n]=(0,u.useState)(!0);return(0,u.useEffect)(()=>{console.log({value:t})},[t]),(0,d.jsx)(a,{children:(0,d.jsx)(s,{...e,onChange:e=>n(e.target.checked),checked:t})})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'name',
    label: 'Input label',
    disabled: false,
    required: false,
    invalid: false,
    padding: {
      top: 's1',
      left: 's2',
      bottom: 's3',
      right: '21px'
    },
    type: 'checkbox'
  },
  render: args => {
    const [checked, setChecked] = useState<boolean>(true);
    useEffect(() => {
      console.log({
        value: checked
      });
    }, [checked]);
    return <Form>
        <Checkbox {...args} onChange={e => setChecked(e.target.checked)} checked={checked} />
      </Form>;
  }
}`,...p.parameters?.docs?.source}}},m=[`CheckboxStory`]}))();export{p as CheckboxStory,m as __namedExportsOrder,f as default};