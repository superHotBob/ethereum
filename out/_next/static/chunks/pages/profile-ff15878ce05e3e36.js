(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{40883:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return t(22217)}])},94194:function(n,e){"use strict";e.Z={src:"/_next/static/media/await.8d815671.gif",height:192,width:192}},22217:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return b}});var a=t(34051),i=t.n(a),r=t(85893),s=t(65988),o=t.n(s),c=t(41664),l=t(67294),d=t(3283),f=t.n(d),p=t(25675),x=t(81043),u=t(75989),m=t(94194);function h(n,e,t,a,i,r,s){try{var o=n[r](s),c=o.value}catch(l){return void t(l)}o.done?e(c):Promise.resolve(c).then(a,i)}function y(n){return function(){var e=this,t=arguments;return new Promise((function(a,i){var r=n.apply(e,t);function s(n){h(r,a,i,s,o,"next",n)}function o(n){h(r,a,i,s,o,"throw",n)}s(void 0)}))}}var g=t(53908);function b(){var n=(0,x.v9)(u.sz),e=(0,l.useState)([]),t=e[0],a=e[1],s=(0,l.useState)(!0),d=s[0],h=s[1],b=(0,l.useState)(!0),_=b[0],k=b[1],v=new(new(f())(f().givenProvider||f().providers.HttpProvider("https://testnet.emerald.oasis.dev")).eth.Contract)(g.abi,"0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE");return(0,l.useEffect)((function(){function e(){return(e=y(i().mark((function e(){var t,r,s,o,c,l,d,f;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d=function(){return f.apply(this,arguments)},f=function(){return(f=y(i().mark((function n(){var e,t,s,o,c,d;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=!0,t=!1,s=void 0,n.prev=1,o=r[Symbol.iterator]();case 3:if(e=(c=o.next()).done){n.next=10;break}return d=c.value,n.next=7,fetch("https://ipfs.io/ipfs/".concat(d.tokenMetadataURI),{method:"get"}).then((function(n){return n.json()})).then((function(n){return l.push({name:n.name,description:n.description,image:n.image,id:d.tokenId})}));case 7:e=!0,n.next=3;break;case 10:n.next=16;break;case 12:n.prev=12,n.t0=n.catch(1),t=!0,s=n.t0;case 16:n.prev=16,n.prev=17,e||null==o.return||o.return();case 19:if(n.prev=19,!t){n.next=22;break}throw s;case 22:return n.finish(19);case 23:return n.finish(16);case 24:a(l);case 25:case"end":return n.stop()}}),n,null,[[1,12,16,24],[17,,19,23]])})))).apply(this,arguments)},e.next=4,v.methods.balanceOf(n).call();case 4:t=e.sent,console.log(t),r=[],s=0;case 8:if(!(s<t)){e.next=19;break}return e.next=11,v.methods.tokenOfOwnerByIndex(n,s).call();case 11:return o=e.sent,e.next=14,v.methods.tokenURI(o).call();case 14:c=e.sent,r.push({tokenId:o,tokenMetadataURI:c});case 16:s++,e.next=8;break;case 19:console.log(r),l=[],d();case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),(0,r.jsxs)("div",{className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" start_main",children:[(0,r.jsxs)("h1",{className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" head_nft",children:["Explore MY NFTs",(0,r.jsx)("button",{onClick:function(){return k(!_)},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" size",children:"view"}),(0,r.jsx)("button",{onClick:function(){return h(!d)},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" size",children:"sort"})]}),t.length>0?(0,r.jsx)("div",{className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" all_nft",children:t.sort((function(n,e){return d?n.id-e.id:e.id-n.id})).map((function(n){return(0,r.jsx)(c.default,{href:"/token/[pid]",as:"/token/".concat(n.id),children:(0,r.jsx)("a",{style:{marginRight:9},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]]),children:(0,r.jsxs)("div",{style:{backgroundImage:"url(".concat(n.image,")")},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" image_block",children:["tokenId:",n.id,n.image.search("video")>0&&(0,r.jsx)("div",{style:{marginTop:"15%"},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]]),children:(0,r.jsx)("video",{width:"80%",autoPlay:!0,loop:!0,mute:!0,src:n.image,type:"video/mp4",className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])})}),n.image.search("audio")>0&&(0,r.jsx)("div",{style:{marginTop:"15%"},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]]),children:(0,r.jsx)("audio",{controls:!0,loop:!0,type:"audio/mpeg",src:n.image,className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])})}),(0,r.jsxs)("h3",{className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" name_image",children:[n.name,(0,r.jsx)("p",{className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]])+" description",children:n.description})]})]})})},n.id)}))}):(0,r.jsx)("h1",{style:{margin:"30vh auto",width:150,border:"none"},className:o().dynamic([["116c57d9293aff1d",[_?"29":"21.6",_?"30":"20"]]]),children:(0,r.jsx)(p.default,{src:m.Z,width:100,height:100,alt:"await"})}),(0,r.jsx)(o(),{id:"116c57d9293aff1d",dynamic:[_?"29":"21.6",_?"30":"20"],children:'p.__jsx-style-dynamic-selector, h5.__jsx-style-dynamic-selector{text-align:left;\nmargin:5px 0}\n.start_main.__jsx-style-dynamic-selector{margin:160px auto;\nwidth:90%}\n.all_nft.__jsx-style-dynamic-selector{display:-webkit-box;\ndisplay:-webkit-flex;\ndisplay:-ms-flexbox;\ndisplay:flex;\nflex-wrap:wrap;\n-webkit-align-content:flex-start;\n-ms-flex-line-pack:flex-start;\nalign-content:flex-start}\n.size.__jsx-style-dynamic-selector{margin-left:20px}\n.collection.__jsx-style-dynamic-selector{display:inline-block;\nwidth:40px;\nvertical-align:top;\nline-height:40px;\nfont-size:16px;\ncolor:#fff;\ntext-align:center;\nheight:40px;\nborder-radius:40px;\nbackground:linear-gradient(to left, #121fcf, #c19ae5);\ncursor:pointer;\nposition:relative;\n-webkit-transition:all 0.5s;\ntransition:all 0.5s}\n.owner.__jsx-style-dynamic-selector{background:linear-gradient(to left, #121fcf, red);\nleft:-10px}\n.creator.__jsx-style-dynamic-selector{background:linear-gradient(to left, yellow, #c19ae5);\nleft:-20px}\n.main.__jsx-style-dynamic-selector:hover, .owner.__jsx-style-dynamic-selector:hover, .creator.__jsx-style-dynamic-selector:hover{margin-top:-10px;\n-webkit-transition:all 0.5s;\ntransition:all 0.5s}\n.main.__jsx-style-dynamic-selector:before{content:"Collection: ENS domain";\nposition:absolute;\ntop:-100px;\nleft:-70px;\nwidth:180px;\ncolor:#000;\nbox-shadow:0px 3px 8px 0px rgba(34, 60, 80, 0.2);\nbackground:#fff;\npadding:10px;\nborder-radius:10px;\nopacity:0;\n-webkit-transition:all 0.5s;\ntransition:all 0.5s}\n.main.__jsx-style-dynamic-selector:hover:before{opacity:1;\ntop:-70px}\n.image_block.__jsx-style-dynamic-selector{width:'.concat(_?"29":"21.6","vw;\nheight:").concat(_?"30":"20","vw;\npadding:2% 0 10px;\nmargin-top:19px;\ndisplay:inline-block;\nborder-radius:15px;\ntext-align:center;\nposition:relative;\nbackground-size:auto 70%;\nbackground-repeat:no-repeat;\nbackground-position:center 40%}\n.image_block.__jsx-style-dynamic-selector:hover{box-shadow:0px 3px 8px 5px rgba(34, 60, 80, 0.2);\n-webkit-transition:all 0.5s;\ntransition:all 0.5s}\n.size.__jsx-style-dynamic-selector{font: 500 20px/50px Roboto, sans-serif;\nfloat:right;\nborder-radius:50px}\n.name_image.__jsx-style-dynamic-selector{text-align:center;\nfont: 700 20px/22px Roboto, sans-serif;\nposition:absolute;\nbottom:0;\nwidth:100%;\nmargin-bottom:0}\n.description.__jsx-style-dynamic-selector{font: 500 16px/20px Roboto, sans-serif;\ntext-align:center}\nh1.__jsx-style-dynamic-selector{text-align:left;\nfont-size:50px;\nmargin:0;\npadding:20px 0;\nfont-size:50px;\nborder-bottom:1px solid #ddd}\nh5.__jsx-style-dynamic-selector{background:#121fcf;\nbackground: -webkit-linear-gradient(to left, #121fcf 50%, #c19ae5);\nbackground: -moz-linear-gradient(to left, #121fcf 50%, #c19ae5);\nbackground: linear-gradient(to left, #121fcf 50%, #c19ae5);\n-webkit-background-clip:text;\nbackground-clip:text;\n-webkit-text-fill-color:transparent}")})]})}}},function(n){n.O(0,[908,774,888,179],(function(){return e=40883,n(n.s=e);var e}));var e=n.O();_N_E=e}]);