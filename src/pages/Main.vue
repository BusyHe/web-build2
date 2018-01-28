/**
* Created by busyhe on 2018/1/23 下午4:59.
* Email: 525118368@qq.com
*/

<template>
    <div class="main">
        <h1>vue2 + Element-ui + Koa2 网站快速生成框架</h1>
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
    @import "~common/stylus/variable.styl"
    h1
        font-size 28px
        color $color-text
        text-align center
        margin 40px auto

    ul
        width 500px
        margin 0 auto
</style>
