(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11f7ccae"],{2187:function(t,n,c){},"51c4":function(t,n,c){"use strict";var e=c("2187"),a=c.n(e);a.a},"8b24":function(t,n,c){"use strict";c.r(n);var e=function(){var t=this,n=t.$createElement,c=t._self._c||n;return c("div",{staticClass:"scroll-main"},[c("div",{ref:"tabEle",staticClass:"scroll-tap"},t._l(t.tabs,function(n,e){return c("p",{key:e,staticClass:"tab-item",class:{active:t.tabIndex===e},on:{click:function(n){return t.changeTab(e)}}},[t._v(t._s(n))])}),0),c("div",{ref:"contentEle",staticClass:"scroll-content"},t._l(t.content,function(n,e){return c("p",{key:e,staticClass:"content-item"},[t._v(t._s(n))])}),0)])},a=[],s=c("58da"),i={data:function(){return{tabs:[],content:[],maxNum:4,tabIndex:0,scrollTab:null}},created:function(){this.init()},methods:{init:function(){for(var t=this,n=this.maxNum,c=0;c<n;c++)this.tabs.push("这是一个tab".concat(c+1)),this.content.push("这是一个内容".concat(c+1));this.$nextTick(function(){t.scrollTab=new s["a"]({tabEle:t.$refs.tabEle,contentEle:t.$refs.contentEle,changeTab:function(n){console.log("index: ",n),t.tabIndex=n}})})},changeTab:function(t){this.scrollTab.changeTab(t)}},beforeDestroy:function(){this.scrollTab.removeEvent()}},o=i,l=(c("51c4"),c("2877")),r=Object(l["a"])(o,e,a,!1,null,"0d6767f8",null);n["default"]=r.exports}}]);
//# sourceMappingURL=chunk-11f7ccae.5dc3332f.js.map