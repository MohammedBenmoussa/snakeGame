import{j as e,u as l,m as o}from"./index-DcCb8AyJ.js";const i=({label:r,value:a,isHighScore:s})=>{const{isDark:t}=l();return e.jsxs(o.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},className:`relative overflow-hidden rounded-xl p-6
        ${t?"bg-gradient-to-br from-gray-800/80 to-gray-900/80":"bg-gradient-to-br from-gray-100 to-gray-200/80"}
        backdrop-blur-md border
        ${t?"border-gray-700/50":"border-gray-300"}
        hover:shadow-lg transition-all duration-300`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("span",{className:"text-2xl",children:s?"👑":"🎯"}),e.jsx("h3",{className:`text-sm font-medium
          ${t?"text-gray-400":"text-gray-600"}`,children:r})]}),e.jsx("div",{className:"relative",children:e.jsx(o.div,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},className:`text-4xl font-bold
            ${s?t?"text-yellow-400":"text-yellow-600":t?"text-emerald-400":"text-emerald-600"}`,children:a},a)}),e.jsx("div",{className:`absolute inset-0 pointer-events-none
        ${t?"bg-gradient-to-br from-white/[0.02] to-transparent":"bg-gradient-to-br from-white/20 to-transparent"}`})]})},d=({score:r,highScore:a})=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{label:"Score Actuel",value:r,isHighScore:!1}),e.jsx(i,{label:"Meilleur Score",value:a,isHighScore:!0})]});export{d as default};
