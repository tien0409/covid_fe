<template>
    <div>
        <div class="flex justify-between mb-4 items-center">
            <h2 class="font-semibold text-3xl">
                Danh sách phiếu khai báo nội địa
            </h2>
            <!-- <el-button type="primary"> -->
            <!--     <nuxt-link to="/admin/vaccines/create"> -->
            <!--         Thêm thông tin vaccine -->
            <!--     </nuxt-link> -->
            <!-- </el-button> -->
        </div>

        <Table :sheets="sheets" @remove="removeVaccine" />
    </div>
</template>

<script>
    import _findIndex from 'lodash/findIndex';
    import { getDomesticSheets } from '@/api/user';
    import Table from '@/components/admin/form/entry/Table.vue';

    export default {
        components: { Table },

        async asyncData() {
            const { data: { sheets } } = await getDomesticSheets();
            return {
                sheets,
            };
        },

        methods: {
            async removeVaccine(id) {
                try {
                    const index = _findIndex(this.vacicnes, (vacicne) => vacicne.MaVaccine === id);
                    this.vaccines.splice(index, 1);
                    this.$message.success('Thành công');
                } catch (err) {
                    this.$message.error(err.response?.data?.message || 'Có lỗi xảy ra, Vui lòng thử lại sau');
                }
            },
        },
    };
</script>
