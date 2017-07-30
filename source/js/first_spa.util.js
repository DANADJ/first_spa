/**
 * @module FirstSpaUtil
 * @author Valentin Gordienko <valentingordienkospb@gmail.com>
 */

/**
 *
 */
function makeError(nameText, msgText, data) {
	let error = new Error();
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
	let inputMap = argMap.inputMap,
		settableMap = argMap.settableMap,
		configMap = argMap.configMap;
	for (let keyName in inputMap) {
		if (inputMap.hasOwnProperty(keyName)) {
			if (settableMap.hasOwnProperty(keyName)) {
				configMap[keyName] = inputMap[keyName];
			}
			else {
				throw makeError(
					'Bad Input',
					`Setting config key |${keyName}| is not supported`
				);
			}
		}
	}
}

/**
 * Exported object
 */
export const FirstSpaUtil = {
	makeError,
	setConfigMap,
};