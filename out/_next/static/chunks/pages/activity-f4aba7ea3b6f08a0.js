(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[839],{41637:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/activity",function(){return n(63067)}])},63067:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return j}});var s=n(85893),t=n(65988),c=n.n(t),i=n(67294),r=n(3283),o=n.n(r),d=n(11163),l=n(53908),x="http://localhost:5000/api/transactions",f=n(9669);new(new(o())(o().givenProvider||o().providers.HttpProvider("https://testnet.emerald.oasis.dev")).eth.Contract)(l.abi,"0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE");function j(){var e=(0,i.useState)([]),a=e[0],n=e[1];(0,d.useRouter)();return(0,i.useEffect)((function(){f.get(x,{headers:{authorization:localStorage.getItem("jwt")}}).then((function(e){n(e.data)}))}),[]),(0,s.jsxs)("div",{className:"jsx-326ecf18e954645a MainBlock",children:[(0,s.jsxs)("div",{className:"jsx-326ecf18e954645a Activity",children:[(0,s.jsx)("h1",{className:"jsx-326ecf18e954645a",children:"Activity"}),(0,s.jsxs)("p",{className:"jsx-326ecf18e954645a HeaderTable",children:[(0,s.jsx)("span",{className:"jsx-326ecf18e954645a token",children:"TokenId"}),(0,s.jsx)("span",{className:"jsx-326ecf18e954645a",children:"From"}),(0,s.jsx)("span",{className:"jsx-326ecf18e954645a",children:"To"})]}),a.map((function(e,a){return(0,s.jsxs)("p",{className:"jsx-326ecf18e954645a HeaderTable",children:[(0,s.jsx)("span",{className:"jsx-326ecf18e954645a token",children:e.tokenid}),(0,s.jsx)("span",{className:"jsx-326ecf18e954645a",children:e.author}),(0,s.jsx)("span",{className:"jsx-326ecf18e954645a",children:e.newuser})]},a)})),(0,s.jsx)("br",{className:"jsx-326ecf18e954645a"}),(0,s.jsx)("button",{onClick:function(){f.get(x,{headers:{authorization:localStorage.getItem("jwt")}}).then((function(e){return n(e.data)}))},className:"jsx-326ecf18e954645a button blue",children:"refresh"})]}),(0,s.jsx)(c(),{id:"326ecf18e954645a",children:".MainBlock.jsx-326ecf18e954645a{margin-top:200px}\n.Activity.jsx-326ecf18e954645a{width:90%;\nmargin:0 auto}\n.Counter.jsx-326ecf18e954645a{text-align:center;\nmargin:50px 0;\nfont-size:20px}\n.HeaderTable.jsx-326ecf18e954645a{font-size:20px;\nborder-bottom:1px solid #ddd;\nmargin:0}\n.HeaderTable.jsx-326ecf18e954645a span.jsx-326ecf18e954645a{width:40%;\ndisplay:inline-block;\ntext-align:center;\nmargin-right:20px;\npadding:20px}\n.HeaderTable.jsx-326ecf18e954645a span.jsx-326ecf18e954645a:first-of-type{width:10%}\nh1.jsx-326ecf18e954645a{border-bottom:1px solid #ddd;\npadding-bottom:20px}"})]})}}},function(e){e.O(0,[669,908,774,888,179],(function(){return a=41637,e(e.s=a);var a}));var a=e.O();_N_E=a}]);