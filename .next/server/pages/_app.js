"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3189:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__(9816);
var style_default = /*#__PURE__*/__webpack_require__.n(style_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
;// CONCATENATED MODULE: ./public/image/copy.svg
/* harmony default export */ const copy = ({"src":"/_next/static/media/copy.59c5fca0.svg","height":64,"width":64});
;// CONCATENATED MODULE: ./public/image/Icon_close.png
/* harmony default export */ const Icon_close = ({"src":"/_next/static/media/Icon_close.b712ff3b.png","height":16,"width":16,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAdUlEQVR42h2JOw6CUBREp6bWQmOjsZKKBF2ErUtwEYYXYyLir6D0DLoDd8mFk0nmJ8k7NyQqXi411mc3V/DJeLMVd898YiVxZO+zSFK3cOMHB8lVKCxz67+nGm5uXnIh/04i5b7KJS1rBd74RyHFRE1yck0h9aVWL+UstWYqAAAAAElFTkSuQmCC"});
// EXTERNAL MODULE: external "web3"
var external_web3_ = __webpack_require__(8519);
var external_web3_default = /*#__PURE__*/__webpack_require__.n(external_web3_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./public/image/refresh_icon.png
/* harmony default export */ const refresh_icon = ({"src":"/_next/static/media/refresh_icon.bba1bfec.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAWlBMVEUAqe8BqO0AqvABqO0Aqe8BqO0Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe8Aqe+lvZiFAAAAHXRSTlMAAQMGBwcKIiMlTFFSWl1eYmNqa2xwcXJziImys6HXZrAAAAA/SURBVHjaBYABEkAgEADXoS4iIkX1/28acPYuisDXY2gepiWNDFVJG2I4MvnECPuD1oE5rQZ8C7G/IGi5rOMHZEICyXUlHDMAAAAASUVORK5CYII="});
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./reduser/index.js
var reduser = __webpack_require__(5989);
// EXTERNAL MODULE: ./hooks/metamask.js + 1 modules
var metamask = __webpack_require__(2100);
;// CONCATENATED MODULE: ./components/navbar.js













function Navbar() {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { asPath  } = (0,router_.useRouter)();
    const { disconnect  } = (0,metamask/* default */.ZP)();
    (0,external_react_.useEffect)(()=>{
        localStorage.getItem("account") ? dispatch((0,reduser/* addAccount */.jF)(localStorage.getItem("account"))) : dispatch((0,reduser/* addAccount */.jF)(""));
    });
    const account = (0,external_react_redux_.useSelector)(reduser/* walletAddress */.sz);
    const my_balance = (0,external_react_redux_.useSelector)(reduser/* balance */.Rn);
    const { /*#__PURE__*/ 0: viewWallet , 1: setviewWallet  } = (0,external_react_.useState)(false);
    const { 0: textCopy , 1: setTextCopy  } = (0,external_react_.useState)("copy to clipboard");
    const { 0: refresh_balance , 1: setRefreshBalance  } = (0,external_react_.useState)(false);
    const web3 = new (external_web3_default())((external_web3_default()).givenProvider);
    async function SignOut() {
        disconnect();
        setviewWallet(false);
        dispatch((0,reduser/* addAccount */.jF)(""));
        localStorage.setItem("account", "");
    }
    function updateClipboard(newClip) {
        navigator.clipboard.writeText(newClip).then(function() {
            setTextCopy("Copied");
        });
    }
    function Refresh() {
        setRefreshBalance(true);
        web3.eth.getBalance(account).then((res)=>{
            dispatch((0,reduser/* changeBalance */.op)(res / 1000000000000000000));
            setTimeout(()=>setRefreshBalance(false)
            , 1000);
        });
    }
    const substr = account ? account.slice(7, account.length - 5) : null;
    const new_str = account ? account.replace(substr, "...") : null;
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: style_default().dynamic([
            [
                "4aebe519cd27bc5f",
                [
                    textCopy
                ]
            ]
        ]) + " " + "NavbarMain",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: style_default().dynamic([
                    [
                        "4aebe519cd27bc5f",
                        [
                            textCopy
                        ]
                    ]
                ]),
                children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                    href: "/",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        className: style_default().dynamic([
                            [
                                "4aebe519cd27bc5f",
                                [
                                    textCopy
                                ]
                            ]
                        ]) + " " + "to_main_page",
                        children: "Home page"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                className: style_default().dynamic([
                    [
                        "4aebe519cd27bc5f",
                        [
                            textCopy
                        ]
                    ]
                ]) + " " + "navy",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/explore",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]) + " " + ((asPath === "/explore" ? "active" : "") || ""),
                            children: "Explore"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/profile",
                        children: account && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]) + " " + ((asPath === "/profile" ? "active" : "") || ""),
                            children: "My NFTs"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/activity",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]) + " " + ((asPath === "/activity" ? "active" : "") || ""),
                            children: "Activity"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: style_default().dynamic([
                    [
                        "4aebe519cd27bc5f",
                        [
                            textCopy
                        ]
                    ]
                ]),
                children: [
                    !account ? /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/connect",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]) + " " + "sing_in",
                            children: "Sign in"
                        })
                    }) : null,
                    account && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        onClick: ()=>setviewWallet(true)
                        ,
                        className: style_default().dynamic([
                            [
                                "4aebe519cd27bc5f",
                                [
                                    textCopy
                                ]
                            ]
                        ]) + " " + "open_wallet"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/create",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]) + " " + "create",
                            children: "Create"
                        })
                    })
                ]
            }),
            viewWallet && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: style_default().dynamic([
                    [
                        "4aebe519cd27bc5f",
                        [
                            textCopy
                        ]
                    ]
                ]) + " " + "wallet_name",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: style_default().dynamic([
                            [
                                "4aebe519cd27bc5f",
                                [
                                    textCopy
                                ]
                            ]
                        ]) + " " + "close",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
                            alt: "close",
                            src: Icon_close,
                            width: 20,
                            height: 20,
                            onClick: ()=>setviewWallet(false)
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                        className: style_default().dynamic([
                            [
                                "4aebe519cd27bc5f",
                                [
                                    textCopy
                                ]
                            ]
                        ]) + " " + "hash",
                        children: [
                            new_str,
                            " ",
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: style_default().dynamic([
                                    [
                                        "4aebe519cd27bc5f",
                                        [
                                            textCopy
                                        ]
                                    ]
                                ]) + " " + "copy_account",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
                                    src: copy,
                                    width: 18,
                                    height: 18,
                                    alt: "copy",
                                    onClick: ()=>updateClipboard(account)
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: style_default().dynamic([
                            [
                                "4aebe519cd27bc5f",
                                [
                                    textCopy
                                ]
                            ]
                        ]) + " " + "balance",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            style: {
                                backgroundImage: 'url(/image/ethereum.svg)'
                            },
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]) + " " + "my__hash",
                            children: refresh_balance ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: style_default().dynamic([
                                    [
                                        "4aebe519cd27bc5f",
                                        [
                                            textCopy
                                        ]
                                    ]
                                ]) + " " + "refresh",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
                                    src: refresh_icon,
                                    width: 45,
                                    height: 45,
                                    alt: "refresh"
                                })
                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    "Balance",
                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {
                                        className: style_default().dynamic([
                                            [
                                                "4aebe519cd27bc5f",
                                                [
                                                    textCopy
                                                ]
                                            ]
                                        ])
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("b", {
                                        onClick: Refresh,
                                        title: "refresh",
                                        className: style_default().dynamic([
                                            [
                                                "4aebe519cd27bc5f",
                                                [
                                                    textCopy
                                                ]
                                            ]
                                        ]),
                                        children: [
                                            my_balance,
                                            " TEST"
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/profile",
                        passHref: true,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            style: {
                                backgroundImage: 'url(/image/user.png)'
                            },
                            className: style_default().dynamic([
                                [
                                    "4aebe519cd27bc5f",
                                    [
                                        textCopy
                                    ]
                                ]
                            ]),
                            children: "My NFTs"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: SignOut,
                        style: {
                            backgroundImage: 'url(/image/power-off.png)'
                        },
                        className: style_default().dynamic([
                            [
                                "4aebe519cd27bc5f",
                                [
                                    textCopy
                                ]
                            ]
                        ]),
                        children: "Sign out"
                    })
                ]
            }),
            jsx_runtime_.jsx((style_default()), {
                id: "4aebe519cd27bc5f",
                dynamic: [
                    textCopy
                ],
                children: `.NavbarMain.__jsx-style-dynamic-selector{padding:30px 0;
width:90%;
margin:0 auto;
position:fixed;
display:-webkit-box;
display:-webkit-flex;
display:-ms-flexbox;
display:flex;
z-index:2;
-webkit-flex-direction:row;
-ms-flex-direction:row;
flex-direction:row;
-webkit-box-pack:justify;
-webkit-justify-content:space-between;
justify-content:space-between;
top:0;
left:5%;
font-family:Roboto, sans-serif;
background:#fff}
.open_wallet.__jsx-style-dynamic-selector{height:57px;
width:57px;
background:red;
display:inline-block;
border-radius:40px;
vertical-align:bottom;
float:right;
cursor:pointer}
.navy.__jsx-style-dynamic-selector{display:inline-block;
width:30%;
font-size:20px;
display:-webkit-box;
display:-webkit-flex;
display:-ms-flexbox;
display:flex;
-webkit-box-pack:justify;
-webkit-justify-content:space-between;
justify-content:space-between}
.navy.__jsx-style-dynamic-selector span.__jsx-style-dynamic-selector{cursor:pointer;
font-size:40px;
height:20px;
margin-top:-5px;
color:rgba(4, 4, 5, 0.5)}
.navy.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector{font-weight:500;
line-height:60px;
color:rgba(4, 4, 5, 0.5);
font-family:Roboto, sans-serif}
.navy.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector:hover, .navy.__jsx-style-dynamic-selector span.__jsx-style-dynamic-selector:hover{color:rgba(4, 4, 5, 1)}
.sing_in.__jsx-style-dynamic-selector, .create.__jsx-style-dynamic-selector{float:right;
font-weight:700;
font-size:20px;
padding:15px 30px;
border:1px solid #ccc;
border-radius:50px}
.to_main_page.__jsx-style-dynamic-selector{line-height:60px;
font-size:18px;
font-weight:700;
border-radius:15px;
font-family:Roboto, sans-serif}
.create.__jsx-style-dynamic-selector{margin-right:20px;
background-image: linear-gradient(
            to right,
            rgb(255, 0, 184) 0%,
            rgb(100, 161, 255) 100%,
            rgb(0, 102, 255) 100%
          );
color:#fff;
-webkit-transition:all 1s;
transition:all 1s}
.create.__jsx-style-dynamic-selector:hover{background-image: linear-gradient(
            to left,
            rgb(255, 0, 184) 0%,
            rgb(100, 161, 255) 100%,
            rgb(0, 102, 255) 100%
          );
-webkit-transition:all 1s;
transition:all 1s}
label.__jsx-style-dynamic-selector{width:29%;
position:relative;
background-image:url("/static/search.svg");
background-repeat:no-repeat;
background-position:15% center}
.img.__jsx-style-dynamic-selector{position:absolute;
top:30px;
left:50px}
.close.__jsx-style-dynamic-selector{float:right;
cursor:pointer}
.close.__jsx-style-dynamic-selector:hover{-webkit-transform:scale(1.2);
-moz-transform:scale(1.2);
-ms-transform:scale(1.2);
transform:scale(1.2)}
input.__jsx-style-dynamic-selector{font-weight:700;
font-size:20px;
padding:17px 30px 17px 60px;
height:60.5px;
box-sizing:border-box;
border-radius:50px;
margin-left:30px;
vertical-align:middle;
border:none;
background:rgba(4, 4, 5, 0.07)}
input.__jsx-style-dynamic-selector:focus{background:#fff;
border:none;
outline:5px solid #ccc;
border:1px solid #bbb}
.wallet_name.__jsx-style-dynamic-selector{width:450px;
height:auto;
border-radius:15px;
position:absolute;
top:120px;
padding:10px;
right:0;
background:#fff;
box-shadow:0px 0px 27px 0px rgba(34, 60, 80, 0.2)}
.wallet_name.__jsx-style-dynamic-selector>button.__jsx-style-dynamic-selector{padding:20px;
width:100%;
border:none;
text-align:left;
background-color:#fff;
margin:10px 0 0;
padding-left:60px;
background-size:7%;
background-repeat:no-repeat;
background-position:4% center;
font-weight:700;
font-size:18px}
.refresh.__jsx-style-dynamic-selector{-webkit-animation:rotation 2s infinite linear;
animation:rotation 2s infinite linear;
display:inline-block;
width:46px;
height:46px;
padding:0}
.hash.__jsx-style-dynamic-selector{padding-left:20px}
.hash.__jsx-style-dynamic-selector img.__jsx-style-dynamic-selector{cursor:pointer}
.copy_account.__jsx-style-dynamic-selector{cursor:pointer}
.copy_account.__jsx-style-dynamic-selector:before{content:"${textCopy}";
font: 500 16px/16px Roboto, sans-serif;
background:#000;
color:#fff;
opacity:0;
position:absolute;
top:-10px;
left:130px;
border-radius:15px;
padding:10px;
width:150px;
text-align:center}
.copy_account.__jsx-style-dynamic-selector:hover:before{opacity:1}
.wallet_name.__jsx-style-dynamic-selector>button.__jsx-style-dynamic-selector:hover{background-color:rgba(4, 4, 5, 0.07);
border-radius:10px}
.wallet_name.__jsx-style-dynamic-selector b.__jsx-style-dynamic-selector{float:right;
cursor:pointer}
.balance.__jsx-style-dynamic-selector{width:100%;
height:55%;
border:1px solid rgba(4, 4, 5, 0.1);
border-radius:12px;
padding:12px 16px}
.balance.__jsx-style-dynamic-selector b.__jsx-style-dynamic-selector{font: 700 20px/30px Roboto, sans-serif;
float:none;
color:#000}
.balance.__jsx-style-dynamic-selector button.__jsx-style-dynamic-selector{width:100%;
height:45px;
border:1px solid rgba(4, 4, 5, 0.1);
border-radius:50px;
background:#fff;
font: 700 18px/20px Roboto, sans-serif}
.balance.__jsx-style-dynamic-selector div.__jsx-style-dynamic-selector button.__jsx-style-dynamic-selector{width:auto;
float:right;
padding:0 20px;
margin-top:-20px}
.my__hash.__jsx-style-dynamic-selector{padding:20px 0 20px 80px;
margin:0;
background-size:14%;
color:gray;
background-repeat:no-repeat;
background-position:left center}
.navy.__jsx-style-dynamic-selector a.active.__jsx-style-dynamic-selector{color:#000;
border-bottom:3px solid #000}
@keyframes rotation {from {transform:rotate(0deg)}to {transform:rotate(359deg)}}
@media screen and (max-width:680px) {.navbar_main.__jsx-style-dynamic-selector{padding:10px}
.navy.__jsx-style-dynamic-selector{width:100%;
margin:20px 0}
.sing_in.__jsx-style-dynamic-selector, .create.__jsx-style-dynamic-selector{width:48%;
text-align:center}
input.__jsx-style-dynamic-selector{width:80%;
margin-left:10px}}`
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./components/footer.js


function Footer() {
    return(/*#__PURE__*/ _jsxs("div", {
        className: "jsx-13908a9e05512893" + " " + "footer_main",
        children: [
            /*#__PURE__*/ _jsx("h1", {
                className: "jsx-13908a9e05512893",
                /*#__PURE__*/ children: "This is footer"
            }),
            _jsx(_JSXStyle, {
                id: "13908a9e05512893",
                children: ".footer_main.jsx-13908a9e05512893{position:fixed;\nbottom:0;\nbackground-color:#ddd;\nwidth:100%;\nz-index:1}\nh1.jsx-13908a9e05512893{color:red;\ntext-align:center;\nfont-size:30px}"
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./components/layout.js



function Layout({ children  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Navbar, {}),
            children
        ]
    }));
};

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
;// CONCATENATED MODULE: ./store/index.js


function makeStore() {
    return (0,toolkit_.configureStore)({
        reducer: {
            counter: reduser/* default */.ZP
        }
    });
}
const store = makeStore();
/* harmony default export */ const store_0 = (store);

// EXTERNAL MODULE: external "@web3-react/core"
var core_ = __webpack_require__(8054);
;// CONCATENATED MODULE: ./pages/_app.js








function getLibrary(provider, connector) {
    return new (external_web3_default())(provider);
}
;
function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(core_.Web3ReactProvider, {
        getLibrary: getLibrary,
        children: /*#__PURE__*/ jsx_runtime_.jsx(metamask/* MetaMaskProvider */.Y8, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
                store: store_0,
                children: /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                        ...pageProps
                    })
                })
            })
        })
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 8054:
/***/ ((module) => {

module.exports = require("@web3-react/core");

/***/ }),

/***/ 6590:
/***/ ((module) => {

module.exports = require("@web3-react/injected-connector");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 8028:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9816:
/***/ ((module) => {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ 8519:
/***/ ((module) => {

module.exports = require("web3");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [675,676,664,989,100], () => (__webpack_exec__(3189)));
module.exports = __webpack_exports__;

})();