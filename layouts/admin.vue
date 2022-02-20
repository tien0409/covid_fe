<template>
    <el-container class="admin h-screen">
        <el-aside class="flex h-full overflow-y-hidden" width="auto">
            <Sidebar :collapsed="collapsed" />
            <div class="linght" />
        </el-aside>

        <el-container direction="vertical" class="w-full h-full flex flex-col justify-between">
            <el-header class="admin__navbar items-center justify-end h-20 bg-white">
                <UserMenu :collapsed="collapsed" @toggle="toggleMenu" />
            </el-header>

            <div class="admin__content overflow-x-hidden flex flex-grow justify-between flex-col">
                <nuxt class="flex-grow bg-white overflow-y-auto p-6 rounded-tl-lg m-6" />
            </div>
        </el-container>
    </el-container>
</template>

<script>
    import Sidebar from '@/components/sidebar/Sidebar.vue';
    import UserMenu from '@/components/UserMenu.vue';

    export default {

        components: {
            Sidebar,
            UserMenu,
        },

        data: () => ({
            collapsed: false,
        }),

        methods: {
            toggleMenu() {
                this.collapsed = !this.collapsed;
            },
        },
    };
</script>

<styte lang="scss" scoped>
.admin__content {
    background-color: #D6E2F5;
    padding: 0px !important;
}
</styte>
