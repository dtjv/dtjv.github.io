"use strict";(self.webpackChunkdtjv_github_io=self.webpackChunkdtjv_github_io||[]).push([[678],{846:function(e,t,a){a.d(t,{H1:function(){return n},H2:function(){return r}});var l=a(7294),n=function(e){var t=e.classes,a=e.children;return l.createElement("h1",{className:(null!=t?t:"")+" text-3xl font-extrabold tracking-tight text-gray-800 leading-9 sm:leading-10 sm:text-4xl md:text-5xl md:leading-none"},a)},r=function(e){var t=e.classes,a=e.children;return l.createElement("h2",{className:(null!=t?t:"")+" text-2xl font-bold tracking-tight text-gray-600 leading-8"},a)}},7543:function(e,t,a){a.d(t,{$:function(){return m}});var l=a(1531),n=a(7294),r=a(5444),s=a(6810),i=a(846),c=["title","link","children"],m=function(e){var t=e.title,a=e.link,m=e.children,o=(0,l.Z)(e,c);return n.createElement(s.W,o,n.createElement("div",{className:"flex items-baseline justify-between"},n.createElement(i.H1,null,t),(null==a?void 0:a.to)&&n.createElement(r.Link,{to:a.to,className:"text-xl font-bold text-blue-600 no-underline sm:text-2xl hover:text-blue-400","aria-label":"link to "+a.to},n.createElement("span",null,a.text," ->"))),m)}},3794:function(e,t,a){a.r(t),a.d(t,{default:function(){return x}});var l=a(7294),n=a(5444),r=a(340),s=a(1633),i=a(846),c=function(e){var t=e.post,a=t.title,r=t.date,s=t.description,c=t.slug;return l.createElement("li",{key:c,className:"py-6"},l.createElement("article",{className:"space-y-2"},l.createElement("dl",null,l.createElement("dt",{className:"sr-only"},"Published on"),l.createElement("dd",{className:"text-sm font-medium text-gray-500 leading-6"},l.createElement("time",{dateTime:Date(r)},r))),l.createElement(n.Link,{to:c,className:"inline-block hover:underline","aria-label":'Read "'+a+'"'},l.createElement(i.H2,null,a)),l.createElement("p",{className:"text-gray-500"},s)))},m=function(e){var t=e.post,a=t.title,r=t.date,s=t.slug,c=t.excerpt;return l.createElement("li",{key:s,className:"py-12"},l.createElement("article",{className:"space-y-2"},l.createElement("dl",null,l.createElement("dt",{className:"sr-only"},"Published on"),l.createElement("dd",{className:"text-base font-medium text-gray-500 leading-6"},l.createElement("time",{dateTime:Date(r)},r))),l.createElement("div",{className:"space-y-5"},l.createElement("div",{className:"space-y-6"},l.createElement(n.Link,{to:s,"aria-label":'Read "'+a+'"'},l.createElement(i.H2,null,a)),l.createElement("div",{className:"text-gray-500 prose max-w-none",dangerouslySetInnerHTML:{__html:c}})),l.createElement("div",null,l.createElement(n.Link,{to:s,className:"text-base font-bold text-blue-600 no-underline hover:text-blue-400","aria-label":'Read "'+a+'"'},l.createElement("span",{className:"mr-1"},"Read article ->"))))))},o=function(e){var t=e.posts,a=void 0===t?[]:t,n=e.short;return a.length?l.createElement("ul",{className:"divide-y divide-gray-200"},a.map((function(e){return n?l.createElement(c,{key:e.slug,post:e}):l.createElement(m,{key:e.slug,post:e})}))):null},d=a(7543),u=a(6810),x=function(){var e=(0,n.useStaticQuery)("3566713437"),t=e.site,a=e.posts.edges.map((function(e){var t=e.node;return{title:t.frontmatter.title,date:t.frontmatter.date,slug:t.fields.slug,excerpt:t.fields.excerpt,description:t.frontmatter.description}}));return l.createElement(r.A,null,l.createElement(s.p,{title:t.siteMetadata.title}),l.createElement(u.W,null,l.createElement("div",{className:"prose max-w-none"},l.createElement("p",{className:"text-xl text-gray-500 sm:text-2xl"},"Hello! I’m David. I build full-stack web applications using React, TypeScript, MongoDB, and many other interesting libraries in the JavaScript and Node.js ecosystem."),l.createElement("p",{className:"text-xl text-gray-500 sm:text-2xl"},"On this website I share my thoughts on programming - from coding experiences, to projects I’ve built and even a bit of computer science basics. I hope you find my content useful."),l.createElement("div",{className:"text-xl text-gray-500 sm:text-2xl"},l.createElement("div",null,"Thanks for visiting! You can reach me at"," ",l.createElement("a",{href:"mailto:davidtjvalles@gmail.com"},"email")," or"," ",l.createElement("a",{href:"https://twitter/davidtjvalles"},"@davidtjvalles"),".")))),l.createElement(d.$,{title:"Articles"},l.createElement(o,{posts:a})))}}}]);
//# sourceMappingURL=component---src-pages-index-js-c227bb8da69ebfb38b23.js.map