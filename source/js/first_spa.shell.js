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
		chat_extend_time : 1000,
		chat_retract_time : 300, 
		hat_extend_height : 450,
		chat_retract_height : 15
	},
	stateMap = {
		$container: null
	},
	jqueryMap = {};


//----------------- НАЧАЛО СЛУЖЕБНЫХ МЕТОДОВ -------------------
//------------------ КОНЕЦ СЛУЖЕБНЫХ МЕТОДОВ -------------------

//-------------------- НАЧАЛО МЕТОДОВ DOM ----------------------
function setJqueryMap() {
	let $container = stateMap.$container;

	jqueryMap = {
		$container: $container,
		$chat : $container.find(Ids.firstSpaShellChatId),
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

export const Shell = {
	initModule
};