/**
 * Created by busyhe on 2018/1/26 下午7:06.
 * Email: 525118368@qq.com
 */
const Koa = require('koa');
const Router = require('koa-router');
const chalk = require('chalk'); // 控制台输出颜色自定义工具
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const compose = require('koa-compose');
const path = require('path');
const indexRouter = require('./server/router');
const config = require('./server/config');
const logMeddleware = require('./server/middleware/logMeddleware');
const errMiddleware = require('./server/middleware/errMiddleware');
const app = new Koa();
const router = new Router();
// const mongodb = require('./server/db');

// mongodb.start();
// body解析
app.use(bodyParser());
// 中间件合集
app.use(compose([errMiddleware, logMeddleware.responseTime, logMeddleware.logger]));
// 静态资源
app.use(koaStatic(path.resolve(__dirname, './dist')));
// 路由
router.use('/api', indexRouter.routes(), indexRouter.allowedMethods());
app.use(indexRouter.routes(), indexRouter.allowedMethods());
// 错误信息
app.on('error', function (err) {
    console.log(chalk.red('logging error ', err.message));
    console.log(chalk.red(err));
});

app.listen(config.port);
console.log(chalk.cyan(`\n> server start: `) + chalk.green(`localhost:${config.port}`));
console.log(chalk.cyan(`> 当前服务环境: `) + chalk.green(`${config.name}\n`));

