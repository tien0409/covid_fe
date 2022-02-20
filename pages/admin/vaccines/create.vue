<template>
    <div class="flex flex-col">
        <h2 class="font-semibold text-3xl">
            Thêm mới thông tin Vaccine
        </h2>

        <div class="w-1/2 mt-6">
            <Form @submit="submitForm" />
        </div>
    </div>
</template>

<script>
    import Form from '@/components/admin/vaccine/Form.vue';
    import { createVaccine } from '@/api/default';

    export default {
        components: { Form },

        methods: {
            async submitForm(formData) {
                try {
                    await createVaccine(formData);
                    this.$message.success('Thành công');
                    this.$router.push('/admin/vaccines');
                } catch (err) {
                    this.$message.error(err.response?.data?.message || 'Có lỗi xảy ra, Vui lòng thử lại sau');
                }
            },
        },
    };
</script>
