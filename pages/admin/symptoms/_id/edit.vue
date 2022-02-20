<template>
    <div class="flex flex-col">
        <h2 class="font-semibold text-3xl">
            Sửa thông tin triệu chứng nhiễm bệnh
        </h2>

        <div class="w-1/2 mt-6">
            <Form :symptom="symptom[0]" @submit="submitForm" />
        </div>

        <div class="mt-12 mb-6">
            Danh sách người từng nhiễm bệnh từng có triệu chứng {{ symptom[0].TenTrieuChung }}
        </div>
        <UserTable :users-symptom="symptom" />
    </div>
</template>

<script>
    import Form from '@/components/admin/symptom/Form.vue';
    import UserTable from '@/components/admin/symptom/UserTable.vue';
    import { getSymptom, updateSymptom } from '@/api/default';

    export default {
        components: { Form, UserTable },

        async asyncData({ params }) {
            const {
                data: { symptom },
            } = await getSymptom(params.id);

            return {
                symptom,
            };
        },

        methods: {
            async submitForm(formData) {
                try {
                    await updateSymptom(this.$route.params.id, formData);
                    this.$message.success('Thành công');
                    this.$router.push('/admin/symptoms');
                } catch (err) {
                    this.$message.error(
                        err.response?.data?.message
                            || 'Có lỗi xảy ra, Vui lòng thử lại sau',
                    );
                }
            },
        },
    };
</script>
