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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Shell = undefined;

	var _first_spa = __webpack_require__(2);

	var _first_spa2 = __webpack_require__(3);

	var _first_spa3 = __webpack_require__(4);

	var Ids = {
		firstSpaShellChatId: '#first-spa-shell-chat'
	}; /**
	    * @module FirstSpaShell
	    * @author Valentin Gordienko <valentingordienkospb@gmail.com>
	    */

	/**
	 *
	 */


	var configMap = {
		anchorSchemaMap: {
			chat: {
				open: true,
				closed: true
			}
		},
		mainHtml: '<div class="first-spa-shell-head">\n\t\t\t\t\t\t<div class="first-spa-shell-head-logo"></div>\n\t\t\t\t\t\t<div class="first-spa-shell-head-acct"></div>\n\t\t\t\t\t\t<div class="first-spa-shell-head-search"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="first-spa-shell-main">\n\t\t\t\t\t\t<div class="first-spa-shell-main-nav"></div>\n\t\t\t\t\t\t<div class="first-spa-shell-main-content"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="first-spa-shell-foot"></div>\n\t\t\t\t\t<div class="first-spa-shell-chat" id="' + Ids.firstSpaShellChatId.substr(1) + '"></div>\n\t\t\t\t\t<div class="first-spa-shell-modal"></div>',
		chatExtendTime: 1000,
		chatRetractTime: 300,
		chatExtendHeight: 450,
		chatRetractHeight: 15,
		chatExtendedTitle: 'Click to close',
		chatRetractedTitle: 'Click to open'
	},
	    stateMap = {
		$container: null,
		anchorMap: {},
		isChatRetracted: true
	},
	    jqueryMap = {};

	/**
	 * Start of utility
	 */
	function copyAnchorMap() {
		return $.extend(true, {}, stateMap.anchor_map);
	}

	/**
	 * Start of DOM functions
	 */

	/**
	 * @description - The function changes URL hash
	 * @function changeAnchorPart
	 */
	function changeAnchorPart(argMap) {
		var anchorMapRevise = copyAnchorMap(),
		    boolReturn = true,
		    keyName = void 0,
		    keyNameDep = void 0;

		KEYVAL: for (keyName in argMap) {
			if (argMap.hasOwnProperty(keyName)) {
				if (keyName.indexOf('_') === 0) {
					continue KEYVAL;
				}

				anchorMapRevise[keyName] = argMap[keyName];

				keyNameDep = '_' + keyName;

				if (argMap[keyNameDep]) {
					anchorMapRevise[keyNameDep] = argMap[keyNameDep];
				} else {
					delete anchorMapRevise[keyNameDep];
					delete anchorMapRevise['_s' + keyNameDep];
				}
			}
		}

		try {
			$.uriAnchor.setAnchor(anchorMapRevise);
		} catch (error) {
			$.uriAnchor.setAnchor(stateMap.anchorMap, null, true);
			boolReturn = false;
		}

		return boolReturn;
	}

	/**
	 * @description - The callback is called when URL hash is changed
	 * @callback onHashchange
	 */
	function onHashchange() {
		var anchorMapPrevious = copyAnchorMap(),
		    anchorMapProposed = null,
		    s_chatProposed = null;

		try {
			anchorMapProposed = $.uriAnchor.makeAnchorMap();
		} catch (error) {
			$.uriAnchor.setAnchor(anchorMapPrevious, null, true);
			return false;
		}
		stateMap.anchorMap = anchorMapProposed;

		if (!anchorMapPrevious || anchorMapPrevious._s_chat !== anchorMapProposed._s_chat) {
			s_chatProposed = anchorMapProposed.chat;

			switch (s_chatProposed) {
				case 'open':
					toggleChat(true);
					break;
				case 'closed':
					toggleChat(false);
					break;
				default:
					toggleChat(false);
					delete anchorMapProposed.chat;
					$.uriAnchor.setAnchor(anchorMapProposed, null, true);
			}
		}

		return false;
	}

	/**
	 * @description - The function finds jQuery objects and saves them in jqueryMap object
	 * @function setJqueryMap
	 */
	function setJqueryMap() {
		var $container = stateMap.$container;

		jqueryMap = {
			$container: $container,
			$chat: $container.find(Ids.firstSpaShellChatId)
		};
	}

	/**
	 * @description - The function opens or closes the chat window
	 * @function toggleChat
	 * @param {boolean} doExtend - Parametr specifies to open or close the chat window
	 * @param {function} [callback] - Function called when the chat window is open or closed
	 * @returns {boolean} If the chat window is sliding - false, If the chat window is open or closed - true
	 */
	function toggleChat(doExtend, callback) {
		var chatHeight = jqueryMap.$chat.height(),
		    chatOpen = chatHeight === configMap.chatExtendHeight,
		    chatClosed = chatHeight === configMap.chatRetractHeight,
		    chatSliding = !chatOpen && !chatClosed;

		if (chatSliding) return false;

		if (doExtend) {
			jqueryMap.$chat.animate({ height: configMap.chatExtendHeight }, configMap.chatExtendTime, function () {
				jqueryMap.$chat.attr('title', configMap.chatExtendedTitle);
				stateMap.isChatRetracted = false;
				if (callback) callback(jqueryMap.$chat);
			});
			return true;
		}

		jqueryMap.$chat.animate({ height: configMap.chatRetractHeight }, configMap.chatRetractTime, function () {
			jqueryMap.$chat.attr('title', configMap.chatRetractedTitle);
			stateMap.isChatRetracted = true;
			if (callback) callback(jqueryMap.$chat);
		});
		return true;
	}

	/**
	 * Start of handlers functions
	 */

	/**
	 * @description - The callback updates URL when the chat window opens or closes
	 * @callback onClickChatCb
	 */
	function onClickChatCb() {
		changeAnchorPart({
			chat: stateMap.isChatRetracted ? 'open' : 'closed'
		});

		return false;
	}

	/**
	 * Public API functions
	 */
	function initModule($container) {

		stateMap.$container = $container;
		$container.html(configMap.mainHtml);
		setJqueryMap();

		stateMap.isChatRetracted = true;
		jqueryMap.$chat.attr('title', configMap.chatRetractedTitle).click(onClickChatCb);

		$.uriAnchor.configModule({
			schema_map: configMap.anchorSchemaMap
		});

		_first_spa3.FirstSpaChat.configModule({});
		_first_spa3.FirstSpaChat.initModule(jqueryMap.$chat);

		$(window).bind('hashchange', onHashchange).trigger('hashchange');
	}

	/**
	 * Exported object
	 */
	var Shell = exports.Shell = {
		initModule: initModule
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @module FirstSpaUtil
	 * @author Valentin Gordienko <valentingordienkospb@gmail.com>
	 */

	/**
	 *
	 */
	function makeError(nameText, msgText, data) {
		var error = new Error();
		error.name = nameText;
		error.message = msgText;
		if (data) error.data = data;

		return error;
	}

	/**
	 *
	 *
	 * @param {object} argMap - Settings object
	 * @param {object} argMap.inputMap -
	 * @param {object} argMap.settableMap -
	 * @param {object} argMap.configMap -
	 */
	function setConfigMap(argMap) {
		var inputMap = argMap.inputMap,
		    settableMap = argMap.settableMap,
		    configMap = argMap.configMap;
		for (var keyName in inputMap) {
			if (inputMap.hasOwnProperty(keyName)) {
				if (settableMap.hasOwnProperty(keyName)) {
					configMap[keyName] = inputMap[keyName];
				} else {
					throw makeError('Bad Input', 'Setting config key |' + keyName + '| is not supported');
				}
			}
		}
	}

	/**
	 * Exported object
	 */
	var FirstSpaUtil = exports.FirstSpaUtil = {
		makeError: makeError,
		setConfigMap: setConfigMap
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module FirstSpaModel
	 * @author Valentin Gordienko <valentingordienkospb@gmail.com>
	 */

	/**
	 * Exported object
	 */
	var FirstSpaModel = exports.FirstSpaModel = {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FirstSpaChat = undefined;

	var _first_spa = __webpack_require__(2);

	var Ids = {}; /**
	               * @module FirstSpaChat
	               * @author Valentin Gordienko <valentingordienkospb@gmail.com>
	               */

	/**
	 *
	 */


	var ConfigMap = {
		settableMap: {}
	};

	var StateMap = {
		$container: null
	};

	var JQueryMap = {};

	var Markup = {
		mainMarkup: '<div style="padding:1em; color:#fff;">Say hello to chat</div>'
	};

	/**
	 * Start DOM functions
	 */

	/**
	 *
	 */
	function setJqueryMap() {
		var $container = StateMap.$container;
		JQueryMap.$container = $container;
	}

	/**
	 *
	 */
	function configModule(inputMap) {
		_first_spa.FirstSpaUtil.setConfigMap({
			inputMap: inputMap,
			settableMap: ConfigMap.settableMap,
			configMap: ConfigMap
		});
		return true;
	}

	/**
	 *
	 */
	function initModule($container) {
		$container.html(Markup.mainMarkup);
		StateMap.$container = $container;
		setJqueryMap();
		return true;
	}

	/**
	 * Exported object
	 */
	var FirstSpaChat = exports.FirstSpaChat = {
		configModule: configModule,
		initModule: initModule
	};

/***/ })
/******/ ]);