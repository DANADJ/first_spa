/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _first_spaShell = __webpack_require__(1);

	var Ids = {
		containerId: '#first-spa'
	};

	var $elements = {
		$container: null
	};

	function initModule($container) {
		_first_spaShell.Shell.initModule($container);
	}

	$(function () {
		$elements.$container = $(Ids.containerId);

		initModule($elements.$container);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Ids = {
		firstSpaShellChatId: '#first-spa-shell-chat'
	},
	    configMap = {
		mainHtml: '<div class="first-spa-shell-head">\n\t\t\t\t\t\t<div class="first-spa-shell-head-logo"></div>\n\t\t\t\t\t\t<div class="first-spa-shell-head-acct"></div>\n\t\t\t\t\t\t<div class="first-spa-shell-head-search"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="first-spa-shell-main">\n\t\t\t\t\t\t<div class="first-spa-shell-main-nav"></div>\n\t\t\t\t\t\t<div class="first-spa-shell-main-content"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="first-spa-shell-foot"></div>\n\t\t\t\t\t<div class="first-spa-shell-chat" id="' + Ids.firstSpaShellChatId.substr(1) + '"></div>\n\t\t\t\t\t<div class="first-spa-shell-modal"></div>',
		chat_extend_time: 1000,
		chat_retract_time: 300,
		hat_extend_height: 450,
		chat_retract_height: 15
	},
	    stateMap = {
		$container: null
	},
	    jqueryMap = {};

	//----------------- НАЧАЛО СЛУЖЕБНЫХ МЕТОДОВ -------------------
	//------------------ КОНЕЦ СЛУЖЕБНЫХ МЕТОДОВ -------------------

	//-------------------- НАЧАЛО МЕТОДОВ DOM ----------------------
	function setJqueryMap() {
		var $container = stateMap.$container;

		jqueryMap = {
			$container: $container,
			$chat: $container.find(Ids.firstSpaShellChatId)
		};
	}

	//--------------------- КОНЕЦ МЕТОДОВ DOM ----------------------

	//---------------- НАЧАЛО ОБРАБОТЧИКОВ СОБЫТИЙ -----------------
	//----------------- КОНЕЦ ОБРАБОТЧИКОВ СОБЫТИЙ -----------------

	//------------------- НАЧАЛО ОТКРЫТЫХ МЕТОДОВ ------------------

	function initModule($container) {
		stateMap.$container = $container;
		$container.html(configMap.mainHtml);
		setJqueryMap();
	}
	//------------------- КОНЕЦ ОТКРЫТЫХ МЕТОДОВ -------------------

	var Shell = exports.Shell = {
		initModule: initModule
	};

/***/ })
/******/ ]);