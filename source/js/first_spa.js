import {Shell} from './first_spa.shell.js';

const Ids = {
	containerId: '#first-spa',
};

const $elements = {
	$container: null,
};

function initModule($container) {
	Shell.initModule($container);
}

$(function () {
	$elements.$container = $(Ids.containerId);

	initModule($elements.$container);
});