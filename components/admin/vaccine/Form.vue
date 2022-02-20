<template>
    <el-form>
        <el-form-item label="Tên Vaccine">
            <el-input v-model="form.TenVaccine" placeholder="Tên Vaccine" />
        </el-form-item>
        <el-form-item label="Xuất xử Vaccine">
            <el-input v-model="form.XuatXu" placeholder="Xuất xử Vaccine" />
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
        TenVaccine: '',
        XuatXu: '',
    };

    export default {
        props: {
            vaccine: {
                type: Object,
                default: () => {},
            },
        },

        data() {
            const form = _isEmpty(this.vaccine) ? _cloneDeep(defaultForm) : _cloneDeep(this.vaccine);

            return {
                form,
            };
        },

        computed: {
            isEdit() {
                return !_isEmpty(this.vaccine);
            },
        },
    };
</script>
