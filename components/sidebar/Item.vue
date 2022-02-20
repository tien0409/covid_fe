<template functional>
    <el-menu-item :index="props.index" class="bg-white">
        <i :class="props.icon" class="text-xl w-8 text-center" />
        <template #title>
            <span><slot /></span>
        </template>
    </el-menu-item>
</template>

<script>
    export default {
        props: {
            link: String,
            icon: String,
            index: String,
        },
    };
</script>

<style>
.menu-active .el-tooltip {
    left: 4px !important;
}
</style>
