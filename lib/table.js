var paddings = 2;
var indexName = '(index)';
var wcwidth = require('./wc');
var MAX_STR_LEN = 50;

function Table(obj) {
    this.longests = {};
    this.msg = [];
    this.table = obj;
    if (typeof obj === 'object') {
        var initCol = {};
        initCol[indexName] = true;
        this.getColumns(initCol);
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
    var columns = this.msg[0];
    var str = '\n';
    var lines = '';
    for (var i in this.msg) {
        var data = this.msg[i];
        lines = '';
        var row = '';
        for (var name in columns) {
            var value = data[name] === undefined ? '' : data[name];
            lines += this.getLine(name);
            row += this.getRow(name, value);
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
    data = data.toString();
    var diff = this.longests[index] - wcwidth(data);

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
            columns[''] = '';
        }
        this.msg[0] = columns;
        return;
    }
    for (var name in data) {
        if (columns.indexOf(name) === -1) {
            columns[name] = name;
            this.setLongest(name, name);
        }
    }
    this.msg[0] = columns;
};

Table.prototype.createRow = function (index, data) {
    var cols = {};
    var dataType = typeof data;
    // add index column
    cols[indexName] = index;
    this.setLongest(indexName, index);
    // add the rest of the value(s)
    if (typeof index === 'string') {
        index = '"' + index + '"';
    }
    cols[index] = index;
    this.setLongest(index, index);
    if (dataType !== 'object') {
        // this is an array
        switch (dataType) {
            case 'string':
                data = '"' + data + '"';
                break;
            case 'function':
                data = '[Function]';
                break;
        }
        this.setLongest('', data);
        cols[''] = data;
        return cols;
    }
    for (var name in data) {
        var value = data[name];
        switch (typeof value) {
            case 'string':
                value = '"' + value + '"';
                break;
            case 'object':
                value = JSON.stringify(value);
        }

        if (value.length > MAX_STR_LEN) {
            value = value.substring(0, MAX_STR_LEN - 3) + '...';
        }

        this.setLongest(name, value);
        cols[name] = value;
    }
    return cols;
};

Table.prototype.setLongest = function (index, str) {
    var len = wcwidth(str.toString());
    if (!this.longests[index] || len > this.longests[index]) {
        this.longests[index] = len;
    }
};

module.exports = Table;
