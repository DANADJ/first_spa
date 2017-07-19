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
		chatExtendedTitle: 'Щелкните, чтобы свернуть',
		chatRetractedTitle: 'Щелкните, чтобы раскрыть'
	},
	    stateMap = {
		$container: null,
		anchorMap: {},
		isChatRetracted: true
	},
	    jqueryMap = {};

	//----------------- НАЧАЛО СЛУЖЕБНЫХ МЕТОДОВ -------------------
	function copyAnchorMap() {
		return $.extend(true, {}, stateMap.anchor_map);
	}
	//------------------ КОНЕЦ СЛУЖЕБНЫХ МЕТОДОВ -------------------

	//-------------------- НАЧАЛО МЕТОДОВ DOM ----------------------

	function changeAnchorPart(argMap) {
		var anchorMapRevise = copyAnchorMap(),
		    boolReturn = true,
		    keyName = void 0,
		    keyNameDep = void 0;

		KEYVAL: for (keyName in argMap) {
			if (argMap.hasOwnProperty(keyName)) {
				// пропустить зависимые ключи
				if (keyName.indexOf('_') === 0) {
					continue KEYVAL;
				}

				// обновить значение независимого ключа
				anchorMapRevise[keyName] = argMap[keyName];

				// обновить соответствующий зависимый ключ
				keyNameDep = '_' + keyName;

				if (argMap[keyNameDep]) {
					anchorMapRevise[keyNameDep] = argMap[keyNameDep];
				} else {
					delete anchorMapRevise[keyNameDep];
					delete anchorMapRevise['_s' + keyNameDep];
				}
			}
		}
		// Конец объединения изменений в хэше якорей

		// Начало попытки обновления URI;
		// в случае ошибки восстановить исходное состояние
		try {
			$.uriAnchor.setAnchor(anchorMapRevise);
		} catch (error) {
			// восстановить исходное состояние в URI
			$.uriAnchor.setAnchor(stateMap.anchorMap, null, true);
			boolReturn = false;
		}
		// Конец попытки обновления URI...

		return boolReturn;
	}

	function onHashchange(event) {
		var anchorMapPrevious = copyAnchorMap(),
		    anchorMapProposed = null,
		    s_chatProposed = null;

		// пытаемся разобрать якорь
		try {
			anchorMapProposed = $.uriAnchor.makeAnchorMap();
		} catch (error) {
			$.uriAnchor.setAnchor(anchorMapPrevious, null, true);
			return false;
		}
		stateMap.anchorMap = anchorMapProposed;

		// Начало изменения компонента Chat
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

		// Конец изменения компонента Chat
		return false;
	}

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

	//--------------------- КОНЕЦ МЕТОДОВ DOM ----------------------

	//---------------- НАЧАЛО ОБРАБОТЧИКОВ СОБЫТИЙ -----------------
	function onClickChat() {
		changeAnchorPart({
			chat: stateMap.isChatRetracted ? 'open' : 'closed'
		});

		return false;
	}
	//----------------- КОНЕЦ ОБРАБОТЧИКОВ СОБЫТИЙ -----------------

	//------------------- НАЧАЛО ОТКРЫТЫХ МЕТОДОВ ------------------

	function initModule($container) {
		stateMap.$container = $container;
		$container.html(configMap.mainHtml);
		setJqueryMap();

		stateMap.isChatRetracted = true;
		jqueryMap.$chat.attr('title', configMap.chatRetractedTitle).click(onClickChat);

		$.uriAnchor.configModule({
			schema_map: configMap.anchorSchemaMap
		});

		$(window).bind('hashchange', onHashchange).trigger('hashchange');
	}
	//------------------- КОНЕЦ ОТКРЫТЫХ МЕТОДОВ -------------------

	var Shell = exports.Shell = {
		initModule: initModule
	};

/***/ })
/******/ ]);