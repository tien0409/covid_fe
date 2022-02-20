<template>
    <div>
        <div class="flex justify-between mb-4 items-center">
            <h2 class="font-semibold text-3xl">
                Danh sách Vaccine
            </h2>
            <el-button type="primary">
                <nuxt-link to="/admin/vaccines/create">
                    Thêm thông tin vaccine
                </nuxt-link>
            </el-button>
        </div>

        <Table :vaccines="vaccines" @remove="removeVaccine" />
    </div>
</template>

<script>
    import _findIndex from 'lodash/findIndex';
    import Table from '@/components/admin/vaccine/Table.vue';
    import { getVaccines, removeVaccine } from '@/api/default';

    export default {
        components: { Table },

        async asyncData() {
            const { data: { vaccines } } = await getVaccines();
            return {
                vaccines,
            };
        },

        methods: {
            async removeVaccine(id) {
                try {
                    await removeVaccine(id);
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
