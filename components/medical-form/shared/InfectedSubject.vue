<template>
    <div>
        <el-select
            clearable
            :value="infectedSubject"
            placeholder="Không"
            @change="changeInfectedSubject"
        >
            <el-option
                v-for="_subj in infectedSubjects"
                :key="_subj.MaNB"
                :value="_subj.MaNB"
                :label="_subj.TenNB"
            />
        </el-select>
        <div v-if="infectedSubject" class="mt-4">
            <el-button type="success" @click="$emit('onAdd')">
                <span class="mx-4">
                    Thêm
                </span>
            </el-button>
            <div v-if="exposedObject.length">
                <h3 class="text-lg font-semibold my-4" style="color=#606266">
                    Danh sách các đối tượng đã tiếp xúc
                </h3>
                <el-row v-for="(_obj, _index) in exposedObject" :key="_index" class="mb-3">
                    <el-col :span="5">
                        <el-input v-model="_obj.CMND" placeholder="CMND" />
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="_obj.DiaDiemTX" placeholder="Địa điểm tiếp xúc" />
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                            v-model="_obj.ThoiGianTX"
                            value-format="MM-dd-yyyy"
                            type="date"
                            placeholder="Thời gian tiếp xúc"
                        />
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="3">
                        <el-button
                            v-show="_index !== 0 || exposedObject.length == 1"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="$emit('onRemove', _index)"
                        />
                    </el-col>
                </el-row>
            </div>
        </div>
        <div>
            <h3 style="color: #606266" class="mr-8">
                Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện ít nhất 1 trong các dấu hiệu sau đây không?
            </h3>
            <el-checkbox-group v-model="symptom">
                <el-checkbox
                    v-for="_symptom in symptoms"
                    :key="_symptom.MaTrieuChung"
                    :label="_symptom.TenTrieuChung"
                >
                    {{ _symptom.TenTrieuChung }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    import { getInfectedSubject, getSymptoms } from '@/api/default';

    export default {
        props: {
            infectedSubject: {
                type: [String, Number],
                required: true,
            },
            exposedObject: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                infectedSubjects: [],
                symptoms: [],
                symptom: [],
            };
        },

        async mounted() {
            const { data: { infectedSubjects } } = await getInfectedSubject();
            const { data: { symptoms } } = await getSymptoms();
            this.infectedSubjects = infectedSubjects;
            this.symptoms = symptoms;
        },

        methods: {
            changeInfectedSubject(value) {
                this.$emit('onChangeInf', value);
            },
        },
    };
</script>
