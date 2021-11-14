<template>
    <el-tabs v-model="activeDeclarationSheet">
        <el-tab-pane label="Khai báo toàn dân" name="1">
            <MedicalFormNational :provinces="provinces" />
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
    import MedicalFormNational from '@/components/medical-form/National.vue';
    import { getProvinces } from '@/api/external/address';

    export default {
        components: {
            MedicalFormNational,
        },

        async asyncData() {
            const res = await getProvinces();
            return {
                provinces: res,
            };
        },

        data() {
            return {
                activeDeclarationSheet: '1',
            };
        },
    };
</script>
