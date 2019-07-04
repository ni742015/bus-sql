require("source-map-support/register"),module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=22)}([function(e,t){e.exports={filter_request_body(e){const t={};if(e)return function(e,r){for(const n in e)e.hasOwnProperty(n)&&(r.some(e=>n===e)||(t[n]=e[n]));return t}(e,["created_date","updated_date","creator_name","creator_id","last_modifier_name","last_modifier_id","_id"])},compact(e){let t;if("[object Object]"===Object.prototype.toString.call(e)){t={};for(const r in e)e[r]&&(t[r]=e[r])}else"[object Array]"===Object.prototype.toString.call(e)&&(t=[],e.forEach(e=>{e&&t.push(e)}));return t},unless({url:e,method:t},r){function n(e){return!e||Array.isArray(e)?e:[e]}return r.some(function(r){var o=r.methods||n(r.method);return function e(t,r){var n="string"==typeof t&&t===r||t instanceof RegExp&&!!t.exec(r);return t instanceof RegExp&&(t.lastIndex=0),t&&t.url&&(n=e(t.url,r)),n}(r,e)&&function(e,t){return!e||(e=n(e)).indexOf(t)>-1}(o,t)})}}},function(e,t){let r={UNKNOW_ERROR:"unknowError",PARAMS_ERROR:"paramsError",RESOURCES_EXIST:"resourcesExist",USER_NOT_PERMISSIONS:"userNotPermissions",RESOURCES_NOT_EXIST:"resourcesNotExist",SERVER_ERROR:"serverError",INVALID_CODE:"invalidCode"};const n=new Map;n.set(r.PARAMS_ERROR,{status:400,message:"Request parameter is wrong"}),n.set(r.RESOURCES_EXIST,{status:400,message:"Data already exists"}),n.set(r.USER_NOT_PERMISSIONS,{status:401,message:"User has no permissions"}),n.set(r.RESOURCES_NOT_EXIST,{status:404,message:"There is no resources"}),n.set(r.SERVER_ERROR,{status:500,message:"Internal Server Error"}),n.set(r.INVALID_CODE,{status:400,message:"验证码错误"}),r.getErrorInfo=(e=>{let t;return e&&(t=n.get(e)),t||(e=r.UNKNOW_ERROR,t=n.get(e)),t}),e.exports=r},function(e,t,r){const n=r(1);e.exports=class extends Error{constructor(e,t,r){super();let o="",s="";if(null!==e){const t=n.getErrorInfo(e);o=t.status,s=t.message}else o=t,s=r;this.name=e,this.status=o,this.message=s}}},function(e,t){e.exports=require("sequelize")},,,,,function(e,t){e.exports=require("koa-router")},,,,,,,,,,,,,,function(e,t,r){function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){o(e,t,r[t])})}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=r(8)(),i=r(23),a=r(3),c=r(0),u=r(24),p=r(2),l=r(1);e.exports=class{constructor(){o(this,"add",e=>{this.datas.push(e)}),o(this,"init",async({models:e,examples:t,hooks:r,config:o,sequelize:d})=>{try{const f=o.apiPrefix?`/${o.apiPrefix}`:"";i.wrapper(s),s.swagger(Object.assign({title:"Example Server",description:"API 文档",version:"1.0.0",prefix:`${f}`,swaggerHtmlEndpoint:"/swagger-html",swaggerJsonEndpoint:"/swagger-json",swaggerOptions:{securityDefinitions:{ApiKeyAuth:{type:"apiKey",in:"header",name:"Authorization"}}}},o.swaggerConfig||{}));const y=i.body;i.body=function(){return arguments[0]=c.filter_request_body(arguments[0]),y.apply(this,arguments)};for(const o of this.datas){const{name:f,apiClass:y}=o,g=i.tags([f]);let m={},b={Sequelize:a,sequelize:d,utils:c,examples:t,models:e,tag:g,decorator:i,ApiError:p,ApiErrorNames:l};r.onInitApi&&await r.onInitApi(f,y,b);const{commonApiConfig:O,ApiClass:E}=y(b);O&&(m=u({model:e[f],example:t[f],tag:g,decorator:i,Sequelize:a,info:n({},O,{pathname:f})})),Object.getOwnPropertyNames(m).filter(e=>!["name","constructor","length","prototype"].includes(e)).forEach(e=>{Object.getOwnPropertyNames(E).indexOf(e)<0&&(E[e]=m[e])}),s.map(E)}return s}catch(e){throw console.warn("Init Apis Error",e),e}}),this.datas=[]}}},function(e,t){e.exports=require("koa-swagger-decorator")},function(e,t){function r(e,t,r,n,o){var s={};return Object.keys(n).forEach(function(e){s[e]=n[e]}),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},s),o&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(o):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,t,s),s=null),s}e.exports=(({Sequelize:e,example:t,model:n,tag:o,info:{pathname:s,name:i,baseUrl:a},decorator:{request:c,summary:u,body:p,path:l,description:d,query:f,responses:y}})=>{var g,m,b,O,E,h,R,S,w,_,x,P,j,q,v,A,I,C,N,T,D,z,$,U,M;let k=a||s.replace(/[A-Z]/,e=>e.toLowerCase());const B=e.Op;function L(e){e.name!==s&&Object.defineProperty(e,"name",{get:()=>s.replace(/^[a-z]/,e=>e.toUpperCase())})}return g=c("GET",`/${k}/{id}`),m=u(`获取${i}详情`),b=d("id不能为空"),O=l({id:{type:"string",required:!0}}),E=y(t),h=c("GET",`/${k}`),R=u(`获取${i}列表`),S=f({page:{type:"number",require:!0,description:"页码"},pageCount:{type:"number",require:!0,description:"页数"},filter:{type:"string",description:"过滤条件"}}),w=y({rows:[t],total:{type:"number"}}),_=c("POST",`/${k}`),x=u(`新建${i}`),P=p(t),j=y(t),q=c("PUT",`/${k}/{id}`),v=u(`修改${i}`),A=l({id:{type:"string",required:!0}}),I=p(t),C=y(t),N=c("DELETE",`/${k}/{id}`),T=u(`删除${i}`),D=l({id:{type:"string",required:!0}}),z=c("DELETE",`/${k}/batch`),$=u(`批量删除${i}`),U=p({ids:{type:"array",required:!0,example:[]}}),r(M=class{static test(){}static async get(e){const{id:t}=e.params;return n.findByPk(t).then(t=>{e.body=t})}static async query(e){let{page:t=1,pageCount:r=10,filter:o}=e.query;const s=((t=parseInt(t,10))-1)*(r=parseInt(r,10)),{rows:i,count:a}=await n.findAndCountAll({offset:s,limit:r});e.body={items:i,totalCount:a}}static async create(e){return n.create(e.request.body).then(t=>e.body=t)}static async put(e){const{params:{id:t},request:{body:r}}=e;return n.update(r,{where:{id:t}}).then(()=>n.findByPk(t)).then(t=>e.body=t)}static async delete(e){const{params:{id:t}}=e;return n.destroy({where:{id:t}}).then(t=>e.body=t)}static async deleteBatch(e){const{body:{ids:t}}=e.request;return n.destroy({where:{id:{[B.in]:t}}}).then(t=>e.body=t)}},"test",[L],Object.getOwnPropertyDescriptor(M,"test"),M),r(M,"get",[L,g,m,b,o,O,E],Object.getOwnPropertyDescriptor(M,"get"),M),r(M,"query",[L,h,R,o,S,w],Object.getOwnPropertyDescriptor(M,"query"),M),r(M,"create",[L,_,x,o,P,j],Object.getOwnPropertyDescriptor(M,"create"),M),r(M,"put",[L,q,v,o,A,I,C],Object.getOwnPropertyDescriptor(M,"put"),M),r(M,"delete",[L,N,T,o,D],Object.getOwnPropertyDescriptor(M,"delete"),M),r(M,"deleteBatch",[L,z,$,o,U],Object.getOwnPropertyDescriptor(M,"deleteBatch"),M),M})}]);