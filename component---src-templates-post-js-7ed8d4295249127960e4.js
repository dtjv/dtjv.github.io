(self.webpackChunkdtjv_github_io=self.webpackChunkdtjv_github_io||[]).push([[851],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)}},9100:function(e,t,r){var n=r(9489),o=r(7067);function c(t,r,a){return o()?e.exports=c=Reflect.construct:e.exports=c=function(e,t,r){var o=[null];o.push.apply(o,t);var c=new(Function.bind.apply(e,o));return r&&n(c,r.prototype),c},c.apply(null,arguments)}e.exports=c},9713:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},9489:function(e){function t(r,n){return e.exports=t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(r,n)}e.exports=t},319:function(e,t,r){var n=r(3646),o=r(6860),c=r(379),a=r(8206);e.exports=function(e){return n(e)||o(e)||c(e)||a()}},379:function(e,t,r){var n=r(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},6725:function(e,t,r){var n=r(3395);e.exports={MDXRenderer:n}},3395:function(e,t,r){var n=r(9100),o=r(319),c=r(9713),a=r(7316);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l=r(7294),s=r(4983).mdx,f=r(9480).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,c=a(e,["scope","children"]),i=f(t),p=l.useMemo((function(){if(!r)return null;var e=u({React:l,mdx:s},i),t=Object.keys(e),c=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(c)))}),[r,t]);return l.createElement(p,u({},c))}},9857:function(e,t,r){"use strict";r.r(t);var n=r(7294),o=r(6725),c=r(5696),a=r(2335),i=r(6810),u=r(846);t.default=function(e){var t=e.data,r=t.mdx,l=t.site,s=r.frontmatter,f=s.title,p=s.date,m=s.description;return n.createElement(c.A,null,n.createElement(a.H,{title:f+" | "+l.siteMetadata.title,description:m,url:""+l.siteMetadata.siteUrl+r.fields.slug,isPost:!0}),n.createElement(i.W,null,n.createElement("article",null,n.createElement("header",{className:"space-y-2"},n.createElement("dl",null,n.createElement("dt",{className:"sr-only"},"Published on"),n.createElement("dd",{className:"text-base font-medium text-gray-500 leading-6"},n.createElement("time",{dateTime:Date(p)},p))),n.createElement("div",null,n.createElement(u.H1,null,f),m&&n.createElement("p",{className:"text-2xl tracking-tight text-gray-500 pt-14"},m))),n.createElement("div",{className:(m?"pt-8 pb-12":"py-12")+" prose max-w-none"},n.createElement(o.MDXRenderer,null,r.body)))))}}}]);
//# sourceMappingURL=component---src-templates-post-js-7ed8d4295249127960e4.js.map