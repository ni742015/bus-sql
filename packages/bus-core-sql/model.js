require("source-map-support/register"),module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}({11:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.exports=class{constructor(e={}){n(this,"add",e=>{this.datas.push(e)}),n(this,"init",async({sequelize:e,schemas:t,hooks:n})=>{try{const r={},o={};for(const s in t){let{schema:i,extend:u={}}=t[s],{associate:a}=u;a&&(o[s]=a);let c=e.define(s.replace(s[0],s[0].toUpperCase()),i,Object.assign({timestamps:!0},u));if(n.onInitModels){let e=await n.onInitModels(s,c);c=e||c}r[s]=c}for(const e of this.datas){const{name:t,model:n}=e;n(r[t],r)}return Object.assign(this.models,r),Object.keys(o).forEach(function(e){o[e](r,r[e])}),r}catch(e){throw console.warn("Init Models Error",e),e}}),this.onInitModels=e.onInitModels,this.datas=[],this.models={}}}}});
//# sourceMappingURL=model.js.map