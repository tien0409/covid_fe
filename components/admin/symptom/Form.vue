<template>
    <el-form>
        <el-form-item label="Tên triêu chứng">
            <el-input v-model="form.TenTrieuChung" placeholder="Tên triệu chứng" />
        </el-form-item>
        <el-form-item label="Mô tả triệu chứng">
            <el-input
                v-model="form.MoTa"
                type="textarea"
                :rows="3"
                placeholder="Mô tả triệu chứng"
            />
        </el-form-item>
        <div class="text-right">
            <el-button type="primary" @click="$emit('submit', form)">
                {{ isEdit ? 'Lưu thay đổi': 'Tạo mới' }}
            </el-button>
        </div>
    </el-form>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _isEmpty from 'lodash/isEmpty';

    const defaultForm = {
        TenTrieuChung: '',
        MoTa: '',
    };

    export default {
        props: {
            symptom: {
                type: Object,
                default: () => {},
            },
        },

        data() {
            const form = _isEmpty(this.symptom) ? _cloneDeep(defaultForm) : _cloneDeep(this.symptom);

            return {
                form,
            };
        },

        computed: {
            isEdit() {
                return !_isEmpty(this.symptom);
            },
        },
    };
</script>
