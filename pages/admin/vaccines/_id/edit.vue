<template>
    <div class="flex flex-col">
        <h2 class="font-semibold text-3xl">
            Sửa thông tin Vaccine
        </h2>

        <div class="w-1/2 mt-6">
            <Form :vaccine="vaccine" @submit="submitForm" />
        </div>
    </div>
</template>

<script>
    import Form from '@/components/admin/vaccine/Form.vue';
    import { getVaccine, updateVaccine } from '@/api/default';

    export default {
        components: { Form },

        async asyncData({ params }) {
            const { data: { vaccine } } = await getVaccine(params.id);
            return {
                vaccine,
            };
        },

        methods: {
            async submitForm(formData) {
                try {
                    await updateVaccine(this.$route.params.id, formData);
                    this.$message.success('Thành công');
                    this.$router.push('/admin/vaccines');
                } catch (err) {
                    this.$message.error(err.response?.data?.message || 'Có lỗi xảy ra, Vui lòng thử lại sau');
                }
            },
        },
    };
</script>
