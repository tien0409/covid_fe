<template>
    <el-menu
        ref="menu"
        :collapse="collapsed"
        :default-active="index"
        :default-openeds="defaultOpeneds"
        :class="{ collapsed }"
        class="admin-sidebar h-full flex-col"
        text-color="#75767E"
        active-text-color="#336CCE"
        :collapse-transition="false"
    >
        <nuxt-link to="/home" class="menu-active">
            <div class="bg-white bg-logo" :class="collapsed ? 'text-center' : 'flex justify-center h-24 w-56'">
                <div class="w-full bg-white" :class="collapsed ? 'pt-4' : 'pt-8'">
                    <img v-if="!collapsed" src="/images/Logo2.svg" class="w-38 mx-auto">
                    <img v-else src="/images/Group.svg" class="mx-auto w-12 pb-6">
                </div>
            </div>
        </nuxt-link>
        <nuxt-link to="/home">
            <SidebarItem icon="fas fa-home" :index="index">
                Trang chủ
            </SidebarItem>
        </nuxt-link>
        <nuxt-link to="/admin/vaccines">
            <SidebarItem icon="fas fa-syringe" :index="index+1">
                Quản lý vaccine
            </SidebarItem>
        </nuxt-link>
        <nuxt-link to="/admin/symptoms">
            <SidebarItem icon="fas fa-face-surprise" :index="index+2">
                Quản lý triệu chứng nhiễm bệnh
            </SidebarItem>
        </nuxt-link>
        <div>
            <el-dropdown trigger="click" class="w-full" placement="right-start">
                <SidebarItem icon="fas fa-file" :index="index + 3">
                    Quản lý phiếu khai báo
                </SidebarItem>
                <el-dropdown-menu slot="dropdown">
                    <h1 class="text-gray-60 text-sm font-semibold pl-7">
                        Quản lý phiếu khai báo
                    </h1>
                    <nuxt-link to="/admin/form/national">
                        <el-dropdown-item>
                            <i class="fas fa-file" />
                            Phiếu khai báo toàn dân
                        </el-dropdown-item>
                    </nuxt-link>
                    <nuxt-link to="/admin/form/domestic">
                        <el-dropdown-item>
                            <i class="fas fa-file" />
                            Phiếu khai báo nội địa
                        </el-dropdown-item>
                    </nuxt-link>
                    <nuxt-link to="/admin/form/entry">
                        <el-dropdown-item>
                            <i class="fas fa-file" />
                            Phiếu khai báo nhập cảnh
                        </el-dropdown-item>
                    </nuxt-link>
                </el-dropdown-menu>
            </el-dropdown>
            <nuxt-link to="/admin/statis">
                <SidebarItem icon="fas fa-statis" :index="index+4">
                    Thống kê
                </SidebarItem>
            </nuxt-link>
        </div>
    </el-menu>
</template>

<script>
    import SidebarItem from './Item.vue';

    export default {
        components: {
            SidebarItem,
        },

        props: {
            collapsed: {
                type: Boolean,
                required: true,
            },
        },

        data() {
            return {
                defaultOpeneds: [],
                index: '1',
            };
        },

        computed: {
            userLoged() {
                return this.$store.state.auth.loggedIn;
            },
        },
    };
</script>
