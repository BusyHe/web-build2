/**
 * Created by busyhe on 2018/1/26 下午7:51.
 * Email: 525118368@qq.com
 */
const commander = require('../common/commander'); // 命令行工具
const mode = commander.build ? 'build' : 'dev';

const config = {
    dev: {
        name: '开发模式',
        type: mode,
        port: commander.port || 8765,
        mongodb: {
            open: false,
            url: 'mongodb://localhost:27017/web_build_test'
        },
        server: {},
        redis_url: '',
        redis_port: ''
    },
    build: {
        name: '生产模式',
        type: mode,
        port: commander.port || 8765,
        mongodb: {
            open: false,
            url: 'mongodb://localhost:27017/web_build_test'
        },
        server: {},
        redis_url: '',
        redis_port: ''
    }
};

module.exports = config[mode];
