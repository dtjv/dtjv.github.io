(self.webpackChunkdtjv_github_io=self.webpackChunkdtjv_github_io||[]).push([[851],{6725:function(e,t,r){var n=r(3395);e.exports={MDXRenderer:n}},3395:function(e,t,r){var n=r(6191),o=r(1309),l=r(4176),a=r(3246),c=["scope","children"];function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i=r(7294),p=r(4983).mdx,f=r(9480).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,l=a(e,c),u=f(t),d=i.useMemo((function(){if(!r)return null;var e=s({React:i,mdx:p},u),t=Object.keys(e),l=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(l)))}),[r,t]);return i.createElement(d,s({},l))}},846:function(e,t,r){"use strict";r.d(t,{H1:function(){return o},H2:function(){return l}});var n=r(7294),o=function(e){var t=e.classes,r=e.children;return n.createElement("h1",{className:(null!=t?t:"")+" text-3xl font-extrabold tracking-tight text-gray-800 leading-9 sm:leading-10 sm:text-4xl md:text-5xl md:leading-none"},r)},l=function(e){var t=e.classes,r=e.children;return n.createElement("h2",{className:(null!=t?t:"")+" text-2xl font-bold tracking-tight text-gray-600 leading-8"},r)}},9857:function(e,t,r){"use strict";r.r(t);var n=r(7294),o=r(6725),l=r(1633),a=r(9792),c=r(6810),u=r(846);t.default=function(e){var t=e.data,r=t.mdx,s=t.site,i=r.frontmatter,p=i.title,f=i.date,d=i.description;return n.createElement(l.A,null,n.createElement(a.p,{title:p+" | "+s.siteMetadata.title,description:d,url:""+s.siteMetadata.siteUrl+r.fields.slug,isPost:!0}),n.createElement(c.W,null,n.createElement("article",null,n.createElement("header",{className:"space-y-2"},n.createElement("dl",null,n.createElement("dt",{className:"sr-only"},"Published on"),n.createElement("dd",{className:"text-base font-medium text-gray-500 leading-6"},n.createElement("time",{dateTime:Date(f)},f))),n.createElement("div",null,n.createElement(u.H1,null,p),d&&n.createElement("p",{className:"text-2xl tracking-tight text-gray-500 pt-14"},d))),n.createElement("div",{className:(d?"pt-8 pb-12":"py-12")+" prose max-w-none"},n.createElement(o.MDXRenderer,null,r.body)))))}},6322:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.default=e.exports,e.exports.__esModule=!0},2771:function(e,t,r){var n=r(6322);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6191:function(e,t,r){var n=r(4675),o=r(5460);function l(t,r,a){return o()?(e.exports=l=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=l=function(e,t,r){var o=[null];o.push.apply(o,t);var l=new(Function.bind.apply(e,o));return r&&n(l,r.prototype),l},e.exports.default=e.exports,e.exports.__esModule=!0),l.apply(null,arguments)}e.exports=l,e.exports.default=e.exports,e.exports.__esModule=!0},4176:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},5460:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},1840:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},9439:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},1309:function(e,t,r){var n=r(2771),o=r(1840),l=r(4866),a=r(9439);e.exports=function(e){return n(e)||o(e)||l(e)||a()},e.exports.default=e.exports,e.exports.__esModule=!0},4866:function(e,t,r){var n=r(6322);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0}}]);
//# sourceMappingURL=component---src-templates-post-js-d2dd2e356713dd275291.js.map