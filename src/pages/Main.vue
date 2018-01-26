/**
* Created by busyhe on 2018/1/23 下午4:59.
* Email: 525118368@qq.com
*/

<template>
    <div class="main">
        <el-button type="text">文字按钮</el-button>
    </div>
</template>
<script>
    import {getResult} from '../api/main';

    export default {
        name: 'Main',
        data() {
            return {}
        },
        props: [''],
        components: {},
        created() {
            this.initData()
        },
        mounted() {
        },
        methods: {
            initData() {
                getResult('12345678').then(res => {
                })
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
