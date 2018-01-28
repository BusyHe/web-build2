/**
 * Created by busyhe on 2018/1/28 下午6:13.
 * Email: 525118368@qq.com
 */
const router = require('koa-router')();
const status = require('../../common/status');

router.post('/', async (ctx) => {
    ctx.body = status.success()
});

module.exports = router;
