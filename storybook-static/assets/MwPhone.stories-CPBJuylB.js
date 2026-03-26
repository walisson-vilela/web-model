import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Phone-C0YMDzHV.js";var o,s=t((()=>{o={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}}},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},loading:{description:`Define if input is loading.`,table:{defaultValue:{summary:`false`}},control:`boolean`},clearable:{description:`Define if input is clearable.`,table:{defaultValue:{summary:`false`}},control:`boolean`},setValue:{description:`Define if input is clearable and it's function.`},type:{description:`Input type.`,table:{defaultValue:{summary:`phone`}}}}})),c,l,u,d,f;t((()=>{c=e(n(),1),i(),s(),l=r(),u={id:`IntlTel`,title:`Components/Input/type="phone"`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:o},d={args:{label:`Label`,required:!1,disabled:!1,invalid:!1,loading:!1,clearable:!1},render:e=>{let[t,n]=(0,c.useState)(``);return(0,c.useEffect)(()=>console.log(t),[t]),(0,l.jsxs)(c.Fragment,{children:[(0,l.jsx)(`button`,{type:`button`,onClick:()=>n(`+55 31982761260`),children:`×`}),(0,l.jsx)(a,{...e,type:`phone`,value:t,setValue:n})]})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    required: false,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: false
  },
  render: args => {
    const [value, setValue] = useState<string>('');
    useEffect(() => console.log(value), [value]);
    return <React.Fragment>
        <button type='button' onClick={() => setValue('+55 31982761260')}>
          &times;
        </button>

        <Phone {...args} type='phone' value={value} setValue={setValue} />
      </React.Fragment>;
  }
}`,...d.parameters?.docs?.source}}},f=[`PhoneStory`]}))();export{d as PhoneStory,f as __namedExportsOrder,u as default};