/**
 * Created by busyhe on 2018/1/26 下午11:15.
 * Email: 525118368@qq.com
 */

const router = require('koa-router')();
const main = require('./main');

router.use('/main', main.routes(), main.allowedMethods());

module.exports = router;
