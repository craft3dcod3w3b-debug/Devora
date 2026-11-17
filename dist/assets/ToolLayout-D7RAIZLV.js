import{j as t,r as d,k as p}from"./index-Bs0ZPzSY.js";function c({children:i,minHeight:n="550px"}){return t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem",width:"100%",minHeight:n},children:i})}function x({children:i,minHeight:n="550px"}){const[e,a]=d.useState("both"),l=p.Children.toArray(i);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.875rem",width:"100%"},children:[l.length===2&&t.jsxs("div",{className:"mobile-panel-tabs",style:{display:"none",padding:"0.25rem",borderRadius:"var(--radius-lg)",backgroundColor:"var(--color-bg-secondary)",border:"1px solid var(--color-border)",gap:"0.25rem"},children:[t.jsx("button",{type:"button",onClick:()=>a("both"),className:`btn btn-sm ${e==="both"?"btn-primary":"btn-ghost"}`,style:{flex:1,padding:"0.45rem",fontSize:"0.8rem",borderRadius:"var(--radius-md)"},children:"Split View"}),t.jsx("button",{type:"button",onClick:()=>a("input"),className:`btn btn-sm ${e==="input"?"btn-primary":"btn-ghost"}`,style:{flex:1,padding:"0.45rem",fontSize:"0.8rem",borderRadius:"var(--radius-md)"},children:"Input"}),t.jsx("button",{type:"button",onClick:()=>a("output"),className:`btn btn-sm ${e==="output"?"btn-primary":"btn-ghost"}`,style:{flex:1,padding:"0.45rem",fontSize:"0.8rem",borderRadius:"var(--radius-md)"},children:"Output"})]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"1.25rem",width:"100%",minHeight:n},className:`two-panel-grid tab-mode-${e}`,children:l.map((o,r)=>{const s=e==="input"&&r===1||e==="output"&&r===0;return t.jsx("div",{className:`panel-item ${s?"mobile-hidden":""}`,style:{display:"flex",flexDirection:"column",height:"100%",minHeight:"400px"},children:o},r)})}),t.jsx("style",{children:`
        @media (min-width: 768px) {
          .two-panel-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .mobile-panel-tabs {
            display: none !important;
          }
          .panel-item {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-panel-tabs {
            display: flex !important;
          }
          .two-panel-grid {
            grid-template-columns: 1fr !important;
          }
          .panel-item.mobile-hidden {
            display: none !important;
          }
        }
      `})]})}export{c as S,x as T};
