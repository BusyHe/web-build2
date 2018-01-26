/**
 * Created by busyhe on 2017/11/18 下午3:15.
 * Email: 525118368@qq.com
 * 命令行工具
 */
const program = require('commander');
const Package = require('../../package');

program
    .version(Package.version)
    .option('-p, --port <n>', '端口号')
    .option('-b, --build', '生产模式')
    .parse(process.argv);

module.exports = program;
