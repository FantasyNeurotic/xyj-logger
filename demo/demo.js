'use strict';
let L = require('../');

// let config = {
//   consoleLevel: 4, // (<1)-无显示 1-error 2-error+warn 3-error+warn+info  4-error+warn+info+debug (>5)-error+warn+info+debug+verbose
//   fileLevel: 1, // (<1)-无显示 1-error 2-error+warn 3-error+warn+info  4-error+warn+info+debug (>5)-error+warn+info+debug+verbose
//   maxsize: 100000, //日志文件最大大小
//   maxFiles: 20, //日志文件最大个数
//   path: 'logs/' //请确保目录存在
// }//以上为默认值,请按需求更改,缺省就为默认配置
//
//  L.config(config)
let logger =  L.Logger(__filename)

logger.error('xxxx', 'xxx', new Error('xxxxxx'));
logger.warn('xxxx');
logger.info('xxxx');
logger.verbose('xxxx');
logger.debug('xxxx');