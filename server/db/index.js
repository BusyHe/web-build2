/**
 * Created by busyhe on 2018/1/27 上午2:05.
 * Email: 525118368@qq.com
 */
const mongoose = require('mongoose');
const config = require('../config');

exports.start = async () => {
    mongoose.connect(config.mongodb.mainUrl, {useMongoClient: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('mongoose connect success!')
    });
};
