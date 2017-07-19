let Ids = {
		firstSpaShellChatId: '#first-spa-shell-chat',
	},
	configMap = {
		anchorSchemaMap: {
			chat: {
				open: true,
				closed: true
			}
		},
		mainHtml: `<div class="first-spa-shell-head">
						<div class="first-spa-shell-head-logo"></div>
						<div class="first-spa-shell-head-acct"></div>
						<div class="first-spa-shell-head-search"></div>
					</div>
					<div class="first-spa-shell-main">
						<div class="first-spa-shell-main-nav"></div>
						<div class="first-spa-shell-main-content"></div>
					</div>
					<div class="first-spa-shell-foot"></div>
					<div class="first-spa-shell-chat" id="${Ids.firstSpaShellChatId.substr(1)}"></div>
					<div class="first-spa-shell-modal"></div>`,
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
		isChatRetracted: true,
	},
	jqueryMap = {};


//----------------- НАЧАЛО СЛУЖЕБНЫХ МЕТОДОВ -------------------
function copyAnchorMap() {
	return $.extend(true, {}, stateMap.anchor_map);
}
//------------------ КОНЕЦ СЛУЖЕБНЫХ МЕТОДОВ -------------------

//-------------------- НАЧАЛО МЕТОДОВ DOM ----------------------

function changeAnchorPart(argMap) {
	let anchorMapRevise = copyAnchorMap(),
		boolReturn = true,
		keyName,
		keyNameDep;

	KEYVAL:
		for (keyName in argMap) {
			if (argMap.hasOwnProperty(keyName)) {// пропустить зависимые ключи
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
	let anchorMapPrevious = copyAnchorMap(),
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
			case 'open' :
				toggleChat(true);
				break;
			case 'closed' :
				toggleChat(false);
				break;
			default :
				toggleChat(false);
				delete anchorMapProposed.chat;
				$.uriAnchor.setAnchor(anchorMapProposed, null, true);
		}
	}

	// Конец изменения компонента Chat
	return false;
}


function setJqueryMap() {
	let $container = stateMap.$container;

	jqueryMap = {
		$container: $container,
		$chat: $container.find(Ids.firstSpaShellChatId),
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
	let chatHeight = jqueryMap.$chat.height(),
		chatOpen = chatHeight === configMap.chatExtendHeight,
		chatClosed = chatHeight === configMap.chatRetractHeight,
		chatSliding = !chatOpen && !chatClosed;

	if (chatSliding) return false;

	if (doExtend) {
		jqueryMap.$chat.animate(
			{height: configMap.chatExtendHeight},
			configMap.chatExtendTime,
			() => {
				jqueryMap.$chat.attr('title', configMap.chatExtendedTitle);
				stateMap.isChatRetracted = false;
				if (callback) callback(jqueryMap.$chat)
			}
		);
		return true;
	}

	jqueryMap.$chat.animate(
		{height: configMap.chatRetractHeight},
		configMap.chatRetractTime,
		() => {
			jqueryMap.$chat.attr('title', configMap.chatRetractedTitle);
			stateMap.isChatRetracted = true;
			if (callback) callback(jqueryMap.$chat);
		}
	);
	return true;
}

//--------------------- КОНЕЦ МЕТОДОВ DOM ----------------------

//---------------- НАЧАЛО ОБРАБОТЧИКОВ СОБЫТИЙ -----------------
function onClickChat() {
	changeAnchorPart({
		chat: ( stateMap.isChatRetracted ? 'open' : 'closed' )
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
	jqueryMap.$chat
		.attr('title', configMap.chatRetractedTitle)
		.click(onClickChat);

	$.uriAnchor.configModule({
		schema_map: configMap.anchorSchemaMap
	});

	$(window).bind('hashchange', onHashchange).trigger('hashchange');
}
//------------------- КОНЕЦ ОТКРЫТЫХ МЕТОДОВ -------------------

export const Shell = {
	initModule
};