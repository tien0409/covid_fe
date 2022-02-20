<template>
    <div>
        <div class="flex">
            <h3 style="color: #606266" class="mr-8">
                Đã tiêm vaccine ?
            </h3>
            <el-radio-group :value="isInjectedVaccine" @change="$emit('onChangeIsInjected')">
                <el-radio border :label="false">
                    Chưa tiêm
                </el-radio>
                <el-radio border :label="true">
                    Đã tiêm
                </el-radio>
            </el-radio-group>
        </div>
        <div v-if="isInjectedVaccine" class="mt-4">
            <el-button type="success" @click="$emit('onAdd')">
                <span class="mx-4">
                    Thêm
                </span>
            </el-button>
            <div v-if="injectedVaccine.length">
                <h3 class="text-lg font-semibold my-4" style="color=#606266">
                    Thông tin các lần tiêm Vaccine
                </h3>
                <el-row v-for="(_obj, _index) in injectedVaccine" :key="_index" class="mb-3">
                    <el-col :span="5">
                        <h3>
                            Lần tiêm thứ {{ _obj.LuotTiem }}
                        </h3>
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model="_obj.MaVaccine">
                            <el-option
                                v-for="_vaccine in vaccines"
                                :key="_vaccine.MaVaccine"
                                :value="_vaccine.MaVaccine"
                                :label="_vaccine.TenVaccine"
                            />
                        </el-select>
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                            v-model="_obj.NgayTiem"
                            value-format="MM-dd-yyyy"
                            type="date"
                            placeholder="Ngày tiêm"
                        />
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="3">
                        <el-button
                            v-show="_index !== 0 || injectedVaccine.length == 1"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="$emit('onRemove', _index)"
                        />
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import { getVaccines } from '@/api/default';

    export default {
        props: {
            injectedVaccine: {
                type: Array,
                required: true,
            },
            isInjectedVaccine: {
                type: Boolean,
                required: true,
            },
        },

        data() {
            return {
                vaccines: [],
            };
        },

        async mounted() {
            const { data: { vaccines } } = await getVaccines();
            this.vaccines = vaccines;
        },
    };
</script>
