/**
 * Created by busyhe on 2018/1/27 上午1:49.
 * Email: 525118368@qq.com
 * 网络状态0成功，1错误，2警告
 */
const status = {
    success(data) {
        let successData = {
            status: 0
        };
        if (!data) {
            return successData
        } else {
            return Object.assign({}, successData, data)
        }
    },
    warning(msg) {
        return {
            status: 1,
            message: msg
        }
    },
    error(msg) {
        return {
            status: 2,
            message: msg
        }
    }
};

module.exports = status;
