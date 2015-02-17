module.exports = function (time, useTimestamp) {
	var d = new Date(time);
	if (useTimestamp) {
		return new Date(d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' 00:00:00').getTime(); 
	}
	return d.getFullYear() + '.' + pad(d.getMonth() + 1) + '.' + pad(d.getDate());
};

function pad(n) {
	if (n < 10) {
		return '0' + n;
	}
	return n;
}
