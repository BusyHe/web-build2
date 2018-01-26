/**
 * Created by busyhe on 2018/1/26 下午11:15.
 * Email: 525118368@qq.com
 */

const Router = require('koa-router');
const router = new Router();
const mainController = require('../controllers/main');

router.post('/main', mainController);

module.exports = router;
