<template>
    <div>
        <el-select :value="infectedSubject" placeholder="Không" @change="changeInfectedSubject">
            <el-option
                v-for="_subj in INFECTED_SUBJECT"
                :key="_subj"
                :value="_subj"
                :label="_subj"
            />
        </el-select>
        <div v-if="visibleSymptoms" class="flex">
            <h3 style="color: #606266" class="mr-8">
                Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện ít nhất 1 trong các dấu hiệu: sốt, ho, khó thở, viêm phổi, đau họng, mệt mỏi không?
            </h3>
            <el-radio-group :value="hasSymptom" @change="$emit('onChangeSymptom')">
                <el-radio border :label="false">
                    Không
                </el-radio>
                <el-radio border :label="true">
                    Có
                </el-radio>
            </el-radio-group>
        </div>
        <div v-else class="mt-4">
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
                        <el-input v-model="_obj.id" placeholder="CMND" />
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="_obj.address" placeholder="Địa điểm tiếp xúc" />
                    </el-col>
                    <el-col :span="1">
            &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker v-model="_obj.timeMeet" type="date" placeholder="Thời gian tiếp xúc" />
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
    </div>
</template>

<script>
    import INFECTED_SUBJECT, { NO } from '@/constants/infectedSubject';

    export default {
        props: {
            infectedSubject: {
                type: String,
                required: true,
            },
            exposedObject: {
                type: Array,
                required: true,
            },
            hasSymptom: {
                type: Boolean,
                required: true,
            },
        },

        data: () => ({
            INFECTED_SUBJECT,
        }),

        computed: {
            visibleSymptoms() {
                return this.infectedSubject === NO;
            },

        },

        methods: {
            changeInfectedSubject(value) {
                this.$emit('onChangeInf', value);
            },
        },
    };
</script>
