/**
 * Created by busyhe on 2018/1/27 上午12:59.
 * Email: 525118368@qq.com
 */
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
};

module.exports = handler;
