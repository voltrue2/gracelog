var paddings = 2;

function Table(obj) {
	this.longests = [];
	this.msg = [];
	this.table = obj;
	if (typeof obj === 'object') {
		this.getColumns({ '(index)': true });
		for (var index in obj) {
			this.getColumns(obj[index]);
			this.msg.push(this.createRow(index, obj[index]));
		}
		// replace the value of this.table
		this.draw();
	}
}

Table.prototype.get = function () {
	return this.table;
};

Table.prototype.draw = function () {
	var columnLen = this.msg[0].length;
	var str = '\n';
	var lines = '';
	for (var i in this.msg) {
		var data = this.msg[i];
		lines = '';
		var row = '';
		var keys = Object.keys(data);
		for (var index = 0; index < columnLen; index++) {
			var key = keys[index];
			if (!key) {
				lines += this.getLine(index);
				row += this.getRow(index, '');
				continue;
			}
			lines += this.getLine(key);
			row += this.getRow(key, data[key]);
			
		}
		str += '+' + lines + '\n' + row + '|\n';
	}
	
	// very bottom line
	str += '+' + lines;
	
	this.table = str + '\n';
};

Table.prototype.getLine = function (index) {
	var line = '';
	for (var i = 0, len = this.longests[index] + paddings; i < len; i++) {
		line += '-';
	}
	return line + '+';
};

Table.prototype.getRow = function (index, data) {
	index = parseInt(index, 10);
	data = data.toString();
	var diff = this.longests[index] - data.length;

	if (diff) {
		for (var i = 0; i < diff; i++) {
			data += ' ';
		}
	}

	return '| ' + data + ' ';
};

Table.prototype.getColumns = function (data) {
	// assume the first element in msg is the row for columns
	var columns = this.msg[0] || [];
	if (typeof data !== 'object') {
		if (columns.indexOf('') === -1) {
			columns.push('');
		}
		this.msg[0] = columns;
		return;
	}
	for (var name in data) {
		if (columns.indexOf(name) === -1) {
			columns.push(name);
			this.setLongest(columns.length - 1, name);
		}
	}
	this.msg[0] = columns;	
};

Table.prototype.createRow = function (index, data) {
	var cols = [];
	var i = 0;
	var dataType = typeof data;
	if (typeof index === 'string') {
		index = '"' + index + '"';
	}
	cols.push(index);
	this.setLongest(i, index);
	i += 1;
	if (dataType !== 'object') {
		switch (dataType) {
			case 'string':
				data = '"' + data + '"';
				break;
			case 'function':
				data = '[Function]';
				break;
		}
		this.setLongest(i, data);
		cols.push(data);
		return cols;
	}
	for (var name in data) {
		var value = data[name];
		switch (typeof value) {
			case 'string':
				value = '"' + value + '"';
				break;
		}
		this.setLongest(i, value);
		cols.push(value);
		i += 1;
	}
	return cols;
};

Table.prototype.setLongest = function (index, str) {
	var len = str.toString().length;
	if (!this.longests[index] || len > this.longests[index]) {
		this.longests[index] = len;
	}
};

module.exports = Table;
