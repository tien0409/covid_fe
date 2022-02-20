<template>
    <div>
        <div class="flex justify-between mb-4 items-center">
            <h2 class="font-semibold text-3xl">
                Danh sách thông tin triệu chứng nhiễm bệnh
            </h2>
            <el-button type="primary">
                <nuxt-link to="/admin/symptoms/create">
                    Thêm thông tin triệu chứng
                </nuxt-link>
            </el-button>
        </div>

        <Table :symptoms="symptoms" @remove="removeVaccine" />
    </div>
</template>

<script>
    import _findIndex from 'lodash/findIndex';
    import Table from '@/components/admin/symptom/Table.vue';
    import { getSymptoms, removeSymptom } from '@/api/default';

    export default {
        components: { Table },

        async asyncData() {
            const { data: { symptoms } } = await getSymptoms();
            return {
                symptoms,
            };
        },

        methods: {
            async removeVaccine(id) {
                try {
                    await removeSymptom(id);
                    const index = _findIndex(this.symptoms, (symptom) => symptom.MaTrieuChung === id);
                    this.symptoms.splice(index, 1);
                    this.$message.success('Thành công');
                } catch (err) {
                    this.$message.error(err.response?.data?.message || 'Có lỗi xảy ra, Vui lòng thử lại sau');
                }
            },
        },
    };
</script>
