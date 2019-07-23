<template>
    <div>
        <Tips title="订单管理"></Tips>
    </div>

</template>

<script>
    import Tips from '../../components/tips'

    export default {
        name: "home",
        components: {
            Tips
        },
        data() {
            return {
                show: true
            }
        }
    }
</script>

<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>