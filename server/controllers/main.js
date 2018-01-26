/**
 * Created by busyhe on 2018/1/27 上午1:47.
 * Email: 525118368@qq.com
 */
const status = require('../common/status');

const main = async ctx => {
    ctx.body = status.success()
};

module.exports = main;
