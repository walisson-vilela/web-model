import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Form-BqpbciIA.js";import{n as o,t as s}from"./Input-CZLJcecz.js";var c,l=t((()=>{c={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}},control:`text`},name:{description:`Form field name. Required to Form Context to work`,table:{defaultValue:{summary:`Name`}},control:`text`},placeholder:{description:`Input placeholder.`,table:{defaultValue:{summary:`Text`}},control:`text`},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},arrows:{description:`Define if input number shows html arrows.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},loading:{description:`Define if input is loading.`,table:{defaultValue:{summary:`false`}},control:`boolean`},clearable:{description:`Define if input is clearable.`,table:{defaultValue:{summary:`false`}},control:`boolean`},readOnly:{description:`Define if input is on read only mode.`,table:{defaultValue:{summary:`false`}},control:`boolean`},setValue:{description:`Define if input is clearable and it's function.`},type:{description:`Input type.`,table:{defaultValue:{summary:`text`}}},icon:{description:`Input type.`},mask:{description:`Input mask.`}}})),u,d,f,p,m,h;t((()=>{u=e(n(),1),i(),o(),l(),d=r(),f={id:`Input`,title:`Components/Input/type="text" or "number" or "search" or "email" or "url"`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p=e=>{let t=e.replaceAll(`.`,``);return[t.substring(0,3),t.substring(3,6),t.substring(6,9)].filter(e=>e!==``).join(`.`)},m={args:{label:`Label`,name:`name`,placeholder:`Text`,required:!1,arrows:!1,disabled:!1,invalid:!1,loading:!1,clearable:!1,readOnly:!1,type:`text`,icon:{icon:{type:`feather`,icon:`zap`,color:`green`,onClick:()=>{console.log(`icon clicked`)}},position:`left`},mask:p},render:e=>{let[t,n]=(0,u.useState)(`1234`);return(0,u.useEffect)(()=>{console.log(`set value to: "${t}"`,t)},[t]),(0,d.jsx)(a,{children:(0,d.jsx)(s,{...e,value:t,setValue:n})})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    name: 'name',
    placeholder: 'Text',
    required: false,
    arrows: false,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: false,
    readOnly: false,
    type: 'text',
    icon: {
      icon: {
        type: 'feather',
        icon: 'zap',
        color: 'green',
        onClick: () => {
          console.log('icon clicked');
        }
      },
      position: 'left'
    },
    mask: cpf
  },
  render: args => {
    const [value, setValue] = useState<string>('1234');
    useEffect(() => {
      console.log(\`set value to: "\${value}"\`, value);
    }, [value]);
    return <Form>
        <Input {...args} {...{
        value,
        setValue
      }} />
      </Form>;
  }
}`,...m.parameters?.docs?.source}}},h=[`InputStory`]}))();export{m as InputStory,h as __namedExportsOrder,f as default};