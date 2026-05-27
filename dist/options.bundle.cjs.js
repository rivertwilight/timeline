'use strict';

var n,l$1,u$1,i$1,r$1,o$1,e$1,f$1,c$1,a$1,s$1,h$1,p$1,v$1,d$1={},w$1=[],_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,g=Array.isArray;function m$1(n,l){for(var u in l)n[u]=l[u];return n}function b(n){n&&n.parentNode&&n.parentNode.removeChild(n);}function k$1(l,u,t){var i,r,o,e={};for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:e[o]=u[o];if(arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps) void 0===e[o]&&(e[o]=l.defaultProps[o]);return x(l,e,i,r,null)}function x(n,t,i,r,o){var e={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==o?++u$1:o,__i:-1,__u:0};return null==o&&null!=l$1.vnode&&l$1.vnode(e),e}function S(n){return n.children}function C$1(n,l){this.props=n,this.context=l;}function $(n,l){if(null==l)return n.__?$(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?$(n):null}function I(n){if(n.__P&&n.__d){var u=n.__v,t=u.__e,i=[],r=[],o=m$1({},u);o.__v=u.__v+1,l$1.vnode&&l$1.vnode(o),q(n.__P,o,u,n.__n,n.__P.namespaceURI,32&u.__u?[t]:null,i,null==t?$(u):t,!!(32&u.__u),r),o.__v=u.__v,o.__.__k[o.__i]=o,D$1(i,o,r),u.__e=u.__=null,o.__e!=t&&P(o);}}function P(n){if(null!=(n=n.__)&&null!=n.__c)return n.__e=n.__c.base=null,n.__k.some(function(l){if(null!=l&&null!=l.__e)return n.__e=n.__c.base=l.__e}),P(n)}function A$1(n){(!n.__d&&(n.__d=true)&&i$1.push(n)&&!H.__r++||r$1!=l$1.debounceRendering)&&((r$1=l$1.debounceRendering)||o$1)(H);}function H(){try{for(var n,l=1;i$1.length;)i$1.length>l&&i$1.sort(e$1),n=i$1.shift(),l=i$1.length,I(n);}finally{i$1.length=H.__r=0;}}function L(n,l,u,t,i,r,o,e,f,c,a){var s,h,p,v,y,_,g,m=t&&t.__k||w$1,b=l.length;for(f=T$1(u,l,m,f,b),s=0;s<b;s++)null!=(p=u.__k[s])&&(h=-1!=p.__i&&m[p.__i]||d$1,p.__i=s,_=q(n,p,h,i,r,o,e,f,c,a),v=p.__e,p.ref&&h.ref!=p.ref&&(h.ref&&J(h.ref,null,p),a.push(p.ref,p.__c||v,p)),null==y&&null!=v&&(y=v),(g=!!(4&p.__u))||h.__k===p.__k?(f=j$1(p,f,n,g),g&&h.__e&&(h.__e=null)):"function"==typeof p.type&&void 0!==_?f=_:v&&(f=v.nextSibling),p.__u&=-7);return u.__e=y,f}function T$1(n,l,u,t,i){var r,o,e,f,c,a=u.length,s=a,h=0;for(n.__k=new Array(i),r=0;r<i;r++)null!=(o=l[r])&&"boolean"!=typeof o&&"function"!=typeof o?("string"==typeof o||"number"==typeof o||"bigint"==typeof o||o.constructor==String?o=n.__k[r]=x(null,o,null,null,null):g(o)?o=n.__k[r]=x(S,{children:o},null,null,null):void 0===o.constructor&&o.__b>0?o=n.__k[r]=x(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):n.__k[r]=o,f=r+h,o.__=n,o.__b=n.__b+1,e=null,-1!=(c=o.__i=O(o,u,f,s))&&(s--,(e=u[c])&&(e.__u|=2)),null==e||null==e.__v?(-1==c&&(i>a?h--:i<a&&h++),"function"!=typeof o.type&&(o.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,o.__u|=4))):n.__k[r]=null;if(s)for(r=0;r<a;r++)null!=(e=u[r])&&0==(2&e.__u)&&(e.__e==t&&(t=$(e)),K(e,e));return t}function j$1(n,l,u,t){var i,r;if("function"==typeof n.type){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,l=j$1(i[r],l,u,t));return l}n.__e!=l&&(t&&(l&&n.type&&!l.parentNode&&(l=$(n)),u.insertBefore(n.__e,l||null)),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8==l.nodeType);return l}function O(n,l,u,t){var i,r,o,e=n.key,f=n.type,c=l[u],a=null!=c&&0==(2&c.__u);if(null===c&&null==e||a&&e==c.key&&f==c.type)return u;if(t>(a?1:0))for(i=u-1,r=u+1;i>=0||r<l.length;)if(null!=(c=l[o=i>=0?i--:r++])&&0==(2&c.__u)&&e==c.key&&f==c.type)return o;return  -1}function z$1(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||_.test(l)?u:u+"px";}function N(n,l,u,t,i){var r,o;n:if("style"==l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||z$1(n.style,l,"");if(u)for(l in u)t&&u[l]==t[l]||z$1(n.style,l,u[l]);}else if("o"==l[0]&&"n"==l[1])r=l!=(l=l.replace(s$1,"$1")),o=l.toLowerCase(),l=o in n||"onFocusOut"==l||"onFocusIn"==l?o.slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t?u[a$1]=t[a$1]:(u[a$1]=h$1,n.addEventListener(l,r?v$1:p$1,r)):n.removeEventListener(l,r?v$1:p$1,r);else {if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||false===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u));}}function V(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u[c$1])u[c$1]=h$1++;else if(u[c$1]<t[a$1])return;return t(l$1.event?l$1.event(u):u)}}}function q(n,u,t,i,r,o,e,f,c,a){var s,h,p,v,y,d,_,k,x,M,$,I,P,A,H,T=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),o=[f=u.__e=t.__e]),(s=l$1.__b)&&s(u);n:if("function"==typeof T)try{if(k=u.props,x=T.prototype&&T.prototype.render,M=(s=T.contextType)&&i[s.__c],$=s?M?M.props.value:s.__:i,t.__c?_=(h=u.__c=t.__c).__=h.__E:(x?u.__c=h=new T(k,$):(u.__c=h=new C$1(k,$),h.constructor=T,h.render=Q),M&&M.sub(h),h.state||(h.state={}),h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),x&&null==h.__s&&(h.__s=h.state),x&&null!=T.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=m$1({},h.__s)),m$1(h.__s,T.getDerivedStateFromProps(k,h.__s))),v=h.props,y=h.state,h.__v=u,p)x&&null==T.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),x&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(x&&null==T.getDerivedStateFromProps&&k!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(k,$),u.__v==t.__v||!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(k,h.__s,$)){u.__v!=t.__v&&(h.props=k,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u);}),w$1.push.apply(h.__h,h._sb),h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(k,h.__s,$),x&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,d);});}if(h.context=$,h.props=k,h.__P=n,h.__e=!1,I=l$1.__r,P=0,x)h.state=h.__s,h.__d=!1,I&&I(u),s=h.render(h.props,h.state,h.context),w$1.push.apply(h.__h,h._sb),h._sb=[];else do{h.__d=!1,I&&I(u),s=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++P<25);h.state=h.__s,null!=h.getChildContext&&(i=m$1(m$1({},i),h.getChildContext())),x&&!p&&null!=h.getSnapshotBeforeUpdate&&(d=h.getSnapshotBeforeUpdate(v,y)),A=null!=s&&s.type===S&&null==s.key?E(s.props.children):s,f=L(n,g(A)?A:[A],u,t,i,r,o,e,f,c,a),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),_&&(h.__E=h.__=null);}catch(n){if(u.__v=null,c||null!=o)if(n.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;)f=f.nextSibling;o[o.indexOf(f)]=null,u.__e=f;}else {for(H=o.length;H--;)b(o[H]);B$1(u);}else u.__e=t.__e,u.__k=t.__k,n.then||B$1(u);l$1.__e(n,u,t);}else null==o&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=G(t.__e,u,t,i,r,o,e,c,a);return (s=l$1.diffed)&&s(u),128&u.__u?void 0:f}function B$1(n){n&&(n.__c&&(n.__c.__e=true),n.__k&&n.__k.some(B$1));}function D$1(n,u,t){for(var i=0;i<t.length;i++)J(t[i],t[++i],t[++i]);l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function E(n){return "object"!=typeof n||null==n||n.__b>0?n:g(n)?n.map(E):void 0!==n.constructor?null:m$1({},n)}function G(u,t,i,r,o,e,f,c,a){var s,h,p,v,y,w,_,m=i.props||d$1,k=t.props,x=t.type;if("svg"==x?o="http://www.w3.org/2000/svg":"math"==x?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=e)for(s=0;s<e.length;s++)if((y=e[s])&&"setAttribute"in y==!!x&&(x?y.localName==x:3==y.nodeType)){u=y,e[s]=null;break}if(null==u){if(null==x)return document.createTextNode(k);u=document.createElementNS(o,x,k.is&&k),c&&(l$1.__m&&l$1.__m(t,e),c=false),e=null;}if(null==x)m===k||c&&u.data==k||(u.data=k);else {if(e="textarea"==x&&null!=k.defaultValue?null:e&&n.call(u.childNodes),!c&&null!=e)for(m={},s=0;s<u.attributes.length;s++)m[(y=u.attributes[s]).name]=y.value;for(s in m)y=m[s],"dangerouslySetInnerHTML"==s?p=y:"children"==s||s in k||"value"==s&&"defaultValue"in k||"checked"==s&&"defaultChecked"in k||N(u,s,null,y,o);for(s in k)y=k[s],"children"==s?v=y:"dangerouslySetInnerHTML"==s?h=y:"value"==s?w=y:"checked"==s?_=y:c&&"function"!=typeof y||m[s]===y||N(u,s,y,m[s],o);if(h)c||p&&(h.__html==p.__html||h.__html==u.innerHTML)||(u.innerHTML=h.__html),t.__k=[];else if(p&&(u.innerHTML=""),L("template"==t.type?u.content:u,g(v)?v:[v],t,i,r,"foreignObject"==x?"http://www.w3.org/1999/xhtml":o,e,f,e?e[0]:i.__k&&$(i,0),c,a),null!=e)for(s=e.length;s--;)b(e[s]);c&&"textarea"!=x||(s="value","progress"==x&&null==w?u.removeAttribute("value"):null!=w&&(w!==u[s]||"progress"==x&&!w||"option"==x&&w!=m[s])&&N(u,s,w,m[s],o),s="checked",null!=_&&_!=u[s]&&N(u,s,_,m[s],o));}return u}function J(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u));}else n.current=u;}catch(n){l$1.__e(n,t);}}function K(n,u,t){var i,r;if(l$1.unmount&&l$1.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||J(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$1.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&K(i[r],u,t||"function"!=typeof n.type);t||b(n.__e),n.__c=n.__=n.__e=void 0;}function Q(n,l,u){return this.constructor(n,u)}function R(u,t,i){var r,o,e,f;t==document&&(t=document.documentElement),l$1.__&&l$1.__(u,t),o=(r="function"=="undefined")?null:t.__k,e=[],f=[],q(t,u=(t).__k=k$1(S,null,[u]),o||d$1,d$1,t.namespaceURI,o?null:t.firstChild?n.call(t.childNodes):null,e,o?o.__e:t.firstChild,r,f),D$1(e,u,f);}n=w$1.slice,l$1={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l;}throw n}},u$1=0,C$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=m$1({},this.state),"function"==typeof n&&(n=n(m$1({},u),this.props)),n&&m$1(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),A$1(this));},C$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=true,n&&this.__h.push(n),A$1(this));},C$1.prototype.render=S,i$1=[],o$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e$1=function(n,l){return n.__v.__b-l.__v.__b},H.__r=0,f$1=Math.random().toString(8),c$1="__d"+f$1,a$1="__a"+f$1,s$1=/(PointerCapture)$|Capture$/i,h$1=0,p$1=V(false),v$1=V(true);

