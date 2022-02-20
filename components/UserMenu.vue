<template>
    <div class="flex w-full h-full items-center">
        <div class="w-1/2 leading-10">
            <button @click="toggleMenu">
                <i class="fas fa-bars text-xl" />
            </button>
        </div>
        <div class="w-1/2 flex justify-end items-center">
            <div class="text-xl color-notify mr-8 leading-10">
                <i class="fas fa-bell" />
            </div>
            <div v-if="userLogin" class="name-user lexend-font text-lg leading-10 mr-4 text-black">
                <span>Đơn vị: </span>
                <span>{{ userLogin.TenDonVi }}</span>
            </div>
            <el-dropdown trigger="click">
                <img class="user-icon w-12 h-12 rounded-full object-cover" :src="getDataImage()">
                <el-dropdown-menu slot="dropdown" class="user-menu">
                    <el-dropdown-item disabled>
                        <div class="text-md text-center leading-6 p-1 w-full my-2">
                            <div class="font-thin" />
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item class="user-menu-item sign-out">
                        <button @click="logOut">
                            <i class="mr-1 fas fa-sign-out-alt" /> Đăng xuất
                        </button>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            collapsed: {
                type: Boolean,
                required: true,
            },
        },
        computed: {
            userLogin() {
                return this.$auth.user;
            },
        },
        methods: {
            getDataImage() {
                return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
            },
            toggleMenu() {
                this.$emit('toggle');
            },
            async logOut() {
                await this.$auth.logout();
            },
        },
    };
</script>
