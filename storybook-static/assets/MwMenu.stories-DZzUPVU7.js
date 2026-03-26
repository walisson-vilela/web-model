import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,o as i,r as a}from"./iframe-fSyR9o4x.js";import{n as o,t as s}from"./Menu-TRSAQrSQ.js";var c,l=t((()=>{r(),c={position:{description:`Define the position.`,control:`select`,options:[`top right`,`top left`,`bottom right`,`bottom left`,`right top`,`right bottom`,`left top`,`left bottom`]},bordered:{description:`Define if the menu is bordered.`,table:{defaultValue:{summary:`false`}},control:`boolean`},containerSpacing:{description:`Define the menu spacing.`,options:Object.keys(i),control:{type:`select`},table:{type:{summary:`SpacingOptions`,detail:Object.keys(i).join(`
`)},defaultValue:{summary:`s1`}}},scrollSpacing:{description:`Define the menu scroll spacing.`,options:Object.keys(i),control:{type:`select`},table:{type:{summary:`SpacingOptions`,detail:Object.keys(i).join(`
`)},defaultValue:{summary:`s1`}}},itemSpacing:{description:`Define the menu scroll spacing.`,options:Object.keys(i),control:{type:`select`},table:{type:{summary:`SpacingOptions`,detail:Object.keys(i).join(`
`)},defaultValue:{summary:`s1`}}},before:{description:`Content that appears before the menu`,table:{defaultValue:{summary:``}},control:`text`},after:{description:`Content that appears after the menu`,table:{defaultValue:{summary:``}},control:`text`},onScrollEnd:{description:`Callback executed when scrolling ends`},width:{table:{defaultValue:{summary:``}},control:`text`,description:`Define the menu width.`},close:{description:`Callback responsible to change menu status for closed.`}}})),u,d,f,p,m;t((()=>{u=e(n(),1),o(),l(),d=a(),f={id:`Menu`,title:`Components/Menu`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p={args:{bordered:!0,containerSpacing:{top:`s1`,left:`s3`,bottom:`s1`},scrollSpacing:{top:`s1`,bottom:`s1`},itemSpacing:`s1`,before:``,after:``,onScrollEnd:()=>console.log(`scrollEnd`),width:`160px`,close:()=>console.log(`close`)},render:e=>{let[t,n]=(0,u.useState)(!0),r=Array(10).fill(1).map((e,t)=>{let n=t+1;return{label:`Item ${n}`,onClick:(e,t)=>{console.log(`option clicked`,{e,data:t})},data:{i:n},rules:[()=>n%3==0?!0:{content:`O item deve ser multiplo de 3`}]}});return(0,d.jsxs)(`div`,{style:{position:`relative`,margin:`30vh 30vw`,display:`inline-block`,border:`1px solid black`,padding:`7px`},children:[(0,d.jsx)(`div`,{onClick:()=>n(e=>!e),style:{cursor:`pointer`},children:`×`}),(0,d.jsx)(s,{...e,open:t,options:r})]})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    bordered: true,
    containerSpacing: {
      top: 's1',
      left: 's3',
      bottom: 's1'
    },
    scrollSpacing: {
      top: 's1',
      bottom: 's1'
    },
    itemSpacing: 's1',
    before: '',
    after: '',
    onScrollEnd: () => console.log('scrollEnd'),
    width: '160px',
    close: () => console.log('close')
  },
  render: args => {
    const [open, setOpen] = useState(true);
    const options: Option[] = Array(10).fill(1).map((_v, index) => {
      const i = index + 1;
      const option: Option = {
        label: \`Item \${i}\`,
        onClick: (e, data) => {
          console.log('option clicked', {
            e,
            data
          });
        },
        data: {
          i: i
        },
        rules: [() => i % 3 === 0 ? true : {
          content: 'O item deve ser multiplo de 3'
        }]
      };
      return option;
    });
    return <div style={{
      position: 'relative',
      margin: '30vh 30vw',
      display: 'inline-block',
      border: '1px solid black',
      padding: '7px'
    }}>
        <div onClick={() => setOpen(prev => !prev)} style={{
        cursor: 'pointer'
      }}>
          &times;
        </div>
        <Menu {...args} open={open} options={options} />
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m=[`MenuStory`]}))();export{p as MenuStory,m as __namedExportsOrder,f as default};