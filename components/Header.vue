<template>
    <el-menu mode="horizontal" router>
        <el-menu-item index="/home">
            Khai báo
        </el-menu-item>
        <el-menu-item index="/information">
            Thông tin dịch bệnh
        </el-menu-item>
        <div v-if="loggedIn">
            <el-menu-item index="/admin/vaccines">
                Thông tin dịch bệnh
            </el-menu-item>
        </div>
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
