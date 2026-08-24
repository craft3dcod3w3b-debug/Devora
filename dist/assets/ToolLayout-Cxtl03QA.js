import{j as a}from"./index-BbD4Vch_.js";function l({children:t,minHeight:e="600px"}){return a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"100%",minHeight:e},children:t})}function n({children:t,minHeight:e="600px"}){return a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"1rem",width:"100%",minHeight:e},className:"two-panel-layout",children:[t,a.jsx("style",{children:`
        @media (min-width: 768px) {
          .two-panel-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `})]})}export{l as S,n as T};
