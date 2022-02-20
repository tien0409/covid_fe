<template>
    <el-menu mode="horizontal" router>
        <el-menu-item index="/home">
            Khai báo
        </el-menu-item>
        <el-menu-item index="/update-form">
            Chỉnh sửa phiếu khai báo
        </el-menu-item>
        <el-menu-item index="/update-form">
            Lịch sử khai báo
        </el-menu-item>
        <el-menu-item v-if="loggedIn" index="/admin/vaccines">
            Thông tin dịch bệnh
        </el-menu-item>
    </el-menu>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState('auth', ['loggedIn']),
        },
    };
</script>
