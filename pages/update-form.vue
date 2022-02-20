<template>
    <div class="h-full w-full flex justify-center items-center">
        <div v-if="!hadFound" class="w-1/3 flex">
            <el-input v-model="CMND" class="mr-5" placeholder="Nhập CMND" />
            <el-button type="success" @click="findForm">
                <span class="px-6">Tìm</span>
            </el-button>
        </div>
        <div v-else class="w-full">
            <div class="text-right mb-6">
                <el-button type="danger" @click="hadFound=false">
                    <span class="px-6">Quay lại</span>
                </el-button>
            </div>
            <HistoryForm :history="history" />
        </div>
    </div>
</template>

<script>
    import HistoryForm from '@/components/HistoryForm.vue';
    import { getHistory } from '@/api/user';

    export default {
        components: { HistoryForm },
        data() {
            return {
                CMND: '',
                hadFound: false,
                history: [],
            };
        },

        methods: {
            async findForm() {
                try {
                    const { data: { history } } = await getHistory({ CMND: this.CMND });
                    this.history = history;
                    this.hadFound = true;
                    this.$message.success('Thành công');
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
