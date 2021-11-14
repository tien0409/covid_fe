<template>
    <el-tabs v-model="activeDeclarationSheet">
        <el-tab-pane label="Khai báo toàn dân" name="1">
            Khai báo toàn dân
        </el-tab-pane>
        <el-tab-pane label="Khai báo nội địa" name="2">
            Khai báo nội địa
        </el-tab-pane>
        <el-tab-pane label="Khai báo nhập cảnh" name="3">
            Khai báo nhập cảnh
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                activeDeclarationSheet: '1'
            }
        }
    }
</script>
