/**
 * Created by busyhe on 2018/1/26 下午11:15.
 * Email: 525118368@qq.com
 */

const Router = require('koa-router');
const router = new Router();

router.post('/main', (ctx) => {
    ctx.body = {
        status: 0
    }
});

module.exports = router;
