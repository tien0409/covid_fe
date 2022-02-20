<template>
    <div>
        <h2 class="text-center uppercase my-8 text-2xl font-bold">
            Thông tin khai báo y tế
        </h2>
        <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
        >
            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="name" label="Họ tên">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="id" label="CCCD/CMND">
                        <el-input v-model="form.id" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="8">
                    <el-form-item prop="birthDay" label="Năm sinh">
                        <el-date-picker
                            v-model="form.birthDay"
                            type="date"
                            style="width: 100%;"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="1">
&nbsp;
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="gender" label="Giới tính">
                        <el-select
                            v-model="form.gender"
                            class="w-full"
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_gender in genders"
                                :key="_gender.value"
                                :label="_gender.value"
                                :value="_gender.label"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
&nbsp;
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="national" label="Quốc tịch">
                        <el-input v-model="form.national" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="8">
                    <el-form-item prop="province" label="Tỉnh thành">
                        <el-select
                            v-model="form.province"
                            filterable
                            placeholder="Chọn"
                            class="w-full"
                            @change="handleChangeProvince"
                        >
                            <el-option
                                v-for="_province in provinces"
                                :key="_province.code"
                                :label="_province.name"
                                :value="_province.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
&nbsp;
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="district" label="Quận / Huyện">
                        <el-select
                            v-model="form.district"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                            @change="handleChangeDistrict"
                        >
                            <el-option
                                v-for="_district in districts"
                                :key="_district.code"
                                :label="_district.name"
                                :value="_district.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
&nbsp;
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="ward" label="Phường / Xã">
                        <el-select
                            v-model="form.ward"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_ward in wards"
                                :key="_ward.code"
                                :label="_ward.name"
                                :value="_ward.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="24">
                    <el-form-item prop="address" label="Chi tiết địa chỉ">
                        <el-input v-model="form.address" placeholder="Số nhà, phố, tổ dân phố/thôn/đội" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="phoneNumber" label="Điện thoại">
                        <el-input v-model="form.phoneNumber" />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="email" label="Email">
                        <el-input v-model="form.email" type="email" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Đối tượng nhiễm bệnh">
                <InfectedSubject
                    :infected-subject="form.infectedSubject"
                    :exposed-object="form.exposedObject"
                    :has-symptom="form.hasSymptom"
                    :trieu-chung="form.TrieuChung"
                    @
                    @onChangeInf="form.infectedSubject=$event"
                    @onChangeSymptom="handle"
                    @onAdd="addExposedObject"
                    @onRemove="removeExposedObject"
                />
            </el-form-item>

            <el-form-item prop="isInjectedVaccine">
                <InjectedVaccine
                    :is-injected-vaccine="form.isInjectedVaccine"
                    :injected-vaccine="form.injectedVaccine"
                    @onChangeIsInjected="form.isInjectedVaccine=!form.isInjectedVaccine"
                    @onAdd="addInjectedVaccine"
                    @onRemove="removeInjectedVaccine"
                />
            </el-form-item>

            <div class="text-center mt-4">
                <el-button native-type="submit" type="primary">
                    <span class="px-4">
                        Gửi tờ khai
                    </span>
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { getDistricts, getWards } from '@/api/external/address';
    import { validPhone, validEmail } from '@/utils/form';
    import { NO } from '@/constants/infectedSubject';
    import InfectedSubject from './shared/InfectedSubject.vue';
    import InjectedVaccine from './shared/InjectedVaccine.vue';

    export default {
        components: { InfectedSubject, InjectedVaccine },

        props: {
            provinces: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                districts: [],
                wards: [],
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
                    ],
                    id: [
                        { required: true, message: 'Vui lòng nhập CCCD/CMND', trigger: 'blur' },
                    ],
                    gender: [
                        { required: true, message: 'Vui lòng chọn giới tính', trigger: 'blur' },
                    ],
                    birthDay: [
                        { required: true, message: 'Vui lòng nhập ngày sinh', trigger: 'blur' },
                    ],
                    national: [
                        { required: true, message: 'Vui lòng chọn quốc gia', trigger: 'blur' },
                    ],
                    province: [
                        { required: true, message: 'Vui lòng chọn tỉnh thành', trigger: 'blur' },
                    ],
                    district: [
                        { required: true, message: 'Vui lòng chọn quận/huyện', trigger: 'blur' },
                    ],
                    ward: [
                        { required: true, message: 'vui lòng chọn phường/xã', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: 'vui lòng nhập thông tin chi tiết nơi ở', trigger: 'blur' },
                    ],
                    phoneNumber: [
                        { required: true, message: 'vui lòng nhập thông tin chi tiết nơi ở', trigger: 'blur' },
                        { validator: validPhone, message: 'Số điện thoại không đúng', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: 'vui lòng nhập thông tin chi tiết nơi ở', trigger: 'blur' },
                        { validator: validEmail, message: 'Email không đúng định dạng', trigger: 'blur' },
                    ],
                    isInjectedVaccine: [
                        { required: true, message: 'vui lòng chọn', trigger: 'blur' },
                    ],
                },
                form: {
                    TrieuChung: [],
                    name: '',
                    id: '',
                    birthDay: '',
                    gender: 'man',
                    national: '',
                    province: '',
                    district: '',
                    ward: '',
                    address: '',
                    phoneNumber: '',
                    email: '',
                    hasSymptom: false,
                    isInjectedVaccine: false,
                    infectedSubject: NO,
                    exposedObject: [],
                    injectedVaccine: [],
                },
            };
        },

        computed: {
            genders() {
                return [
                    { label: 1, value: 'Nam' },
                    { label: 0, value: 'Nữ' },
                ];
            },

        },

        methods: {
            async handleChangeProvince(provinceCode) {
                this.form.district = '';
                const { districts } = await getDistricts(provinceCode);
                this.districts = districts;
            },

            async handleChangeDistrict(districtCode) {
                this.form.ward = '';
                const { wards } = await getWards(districtCode);
                this.wards = wards;
            },

            addExposedObject() {
                const _objLast = this.form.exposedObject[this.form.exposedObject.length - 1];
                if (_objLast && (!_objLast.id || !_objLast.address || !_objLast.timeMeet)) {
                    this.$message.error('Vui lòng nhập đầy đủ thông tin người tiếp xúc đang nhập');
                    return;
                }

                this.form.exposedObject.push({
                    id: '',
                    address: '',
                    timeMeet: '',
                });
            },

            removeExposedObject(index) {
                this.form.exposedObject.splice(index, 1);
            },

            addInjectedVaccine() {
                const _vaccineLast = this.form.injectedVaccine[this.form.injectedVaccine.length - 1];
                if (_vaccineLast && (!_vaccineLast.id || !_vaccineLast.vaccineName || !_vaccineLast.timeInjected)) {
                    this.$message.error('Vui lòng nhập đầy đủ thông tin vaccine đã tiêm đang nhập');
                    return;
                }

                this.form.injectedVaccine.push({
                    id: _vaccineLast?.id ? _vaccineLast.id + 1 : 1,
                    vaccineName: '',
                    timeInjected: '',
                });
            },

            removeInjectedVaccine(index) {
                this.form.injectedVaccine.splice(index, 1);
            },

            handle(e) {
                console.log('e', e);
            },
        },
    };
</script>
