module.exports = function (spinalCaseValue) {
	'use strict';

	var strArray = spinalCaseValue.split('');
	var shouldCapitalize = false;
	return strArray.reduce(function (acc, cur) {
		if (cur === '-') {
			shouldCapitalize = true;
			return acc;
		} else if (shouldCapitalize) {
			shouldCapitalize = false;
			return acc.concat(cur.toUpperCase());
		} else {
			return acc.concat(cur);
		}
	});
};