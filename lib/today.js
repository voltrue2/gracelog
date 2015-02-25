var ROTATION_TYPES = {
	YEAR: 'year',
	MONTH: 'month',
	DAY: 'day',
	HOUR: 'hour'
};

var types = {
	year: getYearType,
	month: getMonthType,
	day: getDayType,
	hour: getHourType
};

var rotationType;
var useTimestamp;

module.exports.setup = function (type, usets) {
	rotationType = type || ROTATION_TYPES.DAY;
	useTimestamp = usets || false;
};

module.exports.get = function (time) {
	return getToday(time);
};

function getToday(time) {
	var d = new Date(time);
	var get = types[rotationType] || types.day;
	return get(d);
}

function getYearType(date) {

	if (useTimestamp) {
		return new Date(date.getFullYear() + '-01-01 00:00:00').getTime();
	}

	return date.getFullYear();
}

function getMonthType(date) {

	if (useTimestamp) {
		return new Date(date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-01 00:00:00').getTime();
	}

	return getYearType(date) + '.' + pad(date.getMonth() + 1);
}

function getDayType(date) {

	if (useTimestamp) {
		return new Date(date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDay()) + ' 00:00:00').getTime();
	}

	return getMonthType(date) + '.' + pad(date.getDate());
}

function getHourType(date) {

	if (useTimestamp) {
		return new Date(date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDay()) + ' ' + pad(date.getHours()) + ':00:00').getTime();
	}

	return getDayType(date) + '.' + pad(date.getHours());
}

function pad(n) {
	if (n < 10) {
		return '0' + n;
	}
	return n;
}