var t,r,u,i,o=0,f=[],c=l$1,e=c.__b,a=c.__r,v=c.diffed,l=c.__c,m=c.unmount,s=c.__;function p(n,t){c.__h&&c.__h(r,n,o||t),o=0;var u=r.__H||(r.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({}),u.__[n]}function d(n){return o=1,h(D,n)}function h(n,u,i){var o=p(t++,2);if(o.t=n,!o.__c&&(o.__=[D(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r,!r.__f)){var f=function(n,t,r){if(!o.__c.__H)return  true;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=o.__c.props!==n;return u.some(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=true);}}),c&&c.call(this,n,t,r)||i};r.__f=true;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r.shouldComponentUpdate=f;}return o.__N||o.__}function y(n,u){var i=p(t++,3);!c.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r.__H.__h.push(i));}function A(n){return o=5,T(function(){return {current:n}},[])}function T(n,r){var u=p(t++,7);return C(u.__H,r)&&(u.__=n(),u.__H=r,u.__h=n),u.__}function j(){for(var n;n=f.shift();){var t=n.__H;if(n.__P&&t)try{t.__h.some(z),t.__h.some(B),t.__h=[];}catch(r){t.__h=[],c.__e(r,n.__v);}}}c.__b=function(n){r=null,e&&e(n);},c.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),s&&s(n,t);},c.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0;})):(i.__h.some(z),i.__h.some(B),i.__h=[],t=0)),u=r;},c.diffed=function(n){v&&v(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f.push(t)&&i===c.requestAnimationFrame||((i=c.requestAnimationFrame)||w)(j)),t.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0;})),u=r=null;},c.__c=function(n,t){t.some(function(n){try{n.__h.some(z),n.__h=n.__h.filter(function(n){return !n.__||B(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],c.__e(r,n.__v);}}),l&&l(n,t);},c.unmount=function(n){m&&m(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.some(function(n){try{z(n);}catch(n){t=n;}}),r.__H=void 0,t&&c.__e(t,r.__v));};var k="function"==typeof requestAnimationFrame;function w(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,35);k&&(t=requestAnimationFrame(r));}function z(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t;}function B(n){var t=r;n.__c=n.__(),r=t;}function C(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D(n,t){return "function"==typeof t?t(n):t}

const Footer = () => k$1(S, null, k$1("div", {
  className: "mt-8 mb-4 flex flex-col justify-center items-center"
}, k$1("span", {
  className: "text-sm text-slate-400"
}, "Made by"), k$1("div", {
  className: "text-lg"
}, k$1("a", {
  href: "https://rene.wang"
}, "Rene Wang"))));

const EmptyHint = () => k$1("div", {
  class: "bg-white p-4 rounded-xl flex flex-col justify-center h-56"
}, k$1("p", {
  class: "text-gray-700 mt-1 w-full font-bold text-xl text-center"
}, "No Record Yet"), k$1("p", {
  class: "text-gray-700 w-full text-base text-center"
}, "Take a look at x.com and check back later"));

function Tweet({
  tweet
}) {
  return k$1("div", {
    class: `${tweet.engaged ? "border-blue-400 border-2 group is-engaged" : "border border-gray-200"} mb-4 rounded-xl relative group/item flex overflow-hidden break-inside-avoid ${tweet.bookmarked ? "is-bookmarked" : ""}`
  }, k$1("span", {
    className: "bg-blue-400 hidden group-[.is-engaged]:block h-5 text-white px-2 absolute rounded-tl-sm rounded-b-none right-0 bottom-0"
  }, "Engaged"), k$1("a", {
    target: "_blank",
    class: "w-full",
    href: tweet.tweetUrl
  }, k$1("div", {
    class: "bg-white hover:bg-gray-100 cursor-pointer p-4 transition-all group-hover/item:translate-x-[-80px]"
  }, k$1("div", {
    class: "flex justify-between"
  }, k$1("span", {
    class: "name"
  }, tweet.userName), k$1("span", {
    class: "text-gray-500"
  }, formatDate(tweet.tweetTime))), k$1("p", {
    class: "text-gray-700 mt-1 w-full text-base"
  }, tweet.tweetBody), k$1("div", {
    class: "flex overflow-x-auto mt-2 gap-1"
  }, tweet.tweetImages.length > 0 && tweet.tweetImages.map(img => k$1("img", {
    class: "rounded-lg object-cover h-32 w-32",
    src: img
  }))))), k$1("div", {
    class: "cursor-pointer transition-all w-[80px] flex justify-center items-center absolute top-0 bottom-0 right-[-80px] group-hover/item:right-0"
  }, k$1("button", {
    onclick: () => toggleBookmark(tweet.tweetUrl),
    class: "h-full flex-1 flex flex-col justify-center bg-yellow-400 hover:bg-yellow-500"
  }, k$1("div", {
    className: "flex justify-center w-full"
  }, k$1("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 -960 960 960",
    width: "24",
    class: `${tweet.bookmarked ? "hidden" : "block"}`
  }, k$1("path", {
    d: "M480-240 200-120v-725h350v60H260v574l220-93 220 93v-334h60v425L480-240ZM260-785h290-290Zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60Z"
  })), k$1("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: `${tweet.bookmarked ? "block" : "hidden"}`,
    height: "24",
    viewBox: "0 -960 960 960",
    width: "24"
  }, k$1("path", {
    fill: "#ffffff",
    d: "M850-695H610v-60h240v60ZM480-240 200-120v-725h350v60H260v574l220-93 220 93v-334h60v425L480-240ZM260-785h290-290Z"
  })))), k$1("button", {
    onclick: () => deleteTweet(tweet.tweetUrl),
    class: "h-full flex-1 flex flex-col justify-center bg-red-400 hover:bg-red-500"
  }, k$1("div", {
    className: "flex justify-center w-full"
  }, k$1("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 -960 960 960",
    width: "24",
    class: "group-hover:ml-3"
  }, k$1("path", {
    fill: "#ffffff",
    d: "M261-120q-24.75 0-42.375-17.625T201-180v-570h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190-810h158q0-13 8.625-21.5T378-840h204q12.75 0 21.375 8.625T612-810h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770-750h-11v570q0 24.75-17.625 42.375T699-120H261Zm438-630H261v570h438v-570Zm-438 0v570-570Zm219 330 96 97q10 10 24 10.5t24-10q10-10.5 10-24T624-370l-96-98 96-98q10-10 10-23.5T624-613q-10-10-24-10t-24 10l-96 97-95-97q-10-10-24-10t-24 10q-10 10-10 24t10 24l96 97-96 97q-10 10-10 24t10 24q10 10 24 10t24-10l95-97Z"
  }))))));
}
function toggleBookmark(tweetUrl) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["tweets", "bookmarkedTweets"], function (data) {
      let tweets = data.tweets || [];
      let bookmarkedTweets = data.bookmarkedTweets || [];
      let updated = false;
      for (let tweet of tweets) {
        if (tweet.tweetUrl === tweetUrl) {
          tweet.bookmarked = !tweet.bookmarked; // Toggle the bookmark status
          if (tweet.bookmarked) {
            bookmarkedTweets.push(tweet);
          } else {
            bookmarkedTweets = bookmarkedTweets.filter(t => t.tweetUrl !== tweetUrl);
          }
          updated = true;
          break;
        }
      }
      if (updated) {
        chrome.storage.local.set({
          tweets: tweets,
          bookmarkedTweets: bookmarkedTweets
        }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}
function deleteTweet(tweetUrl, targets = ["tweets", "bookmarkedTweets"]) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(targets, function (data) {
      let updatedData = {};
      let updated = false;
      if (targets.includes("tweets")) {
        let tweets = data.tweets || [];
        for (let tweetIndex in tweets) {
          if (tweetUrl === tweets[tweetIndex].tweetUrl) {
            tweets.splice(tweetIndex, 1);
            updatedData.tweets = tweets;
            updated = true;
            break;
          }
        }
      }
      if (targets.includes("bookmarkedTweets")) {
        let bookmarkedTweets = data.bookmarkedTweets || [];
        bookmarkedTweets = bookmarkedTweets.filter(t => t.tweetUrl !== tweetUrl);
        if (data.bookmarkedTweets.length !== bookmarkedTweets.length) {
          updatedData.bookmarkedTweets = bookmarkedTweets;
          updated = true;
        }
      }
      if (updated) {
        chrome.storage.local.set(updatedData, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}
function searchTweets(searchTerm) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["tweets", "bookmarkedTweets"], function (data) {
      let tweets = data.tweets || [];
      let bookmarkedTweets = data.bookmarkedTweets || [];
      let results = tweets.filter(tweet => tweet.tweetBody.toLowerCase().includes(searchTerm.toLowerCase()));
      let bookmarkedResults = bookmarkedTweets.filter(tweet => tweet.tweetBody.toLowerCase().includes(searchTerm.toLowerCase()));
      resolve({
        results,
        bookmarkedResults
      });
    });
  });
}
function clearTweets(targets) {
  chrome.storage.local.remove(targets, function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
}
function formatDate(time) {
  const date = new Date(time);
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const absSeconds = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto"
  });
  const units = [["year", 60 * 60 * 24 * 365], ["month", 60 * 60 * 24 * 30], ["week", 60 * 60 * 24 * 7], ["day", 60 * 60 * 24], ["hour", 60 * 60], ["minute", 60]];
  for (const [unit, secondsInUnit] of units) {
    if (absSeconds >= secondsInUnit) {
      return rtf.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }
  return rtf.format(diffSeconds, "second");
}
function exportTweets(tweets) {
  const json = JSON.stringify(tweets);
  const blob = new Blob([json], {
    type: "application/json"
  });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "tweets.json";
  link.click();
  URL.revokeObjectURL(href); // free up storage--no longer needed.
}
function CornerLogo() {
  return k$1("div", {
    class: "fixed left-3 top-3 z-20 flex items-center gap-2 backdrop-blur px-2 py-1 rounded-md"
  }, k$1("img", {
    height: "20",
    width: "20",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnCAEEAgfkAvLDAAAF6klEQVRo3u2Za2wUVRTHf7vtstutCN0CLUJTeaiASKUQCDSUkogaBDQl+IVEwSqh+NZqkPBBQHkEDcRPBqQEEhoSEx5CyiMKaFQKCGik4VGQh33QBy3Qx7Zsd68fvF1mZmd2Z3YX+LL/+2Vm7p0z/3vm3HPuPQcSSCCBBB4ubHGS4iAZO4JufAQeFiEbfRjCSAaRRQa9cRCgg5tUU0sVF6mn+8ER6ksu+RQwgnSSQ3oFrVyjgsNUcD02jZnBQOZziFsEEBFaF2dZSY4O5bhpqA+zWcxYnMEnflppxks7Puy4SeFR0hT9AWooYzOXEPEmZCeXpbxIirz3cpXjHKOSOjrpwo+NXjhJ4wnGk8co0qT8AOf4iu9pj+ePSuEt/gn+jCZ2MIdsHIYT9ZDHKs7TLd9oYyPZ8aPjYR2tUvQdtpGP25ROh7OES9LaAhxhfHzoZFLKXSm0gjmmyNwjlUMp7XIyf1EQO53+bMGPQOBlE8OikJDKIq5JSpVMiY3OI3wj7eAWy+gdpRQbz/OnpHSKMdHTSeIjvAgELbxPr5imNpE/JKVyBkYrZDo1co18ariizGMylQgE3ayJbnKZHJECNgS9T2yYxQ0EgmZmWX/ZxlJpPQfJjAsdSOITuhAIjliXOYILCAS1TDMxOoPXyMUecVw6exEI7vK2NTp2vpQmuIakCGMdvMCPdHGZEtIjSi6gHoHgBIOsEBrKOQSC84yMMHIIX9MQjO/7eS5CdHeyUeqoyAqhIumbV4Qd5WYeJ6Xb7Gk3WMPjYd+aJE17N6lm6aSyRwqfaDjGxrNsCUY4ZfNTwathAoybXQgE9UwwS2g0/yIQ7DQUm867VIXZnN1hE88Ybm/ekPovMUtoLp0I/CzW7XVQwD65fI1bgAsU49GV8JTcymw3625Xy3ChFwizWCltIHLr5AfydIw8lQMIBGfMeSMXu2VkHhzSU0hFcNNlrtWyXCd2rUcgaGCcGUIDOCWDoNaChvG3wWe9NNOqWW/39LQg5BuLCCDo5BX1Y32P0Zs0AGro1PRcZTd26pim8sld7GEHN3AzhTc17u4CNSRxOOQb1XThwkGGGQ3lSBtZpdPXn+EsVh2BfKylj+y18xLXVdrZTzZP6qy2ybQgECwx1pCbAdgBP0PkMcZFtgwbzdySoxppZLpKxnE2cFteByjnOz5XELDRSIfOxDrxAWh3EUpCT/MtHgKAk0cBeJ2XARs+llNmqM+D1CnuBOW8Q38zP0IPSkJn+YkPVH7BgwcQlHHIUIKgXvOkmTYThFzySxorVZqml9WU6Zwv97GEJkPBtpDTVmbQosLBgwsI0GxMCFpYxgHNiz9TQnVY0TMYqrhLptDAO6sxGCfgC9FvCEZzUrFGTjNWZ0yxapUFKA06PicLaFKtsgMG0dCCYyzgkhR2kXzdEcWazIePX/mQGcxjm1zMkQhZDB1zaUBQzUyD/mKdVIyfDhnBzRAyDK76nnoX6RSxnnIz7CXsls4leTJKnpHeKAKhbjazk5uGua9YM5NuZuEAGvhF22W0+/XREEagldyhX8eR5DAJgGNUarsiH1v0UEWL6bGVIQHayXwyAB9745XCSmEdHSZ2QgF+0zmzTA0egwaHiraQjlTAywpOMiHC+VxwjT1c1jz18DEDAB9bIzjcBwI7JXIvfjRux/OYMJO66JMNSmQxDVfMdHrSMX7WKhLHltGPhRyngfdiTlj1RMkYElYARbTxf0pvaQwpvenBlN5pcmKaGBlsDSY9N6q2GmaRykKu0pP0zI9CggaZbFGkhQstpoXHsDm+aWFQJ85vs5UppkKpnWH3J3EOkMJCrgR9cCM7KCQrTGkhjUms4pyitLDJTGnBWvFlHJ+pii9XOMExKqmlHT9+bCTTi36y+DISj/Xii9WNRF9mU0yuwgH4aaWJNu7iw44TFx5VeUpQw3ZKqcJUeSoaPMYCDnHbZAHvC8bezwLePU2NI5+pEUqcR/ndaokz9iLwKLLJVBWBa6nj/IMuAmulxK1MnkACCSTwsPEfF/n4ctIyymwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDgtMDFUMDQ6MDI6MDQrMDA6MDCiLtkeAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA4LTAxVDA0OjAyOjA0KzAwOjAw03NhogAAABJ0RVh0ZXhpZjpFeGlmT2Zmc2V0ADI2UxuiZQAAABl0RVh0ZXhpZjpQaXhlbFhEaW1lbnNpb24AMTAyNPLFVh8AAAAZdEVYdGV4aWY6UGl4ZWxZRGltZW5zaW9uADEwMjRLPo33AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADE5MkBdcVUAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTky06whCAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjkwODYyNTI058q/fgAAAA90RVh0VGh1bWI6OlNpemUAMEJClKI+7AAAAFZ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL21udGxvZy9mYXZpY29ucy8yMDIzLTA4LTAxLzQ1NzYyZDZkY2Q2YmM2ZmE2MWMzNTYwOTNkZDNkNjA1Lmljby5wbmdCGETuAAAAAElFTkSuQmCC"
  }));
}
function App() {
  const [tweet, setTweet] = d([]);
  const [bookmarkedPost, setBookmarkedPost] = d([]);
  const [searchTerm, setSearchTerm] = d("");
  const [searchResults, setSearchResults] = d([]);
  const [activeTab, setActiveTab] = d("History");
  const [menuOpen, setMenuOpen] = d(false);
  const menuRef = A(null);
  y(() => {
    if (!menuOpen) return;
    const handleClick = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);
  const fetchTweets = () => {
    chrome.storage.local.get(["tweets", "bookmarkedTweets"], data => {
      let fetchedTweets = data.tweets || [];
      let fetchedBookmarkedTweets = data.bookmarkedTweets || [];
      fetchedTweets.sort((a, b) => new Date(b.captureDate) - new Date(a.captureDate));
      fetchedBookmarkedTweets.sort((a, b) => new Date(b.captureDate) - new Date(a.captureDate));
      setTweet(fetchedTweets);
      setBookmarkedPost(fetchedBookmarkedTweets);
    });
  };

  // Handle search term changes
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  // Search for tweets when search term changes
  y(() => {
    if (searchTerm) {
      searchTweets(searchTerm).then(results => {
        console.log(results);
        if (activeTab == "History") {
          setSearchResults([...results.results]);
        } else {
          setSearchResults([...results.bookmarkedResults]);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  y(() => {
    fetchTweets();
    const handleStorageChange = changes => {
      for (let key in changes) {
        if (key === "tweets" || key === "bookmarkedTweets") {
          fetchTweets(); // refetch the tweets
        }
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);
  return k$1("div", {
    class: "relative min-w-[800px] max-w-[1000px] mx-auto"
  }, k$1(CornerLogo, null), k$1("div", {
    class: "relative flex"
  }, k$1("main", {
    class: "flex-1 px-4 pt-14 rounded min-w-[700px] overflow-hidden w-full"
  }, k$1("nav", {
    class: "flex items-center gap-2 mb-4"
  }, ["History", "Favorite"].map(tab => k$1("button", {
    key: tab,
    onClick: () => setActiveTab(tab),
    class: `text-sm font-medium cursor-pointer rounded-full px-4 py-1.5 transition-colors ${activeTab == tab ? "bg-black text-white hover:bg-gray-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
  }, tab)), k$1("div", {
    class: "flex-1"
  }), k$1("div", {
    class: "relative flex items-center"
  }, k$1("svg", {
    class: "absolute left-3 pointer-events-none text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    height: "16",
    width: "16",
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, k$1("path", {
    d: "M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"
  })), k$1("input", {
    id: "searchInput",
    type: "text",
    value: searchTerm,
    onInput: handleSearchChange,
    placeholder: "Search",
    class: "h-9 pl-9 pr-3 w-48 rounded-full text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-400"
  })), k$1("button", {
    onClick: fetchTweets,
    title: "Refresh",
    "aria-label": "Refresh",
    class: "h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
  }, k$1("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "20",
    width: "20",
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, k$1("path", {
    d: "M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"
  }))), k$1("div", {
    class: "relative",
    ref: menuRef
  }, k$1("button", {
    onClick: () => setMenuOpen(o => !o),
    title: "More",
    "aria-label": "More",
    class: "h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
  }, k$1("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "20",
    width: "20",
    viewBox: "0 -960 960 960",
    fill: "currentColor"
  }, k$1("path", {
    d: "M480-200q-33 0-56.5-23.5T400-280q0-33 23.5-56.5T480-360q33 0 56.5 23.5T560-280q0 33-23.5 56.5T480-200Zm0-200q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-200q-33 0-56.5-23.5T400-680q0-33 23.5-56.5T480-760q33 0 56.5 23.5T560-680q0 33-23.5 56.5T480-600Z"
  }))), menuOpen && k$1("div", {
    class: "absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1"
  }, k$1("a", {
    onClick: () => {
      exportTweets(tweet);
      setMenuOpen(false);
    },
    class: "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
  }, "Export"), k$1("a", {
    href: "https://github.com/RiverTwilight/Timeline",
    target: "_blank",
    rel: "noreferrer",
    onClick: () => setMenuOpen(false),
    class: "block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
  }, "GitHub"), k$1("a", {
    onClick: () => {
      clearTweets(activeTab == "History" ? ["tweets"] : ["bookmarkedTweets"]);
      setMenuOpen(false);
    },
    class: "block px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
  }, "Clear ", activeTab), k$1("div", {
    class: "border-t border-gray-200 my-1"
  }), k$1("p", {
    class: "px-3 py-2 text-xs text-gray-500 leading-relaxed"
  }, tweet.length, "/100 posts saved. Chrome limits the storage available to extensions, so the oldest tweet is automatically replaced once the limit is reached.")))), searchTerm.length == 0 && k$1("section", null, activeTab == "Favorite" ? k$1("div", {
    class: "columns-2 gap-4 pt-4"
  }, bookmarkedPost.map(t => {
    return k$1(Tweet, {
      tweet: t
    });
  })) : k$1("div", {
    class: "columns-2 gap-4 pt-4"
  }, tweet.filter(t => {
    return t.bookmarked && activeTab == "Favorite" || activeTab != "Favorite";
  }).map(t => {
    return k$1(Tweet, {
      tweet: t
    });
  })), !!!tweet.length && activeTab == "History" && k$1(EmptyHint, {
    key: "history"
  }), !!!bookmarkedPost.length && activeTab == "Favorite" && k$1(EmptyHint, {
    key: "bookmakred"
  }), k$1(Footer, null)), searchTerm.length > 0 && k$1("section", {
    class: "columns-2 gap-4 pt-4"
  }, searchResults.filter(t => {
    return t.bookmarked && activeTab == "Favorite" || activeTab != "Favorite";
  }).map(t => {
    return k$1(Tweet, {
      tweet: t
    });
  })), k$1("section", {
    style: "display: none"
  }))));
}

// Render the App into the DOM
R(k$1(App, null), document.body);
