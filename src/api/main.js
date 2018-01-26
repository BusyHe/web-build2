/**
 * Created by busyhe on 2018/1/26 下午11:53.
 * Email: 525118368@qq.com
 */
import baseHttp from '../common/js/baseHttp'

export const getResult = async (id) => {
    await baseHttp.post('/main', {id})
};
