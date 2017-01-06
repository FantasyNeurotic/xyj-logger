'use strict';
const winston = require('winston');
const moment = require('moment');
const _ = require('lodash');
const util = require('util');
let config = require('winston/lib/winston/config');
let lv = {
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  verbose: 5,
}
let defaultOption = {
  consoleLevel: 5,
  fileLevel: 1
};

let colors = {
  error: 'red',
  debug: 'blue',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
};

let createLogger = function (file, level, option) {
  if (!option) {
    option = defaultOption;
  }
  let levels = {};
  levels[level] = 0;
  let l = null;
  let c = {
    transports: [],
    levels: levels,
    colors: colors,
    level: level
  }
  if (lv[level] <= (option.consoleLevel || 0)) {
    c.transports.push(new (winston.transports.Console)({
      formatter: function (options) {
        const time = moment().format('YYYY-MM-DD hh:mm:ss');
        const level = options.level;
        const message = options.message;
        return config.colorize(options.level, time + ' [' + file + '] ' + '(' + level + ')>' + message
        )
      },
      colorize: 'all'
    }));
  }
  if (lv[level] <= (option.fileLevel || 0)) {
    c.transports.push(new (winston.transports.File)({
      name: `${level}-file`,
      filename: option.path ? `${option.path + level}.log` : `logs/${level}.log`,
      level: `${level}`,
      json: false,
      maxsize: option.maxsize ? option.maxsize : 100000,
      maxFiles: option.maxFiles ? option.maxFiles : 20,
      formatter: function (options) {
        const time = moment().format('YYYY-MM-DD hh:mm:ss');
        const level = options.level;
        const message = options.message || '';
        return JSON.stringify({
          time: time,
          level: level,
          file: file,
          message: message,
        });
      }
    }));
  }
  l = new (winston.Logger)(c);
  return function () {
    let args = Array.prototype.slice.call(arguments);
    args.push('');
    return l[level].apply(null, args);
  }
};

function getLogger(file, state) {
  this.error = createLogger(file, 'error', state);
  this.warn = createLogger(file, 'warn', state);
  this.debug = createLogger(file, 'debug', state);
  this.info = createLogger(file, 'info', state);
  this.verbose = createLogger(file, 'verbose', state);
}


let Logger = function () {
  let that = this;
  this.status = defaultOption;
  this.config = function (s) {
    that.status = s;
  };
  this.Logger = function (file) {
    return new getLogger(file, that.status)
  }
}

let Xlog = new Logger();

module.exports = Xlog;
