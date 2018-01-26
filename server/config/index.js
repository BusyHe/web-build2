/**
 * Created by busyhe on 2018/1/26 下午7:51.
 * Email: 525118368@qq.com
 */
const commander = require('../common/commander'); // 命令行工具

const config = {
    port: commander.port || 8765,
    mongodb_url: '',
    redis_url: '',
    redis_port: ''
};

module.exports = config;
