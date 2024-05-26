/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\nclass CountClient {\n    constructor(url, port) {\n        this.connectedUrl = url + ':' + port.toString();\n        this.ws = new WebSocket(this.connectedUrl);\n        this.ws.onopen = (event) => this.openHandler(event);\n        this.ws.onmessage = (event) => this.messageHandler(event);\n        this.count = 0;\n    }\n    openHandler(event) {\n        console.log(`[Client Connected] url: ${this.connectedUrl}`);\n        let elementArray = [];\n        const disconnectedHint = document.getElementById('disconnected-hint');\n        elementArray.push(disconnectedHint);\n        this.addElementsClass(elementArray, 'hide');\n    }\n    messageHandler(event) {\n        const message = JSON.parse(event.data.toString());\n        const method = message['method'];\n        switch (method) {\n            case 'getToken':\n                this.sid = message['sid'];\n                console.log(`[Receive Token] sid: ${this.sid}`);\n                const sidLabel = document.getElementById('sid');\n                this.updateElementValue(sidLabel, `SID: ${this.sid}`);\n                let elementArray = [];\n                const headSection = document.getElementById('head-sec');\n                elementArray.push(headSection);\n                const contentSection = document.getElementById('content-sec');\n                elementArray.push(contentSection);\n                this.removeElementsClass(elementArray, 'hide');\n                break;\n            case 'plus':\n                if (message['status']) {\n                    this.count += 1;\n                    console.log(`[Plus Count] count: ${this.count}`);\n                    const countHint = document.getElementById('count-hint');\n                    this.updateElementValue(countHint, `COUNT = ${this.count}`);\n                }\n                break;\n            default:\n                console.log(`[Method Undefined] method: ${method}`);\n                break;\n        }\n    }\n    addElementsClass(elementArray, className) {\n        elementArray.forEach((element) => {\n            if (element) {\n                element.classList.add(className);\n            }\n        });\n    }\n    removeElementsClass(elementArray, className) {\n        elementArray.forEach((element) => {\n            if (element) {\n                element.classList.remove(className);\n            }\n        });\n    }\n    updateElementValue(element, value) {\n        if (element) {\n            element.innerHTML = value;\n        }\n    }\n    countPlus() {\n        const request = {\n            action: 'plus',\n        };\n        this.ws.send(JSON.stringify(request));\n    }\n}\ndocument.addEventListener('DOMContentLoaded', (e) => {\n    const client = new CountClient('ws://localhost', 5050);\n    const countBtn = document.getElementById('pop-btn');\n    if (countBtn) {\n        countBtn.onclick = () => client.countPlus();\n    }\n});\n\n\n//# sourceURL=webpack://websocket-client/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;