(()=>{"use strict";var e={},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={id:a,loaded:!1,exports:{}},i=!0;try{e[a].call(o.exports,o,o.exports,r),i=!1}finally{i&&delete t[a]}return o.loaded=!0,o.exports}r.m=e,(()=>{var e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",a="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&e.d<1&&(e.d=1,e.forEach(e=>e.r--),e.forEach(e=>e.r--?e.r++:e()))},o=r=>r.map(r=>{if(null!==r&&"object"==typeof r){if(r[e])return r;if(r.then){var o=[];o.d=0,r.then(e=>{i[t]=e,n(o)},e=>{i[a]=e,n(o)});var i={};return i[e]=e=>e(o),i}}var s={};return s[e]=e=>{},s[t]=r,s});r.a=(r,i,s)=>{s&&((c=[]).d=-1);var c,l,u,d,f=new Set,p=r.exports,b=new Promise((e,t)=>{d=t,u=e});b[t]=p,b[e]=e=>(c&&e(c),f.forEach(e),b.catch(e=>{})),r.exports=b,i(r=>{l=o(r);var n,i=()=>l.map(e=>{if(e[a])throw e[a];return e[t]}),s=new Promise(t=>{(n=()=>t(i)).r=0;var r=e=>e!==c&&!f.has(e)&&(f.add(e),e&&!e.d&&(n.r++,e.push(n)));l.map(t=>t[e](r))});return n.r?s:i()},e=>(e?d(b[a]=e):u(p),n(c))),c&&c.d<0&&(c.d=0)}})(),(()=>{var e=[];r.O=(t,a,n,o)=>{if(a){o=o||0;for(var i=e.length;i>0&&e[i-1][2]>o;i--)e[i]=e[i-1];e[i]=[a,n,o];return}for(var s=1/0,i=0;i<e.length;i++){for(var[a,n,o]=e[i],c=!0,l=0;l<a.length;l++)(!1&o||s>=o)&&Object.keys(r.O).every(e=>r.O[e](a[l]))?a.splice(l--,1):(c=!1,o<s&&(s=o));if(c){e.splice(i--,1);var u=n();void 0!==u&&(t=u)}}return t}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(a,n){if(1&n&&(a=this(a)),8&n||"object"==typeof a&&a&&(4&n&&a.__esModule||16&n&&"function"==typeof a.then))return a;var o=Object.create(null);r.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&n&&a;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>i[e]=()=>a[e]);return i.default=()=>a,r.d(o,i),o}})(),r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((t,a)=>(r.f[a](e,t),t),[])),r.u=e=>16===e?"static/chunks/16.49f3dff8dad2691f.js":"static/chunks/"+(({90:"933fc8cf",105:"0e5ce63c",268:"aaea2bcf",581:"9181e110",965:"68b159eb"})[e]||e)+"-"+({52:"a567c8ff39d9b606",90:"d3059c668600be94",105:"98e95372b0eaea56",268:"31b1b649e26d9479",581:"0e022bbf1fe917da",965:"be5228a69fe4b9e9"})[e]+".js",r.miniCssF=e=>{},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="_N_E:";r.l=(a,n,o,i)=>{if(e[a]){e[a].push(n);return}if(void 0!==o)for(var s,c,l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+o){s=d;break}}s||(c=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+o),s.src=r.tu(a)),e[a]=[n];var f=(t,r)=>{s.onerror=s.onload=null,clearTimeout(p);var n=e[a];if(delete e[a],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach(e=>e(r)),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),c&&document.head.appendChild(s)}})(),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tt=()=>(void 0===e&&(e={createScriptURL:e=>e},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("nextjs#bundler",e))),e)})(),r.tu=e=>r.tt().createScriptURL(e),r.v=(e,t,a,n)=>{var o=fetch(r.p+"static/wasm/"+a+".wasm"),i=()=>o.then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,n)).then(t=>Object.assign(e,t.instance.exports));return o.then(t=>"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(t,n).then(t=>Object.assign(e,t.instance.exports),e=>{if("application/wasm"!==t.headers.get("Content-Type"))return console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e),i();throw e}):i())},r.p="/_next/",(()=>{var e={68:0,595:0};r.f.j=(t,a)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n){if(n)a.push(n[2]);else if(/^(595|68)$/.test(t))e[t]=0;else{var o=new Promise((r,a)=>n=e[t]=[r,a]);a.push(n[2]=o);var i=r.p+r.u(t),s=Error();r.l(i,a=>{if(r.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,n[1](s)}},"chunk-"+t,t)}}},r.O.j=t=>0===e[t];var t=(t,a)=>{var n,o,[i,s,c]=a,l=0;if(i.some(t=>0!==e[t])){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(c)var u=c(r)}for(t&&t(a);l<i.length;l++)o=i[l],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},a=self.webpackChunk_N_E=self.webpackChunk_N_E||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})(),r.nc=void 0})();