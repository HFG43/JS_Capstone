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

/***/ "./src/dynamic.js":
/*!************************!*\
  !*** ./src/dynamic.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   searchForm: () => (/* binding */ searchForm),\n/* harmony export */   searchFormInput: () => (/* binding */ searchFormInput),\n/* harmony export */   showsContainer: () => (/* binding */ showsContainer)\n/* harmony export */ });\nconst showsContainer = document.querySelector('.main_content_container');\r\nconst searchForm = document.querySelector('form');\r\nconst searchFormInput = document.getElementById('search_text');\r\n\r\n\r\n\n\n//# sourceURL=webpack://js_capstone/./src/dynamic.js?");

/***/ }),

/***/ "./src/getTvShow.js":
/*!**************************!*\
  !*** ./src/getTvShow.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dynamic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dynamic.js */ \"./src/dynamic.js\");\n/* harmony import */ var _shows_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shows.js */ \"./src/shows.js\");\n\n\n\nconst setNewShow = (programList) => {\n  let tvShows = [];\n  programList.forEach((program) => {\n    const {\n      id, image, genres, type, runtime, language,\n    } = program.show;\n    const title = program.show.name;\n    const like = false;\n    const newShow = new _shows_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](id, image, title, like, genres, type, runtime, language);\n    if (image) {\n      tvShows = [...tvShows, newShow];\n    }\n  });\n  return tvShows;\n};\n\nconst getTVShows = async (search) => {\n  if (search === undefined) {\n    search = 'action';\n  }\n  const resultPrograms = await fetch(\n    `https://api.tvmaze.com/search/shows?q=${search}`,\n  );\n  const programList = await resultPrograms.json();\n  const newProgramList = setNewShow(programList);\n  if (newProgramList.length <= 0) {\n    _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchFormInput.placeholder = 'Please try with another TV Show or Genre';\n    _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchFormInput.classList.add('error_input_show');\n  }\n  return newProgramList;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTVShows);\n\n\n//# sourceURL=webpack://js_capstone/./src/getTvShow.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dynamic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dynamic.js */ \"./src/dynamic.js\");\n/* harmony import */ var _images_Empty_Like_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/Empty_Like.svg */ \"./src/images/Empty_Like.svg\");\n/* harmony import */ var _popUp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popUp.js */ \"./src/popUp.js\");\n/* harmony import */ var _getTvShow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTvShow.js */ \"./src/getTvShow.js\");\n\n\n\n\n\nconst displayShows = async (search) => {\n  _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.showsContainer.innerHTML = '';\n  _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchFormInput.placeholder = 'Search for your favorite TV show or Genre';\n  _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchFormInput.classList.remove('error_input_show');\n  const tvShows = await (0,_getTvShow_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(search);\n  tvShows.forEach((show) => {\n    const showCard = document.createElement('div');\n    showCard.classList.add('show_container');\n\n    const showImage = document.createElement('img');\n    showImage.classList.add('show_image');\n    if (show.image) {\n      showImage.src = show.image.original;\n    } else {\n      showImage.src = '#';\n    }\n    showCard.appendChild(showImage);\n\n    const titleLikeContainer = document.createElement('div');\n    titleLikeContainer.classList.add('title_like_container');\n\n    const showTitle = document.createElement('h2');\n    showTitle.classList.add('card_title');\n    showTitle.innerText = show.title;\n    titleLikeContainer.appendChild(showTitle);\n\n    const likesIcon = document.createElement('img');\n    likesIcon.src = _images_Empty_Like_svg__WEBPACK_IMPORTED_MODULE_1__;\n    likesIcon.alt = 'like_icon';\n    likesIcon.classList.add('like_icon');\n    titleLikeContainer.appendChild(likesIcon);\n    showCard.appendChild(titleLikeContainer);\n\n    const commentButton = document.createElement('button');\n    commentButton.type = 'button';\n    commentButton.innerText = 'Comments';\n    commentButton.id = show.id;\n    commentButton.classList.add('comment_button');\n    commentButton.addEventListener('click', async () => {\n      await (0,_popUp_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(show);\n    });\n    showCard.appendChild(commentButton);\n    _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.showsContainer.appendChild(showCard);\n  });\n};\n\n_dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchForm.addEventListener('submit', async (event) => {\n  event.preventDefault();\n  const search = _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchFormInput.value;\n  _dynamic_js__WEBPACK_IMPORTED_MODULE_0__.searchForm.reset();\n  displayShows(search);\n});\n\n\n//# sourceURL=webpack://js_capstone/./src/index.js?");

/***/ }),

/***/ "./src/popUp.js":
/*!**********************!*\
  !*** ./src/popUp.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _getTvShow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getTvShow.js */ \"./src/getTvShow.js\");\n\n\n// Pop up function\nconst popUp = async (show) => {\n  show.comments = await ((0,_getTvShow_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(show.id));\n  const popUpContainer = document.createElement('article');\n  popUpContainer.id = 'pop-up';\n  popUpContainer.innerHTML = `\n    <div class=\"pop-container\">\n       <div class=\"pop-up-header\">\n        <h2 class=\"movie-title\">${show.title}</h2>\n        <button id=\"close-modal-btn\">x</button>\n       </div>\n      <div class=\"pop-up-body\">\n        <div class=\"image-container\">\n         <img src='${show.image.original}' class=\"movie-image\">\n        </div>\n         <div class=\"pop-up-content\">\n          <div class=\"left-content\">\n            <label>Genre:</label>\n             <div class=\"movie-data\">${show.genres[0]}</div>\n             <label>RunTime:</label>\n            <div class=\"movie-data\">${show.runtime}</div>\n           </div>\n           <div class=\"right-content\">\n             <label>Show Type:</label>\n             <div class=\"movie-data\">${show.type}</div>\n             <label>Language:</label>\n             <div class=\"movie-data\">${show.language}</div>\n           </div>\n         </div>\n       </div>\n     </div>\n   `;\n  document.body.append(popUpContainer);\n  const closeBtn = document.getElementById('close-modal-btn');\n  closeBtn.addEventListener('click', () => {\n    popUpContainer.remove();\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (popUp);\n\n\n//# sourceURL=webpack://js_capstone/./src/popUp.js?");

/***/ }),

/***/ "./src/shows.js":
/*!**********************!*\
  !*** ./src/shows.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Shows)\n/* harmony export */ });\nclass Shows {\n  constructor(id, image, title, like, genres, type, runtime, language) {\n    this.id = id;\n    this.image = image;\n    this.title = title;\n    this.like = like;\n    this.genres = genres;\n    this.type = type;\n    this.runtime = runtime;\n    this.language = language;\n  }\n}\n\n\n//# sourceURL=webpack://js_capstone/./src/shows.js?");

/***/ }),

/***/ "./src/images/Empty_Like.svg":
/*!***********************************!*\
  !*** ./src/images/Empty_Like.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"520bb23cc491d2298efb.svg\";\n\n//# sourceURL=webpack://js_capstone/./src/images/Empty_Like.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;