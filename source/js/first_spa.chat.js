/**
 * @module FirstSpaChat
 * @author Valentin Gordienko <valentingordienkospb@gmail.com>
 */

/**
 *
 */
import {FirstSpaUtil} from './first_spa.util';

const Ids = {};

const ConfigMap = {
	settableMap: {}
};

const StateMap = {
	$container: null
};

const JQueryMap = {};

const Markup = {
	mainMarkup : `<div style="padding:1em; color:#fff;">Say hello to chat</div>`
};

/**
 * Start DOM functions
 */

/**
 *
 */
function setJqueryMap() {
	let $container = StateMap.$container;
	JQueryMap.$container = $container;
}

/**
 *
 */
function configModule(inputMap) {
	FirstSpaUtil.setConfigMap({
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
export const FirstSpaChat = {
	configModule,
	initModule
};