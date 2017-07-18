let Ids = {
		firstSpaShellChatId: '#first-spa-shell-chat',
	},
	configMap = {
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
		isChatRetracted: true
	},
	jqueryMap = {};


//----------------- НАЧАЛО СЛУЖЕБНЫХ МЕТОДОВ -------------------
//------------------ КОНЕЦ СЛУЖЕБНЫХ МЕТОДОВ -------------------

//-------------------- НАЧАЛО МЕТОДОВ DOM ----------------------
function setJqueryMap() {
	let $container = stateMap.$container;

	jqueryMap = {
		$container: $container,
		$chat: $container.find(Ids.firstSpaShellChatId),
	};
}

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
function onClickChat(event) {
	toggleChat(stateMap.isChatRetracted);
	return false;
};
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
}
//------------------- КОНЕЦ ОТКРЫТЫХ МЕТОДОВ -------------------

export const Shell = {
	initModule
};