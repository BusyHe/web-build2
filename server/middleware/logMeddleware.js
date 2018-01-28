/**
 * Created by busyhe on 2018/1/27 上午12:59.
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
    if (ctx.url.indexOf('api') >= 0) {
        console.log(chalk.green(`  req.body: `), ctx.request.body);
        console.log(chalk.green(`  res.body: `), ctx.response.body)
    }
};
