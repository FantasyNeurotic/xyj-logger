# xyj-logger
##用法
####安装
`npm install xyj-logger`
####使用
```js
const Xlog = require('xyj-logger');
const logger = Xlog.Logger(__filename)
logger.error('这是一个错误');
logger.warn('这是一个警告');
logger.info('这是一个信息');
logger.debug('这是一个调试信息');
logger.verbose('这个一个不常用的信息');
```


##更多配置
```
let Xlog = require('xyj-logger');
let config = {
  consoleLevel: 4, // (<1)-无显示 1-error 2-error+warn 3-error+warn+info  4-error+warn+info+debug (>5)-error+warn+info+debug+verbose
  fileLevel: 1, // (<1)-无显示 1-error 2-error+warn 3-error+warn+info  4-error+warn+info+debug (>5)-error+warn+info+debug+verbose
  maxsize: 100000, //日志文件最大大小
  maxFiles: 20, //日志文件最大个数
  path: 'logs/' //请确保目录存在
}//以上为默认值,请按需求更改,缺省就为默认配置
Xlog.config(config);
let logger = Xlog.Logger(__filename);
logger.error('这是一个错误');
logger.warn('这是一个警告');
logger.info('这是一个信息');
logger.debug('这是一个调试信息);
logger.verbose('这个一个不常用的信息');

```

