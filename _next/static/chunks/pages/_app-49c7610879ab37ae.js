(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{8944:function(e,t,r){"use strict";function n(e){var t,r,o="";if("string"===typeof e||"number"===typeof e)o+=e;else if("object"===typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=n(e[t]))&&(o&&(o+=" "),o+=r);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function o(){for(var e,t,r=0,o="";r<arguments.length;)(e=arguments[r++])&&(t=n(e))&&(o&&(o+=" "),o+=t);return o}r.d(t,{Z:function(){return o}})},6321:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(3276)}])},3276:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return y}});var n=r(4246),o=r(8944),a=r(7378),l=function(){return(0,n.jsxs)("div",{className:(0,o.Z)("fixed bottom-0 right-0 z-[10000] flex h-auto w-auto items-center justify-center","p-1  text-sm font-bold text-white dark:text-slate-900","rounded-full","bg-slate-800 sm:bg-red-900 md:bg-blue-800 lg:bg-green-800 xl:bg-amber-600"),children:[(0,n.jsx)("div",{className:(0,o.Z)("inline-flex sm:hidden"),children:"xs (default)"}),(0,n.jsx)("div",{className:(0,o.Z)("hidden sm:inline-flex md:hidden"),children:"SM"}),(0,n.jsx)("div",{className:(0,o.Z)("hidden md:inline-flex lg:hidden"),children:"MD"}),(0,n.jsx)("div",{className:(0,o.Z)("hidden lg:inline-flex xl:hidden"),children:"LG"}),(0,n.jsx)("div",{className:(0,o.Z)("hidden xl:inline-flex"),children:"XL"})]})},i=function(){return(0,n.jsx)("footer",{className:(0,o.Z)("not-prose sticky top-0 z-50 \n        flex flex-wrap items-center justify-between\n        bg-white\n        py-5 px-4 shadow-md\n        shadow-slate-900/5 \n        dark:bg-slate-900/95 dark:shadow-none\n        sm:px-6 lg:px-8"),"aria-label":"footer",children:(0,n.jsxs)("p",{children:["\xa9 ",(new Date).getFullYear()+" ",(0,n.jsx)("a",{href:"https://www.execonline.com/",target:"_blank",rel:"noopener noreferrer",children:"ExecOnline"})]})})},c=r(9894),u=r.n(c);function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],l=!0,i=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);l=!0);}catch(c){i=!0,o=c}finally{try{l||null==r.return||r.return()}finally{if(i)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var d=function(){var e=f(a.useState(!1),2),t=e[0],r=e[1];return a.useEffect((function(){var e=function(){r(window.scrollY>0)};return e(),window.addEventListener("scroll",e),function(){window.removeEventListener("scroll",e)}}),[]),(0,n.jsx)("header",{className:(0,o.Z)("not-prose sticky top-0 z-50","flex items-center justify-between","space-x-6 bg-white","py-3 shadow-md shadow-slate-900/5 transition","duration-500 dark:shadow-none sm:space-x-10 sm:py-4","md:py-5",{"dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75] dark:bg-slate-900/95 dark:backdrop-blur":t,"dark:bg-transparent":!t}),children:(0,n.jsxs)("div",{className:(0,o.Z)("content-container-width mx-auto py-3","flex items-center justify-between space-x-6"),children:[(0,n.jsx)(u(),{href:"/",children:(0,n.jsx)("a",{className:(0,o.Z)("text-base font-bold text-green-600 hover:text-indigo-900","dark:text-green-300 dark:hover:text-indigo-300 sm:text-lg"),children:"CooperTS"})}),(0,n.jsxs)("nav",{className:"md:text-md flex space-x-5 text-sm sm:space-x-10 sm:text-sm",children:[(0,n.jsx)(u(),{href:"/about",children:(0,n.jsx)("a",{className:(0,o.Z)("font-medium text-gray-600 hover:text-gray-900","dark:text-gray-300 dark:hover:text-white"),children:"About"})}),(0,n.jsx)(u(),{href:"/start",children:(0,n.jsx)("a",{className:(0,o.Z)("font-medium text-gray-600 hover:text-gray-900","dark:text-gray-300 dark:hover:text-white"),children:"Getting Started"})}),(0,n.jsx)(u(),{href:"/guide",children:(0,n.jsx)("a",{className:(0,o.Z)("font-medium text-gray-600 hover:text-gray-900","dark:text-gray-300 dark:hover:text-white"),children:"Guide"})}),(0,n.jsx)(u(),{href:"/packages",children:(0,n.jsx)("a",{className:(0,o.Z)("font-medium text-gray-600 hover:text-gray-900","dark:text-gray-300 dark:hover:text-white"),children:"Packages"})}),(0,n.jsx)(u(),{href:"/examples",children:(0,n.jsx)("a",{className:(0,o.Z)("font-medium text-gray-600 hover:text-gray-900","dark:text-gray-300 dark:hover:text-white"),children:"Examples"})}),(0,n.jsx)(u(),{href:"https://github.com/execonline-inc/CooperTS",target:"_blank",children:(0,n.jsxs)("a",{className:"group",children:[(0,n.jsx)("span",{className:"sr-only",children:"CooperTS on GitHub"}),(0,n.jsx)("svg",{"aria-hidden":"true",viewBox:"0 0 16 16",className:(0,o.Z)("h-6 w-6 fill-slate-500 group-hover:fill-slate-700","dark:fill-slate-300 dark:group-hover:fill-white"),children:(0,n.jsx)("path",{d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"})})]})})]})]})})};r(8540);function h(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){h(e,t,r[t])}))}return e}var y=function(e){var t=e.Component,r=e.pageProps;return(0,n.jsxs)("div",{className:"flex h-screen w-screen flex-col justify-between scroll-smooth",children:[(0,n.jsx)(d,{}),(0,n.jsx)("main",{className:(0,o.Z)("fixed-origin","content-container-width","relative mx-auto flex flex-col justify-center"),children:(0,n.jsx)(t,p({},r))}),(0,n.jsx)(l,{}),(0,n.jsx)(i,{})]})}},3853:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],l=!0,i=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);l=!0);}catch(c){i=!0,o=c}finally{try{l||null==r.return||r.return()}finally{if(i)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,l=(a=r(7378))&&a.__esModule?a:{default:a},i=r(1398),c=r(7895),u=r(8315);function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var f={};function d(e,t,r,n){if(e&&i.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;f[t+"%"+r+(o?"%"+o:"")]=!0}}var h=l.default.forwardRef((function(e,t){var r,n=e.legacyBehavior,a=void 0===n?!0!==Boolean(!1):n,h=e.href,p=e.as,y=e.children,m=e.prefetch,x=e.passHref,v=e.replace,g=e.shallow,b=e.scroll,j=e.locale,w=e.onClick,k=e.onMouseEnter,C=s(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter"]);r=y,a&&"string"===typeof r&&(r=l.default.createElement("a",null,r));var O,E=!1!==m,N=c.useRouter(),S=l.default.useMemo((function(){var e=o(i.resolveHref(N,h,!0),2),t=e[0],r=e[1];return{href:t,as:p?i.resolveHref(N,p):r||t}}),[N,h,p]),A=S.href,_=S.as,M=l.default.useRef(A),Z=l.default.useRef(_);a&&(O=l.default.Children.only(r));var I=a?O&&"object"===typeof O&&O.ref:t,L=o(u.useIntersection({rootMargin:"200px"}),3),P=L[0],R=L[1],T=L[2],U=l.default.useCallback((function(e){Z.current===_&&M.current===A||(T(),Z.current=_,M.current=A),P(e),I&&("function"===typeof I?I(e):"object"===typeof I&&(I.current=e))}),[_,I,A,T,P]);l.default.useEffect((function(){var e=R&&E&&i.isLocalURL(A),t="undefined"!==typeof j?j:N&&N.locale,r=f[A+"%"+_+(t?"%"+t:"")];e&&!r&&d(N,A,_,{locale:t})}),[_,A,R,j,E,N]);var D={ref:U,onClick:function(e){a||"function"!==typeof w||w(e),a&&O.props&&"function"===typeof O.props.onClick&&O.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,l,c){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&i.isLocalURL(r))&&(e.preventDefault(),t[o?"replace":"push"](r,n,{shallow:a,locale:c,scroll:l}))}(e,N,A,_,v,g,b,j)},onMouseEnter:function(e){a||"function"!==typeof k||k(e),a&&O.props&&"function"===typeof O.props.onMouseEnter&&O.props.onMouseEnter(e),i.isLocalURL(A)&&d(N,A,_,{priority:!0})}};if(!a||x||"a"===O.type&&!("href"in O.props)){var H="undefined"!==typeof j?j:N&&N.locale,z=N&&N.isLocaleDomain&&i.getDomainLocale(_,H,N&&N.locales,N&&N.domainLocales);D.href=z||i.addBasePath(i.addLocale(_,H,N&&N.defaultLocale))}return a?l.default.cloneElement(O,D):l.default.createElement("a",Object.assign({},C,D),r)}));t.default=h,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},8315:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],l=!0,i=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);l=!0);}catch(c){i=!0,o=c}finally{try{l||null==r.return||r.return()}finally{if(i)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,r=e.rootMargin,n=e.disabled||!i,s=a.useRef(),f=o(a.useState(!1),2),d=f[0],h=f[1],p=o(a.useState(t?t.current:null),2),y=p[0],m=p[1],x=a.useCallback((function(e){s.current&&(s.current(),s.current=void 0),n||d||e&&e.tagName&&(s.current=function(e,t,r){var n=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=u.find((function(e){return e.root===r.root&&e.margin===r.margin}));n?t=c.get(n):(t=c.get(r),u.push(r));if(t)return t;var o=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return c.set(r,t={id:r,observer:a,elements:o}),t}(r),o=n.id,a=n.observer,l=n.elements;return l.set(e,t),a.observe(e),function(){if(l.delete(e),a.unobserve(e),0===l.size){a.disconnect(),c.delete(o);var t=u.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&u.splice(t,1)}}}(e,(function(e){return e&&h(e)}),{root:y,rootMargin:r}))}),[n,y,r,d]),v=a.useCallback((function(){h(!1)}),[]);return a.useEffect((function(){if(!i&&!d){var e=l.requestIdleCallback((function(){return h(!0)}));return function(){return l.cancelIdleCallback(e)}}}),[d]),a.useEffect((function(){t&&m(t.current)}),[t]),[x,d,v]};var a=r(7378),l=r(8404),i="undefined"!==typeof IntersectionObserver;var c=new Map,u=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},8540:function(){},9894:function(e,t,r){e.exports=r(3853)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6321),t(7895)}));var r=e.O();_N_E=r}]);