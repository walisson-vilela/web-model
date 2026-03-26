import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./Password-C5b2tn1C.js";var r,i=e((()=>{r={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}}},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},setValue:{description:`Define if input is clearable and it's function.`},type:{description:`Input type.`,table:{defaultValue:{summary:`password`}}}}})),a,o,s;e((()=>{t(),i(),a={id:`Password`,title:`Components/Input/type="password"`,component:n,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:r},o={args:{label:`Label`,required:!1,disabled:!1,invalid:!1,setValue:e=>{console.log(`set value to: "${e}"`)},type:`password`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    required: false,
    disabled: false,
    invalid: false,
    setValue: (value: string) => {
      console.log(\`set value to: "\${value}"\`);
    },
    type: 'password'
  }
}`,...o.parameters?.docs?.source}}},s=[`PasswordStory`]}))();export{o as PasswordStory,s as __namedExportsOrder,a as default};