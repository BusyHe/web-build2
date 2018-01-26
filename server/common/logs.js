/**
 * Created by busyhe on 2018/1/26 下午11:02.
 * Email: 525118368@qq.com
 */
const moment = require('moment');
const chalk = require('chalk');

exports.responseTime = async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', ms + 'ms');
};

exports.logger = async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(chalk.green(`[ ${moment().format('YYYY-MM-DD HH:mm:ss')} ] ${ctx.response.status} ${ctx.method} ${ctx.url} - ` + chalk.yellow(`${ms}ms`)));
    console.log(chalk.green(`res.body: `) + ctx.response.body)
};
