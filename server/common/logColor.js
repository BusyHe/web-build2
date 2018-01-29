/**
 * Created by busyhe on 2018/1/29 上午10:05.
 * Email: 525118368@qq.com
 */
const chalk = require('chalk');

module.exports = {
    warning(val) {
        console.log(chalk.yellow(val))
    },
    success(val) {
        console.log(chalk.green(val))
    },
    danger(val) {
        console.error(chalk.red(val))
    },
    customColor(type, ...value) {
        console.log(chalk[type](...value));
    },
    custom(list) {
        let val = '';
        list.forEach(item => {
            val += chalk[item.type](item.value)
        });
        console.log(val)
    }
};
