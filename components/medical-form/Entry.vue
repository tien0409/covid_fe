<template>
    <div>
        <h2 class="text-center uppercase my-8 text-2xl font-bold">
            Thông tin khai báo y tế
        </h2>
        <p class="text-red-600 text-center my-4">
            Khuyến cáo: Khai báo thông tin sai là vi phạm pháp luật Việt Nam và có thể xử lý hình sự
        </p>
        <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            class="my-8"
        >
            <el-form-item required>
                <el-col :span="11">
                    <el-form-item prop="obj" label="Đối tượng">
                        <el-select
                            v-model="form.obj"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_obj in objects"
                                :key="_obj.label"
                                :label="_obj.label"
                                :value="_obj.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="gate" label="Cửa khẩu">
                        <el-select
                            v-model="form.gate"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_gate in gates"
                                :key="_gate.label"
                                :label="_gate.label"
                                :value="_gate.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Họ tên" prop="name">
                <el-col :span="24">
                    <el-input v-model="form.name" />
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
                        <el-select
                            v-model="form.national"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_nation in national"
                                :key="_nation.code"
                                :label="_nation.name"
                                :value="_nation.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item prop="id" label="CMND">
                <el-input v-model="form.id" />
            </el-form-item>

            <el-form-item prop="vehicles" label="Phương tiện đi lại">
                <el-radio-group v-model="form.vehicles">
                    <el-radio
                        v-for="_vehicle in vehicles"
                        :key="_vehicle.value"
                        border
                        :label="_vehicle.value"
                    >
                        {{ _vehicle.label }}
                    </el-radio>
                </el-radio-group>
                <el-input
                    v-if="isOtherVehicles"
                    v-model="form.vehicles"
                    class="mt-2"
                />
            </el-form-item>

            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="departureDay" label="Ngày khởi hành">
                        <el-date-picker
                            v-model="form.departureDay"
                            type="date"
                            style="width: 100%;"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="entryDay" label="Ngày nhập cảnh">
                        <el-date-picker
                            v-model="form.entryDay"
                            type="date"
                            style="width: 100%;"
                        />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <h3 class="font-bold">
                Địa điểm khởi hành(tỉnh/quốc gia)
            </h3>
            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="departureLocation" label="Quốc gia/Vùng lãnh thổ">
                        <el-select
                            v-model="form.departureLocation"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                            @change="form.departureProvince = ''"
                        >
                            <el-option
                                v-for="_nation in national"
                                :key="_nation.code"
                                :label="_nation.name"
                                :value="_nation.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="departureProvince" label="Tỉnh">
                        <el-select
                            v-if="isVietNameseDeparture"
                            v-model="form.departureProvince"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                        >
                            <el-option
                                v-for="_province in provinces"
                                :key="_province.value"
                                :label="_province.name"
                                :value="_province.value"
                            />
                        </el-select>
                        <el-input v-else v-model="form.departureProvince" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <h3 class="font-bold">
                Địa điểm nơi đến(tỉnh/quốc gia)
            </h3>
            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="destinationLocation" label="Quốc gia/Vùng lãnh thổ">
                        <el-select
                            v-model="form.destinationLocation"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                            @change="form.destinationProvince = ''"
                        >
                            <el-option
                                v-for="_nation in national"
                                :key="_nation.code"
                                :label="_nation.name"
                                :value="_nation.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="destinationProvince" label="Tỉnh">
                        <el-select
                            v-if="isVietNameseDestination"
                            v-model="form.destinationProvince"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                        >
                            <el-option
                                v-for="_province in provinces"
                                :key="_province.value"
                                :label="_province.name"
                                :value="_province.value"
                            />
                        </el-select>
                        <el-input v-else v-model="form.destinationProvince" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <h3 class="font-bold">
                Địa chỉ liên lạc tại Việt Nam
            </h3>
            <el-form-item>
                <el-col :span="8">
                    <el-form-item prop="province" label="Tỉnh thành">
                        <el-select
                            v-model="form.province"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
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

            <el-form-item label="Đối tượng nhiễm bệnh">
                <InfectedSubject
                    :infected-subject="form.infectedSubject"
                    :exposed-object="form.exposedObject"
                    :has-symptom="form.hasSymptom"
                    @onChangeInf="form.infectedSubject=$event"
                    @onChangeSymptom="form.hasSymptom=!form.hasSymptom"
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
    import { validPhone, validEmail } from '@/utils/form';
    import { getDistricts, getWards } from '@/api/external/address';
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
            national: {
                type: Array,
                required: true,
            },
            vehicles: {
                type: Array,
                required: true,
            },
            genders: {
                type: Array,
                required: true,

            },
        },

        data() {
            return {
                districts: [],
                wards: [],
                rules: {
                    obj: [
                        { required: true, message: 'Vui lòng chọn đối tượng', trigger: 'change' },
                    ],
                    gate: [
                        { required: true, message: 'Vui lòng chon cửa khẩu', trigger: 'blur' },
                    ],
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
                    injectedVaccine: [
                        { required: true, message: 'vui lòng chọn', trigger: 'blur' },
                    ],
                    vehicles: [
                        { required: true, message: 'Vui lòng chọn phương tiện', trigger: 'blur' },
                    ],
                    departureDay: [
                        { required: true, message: 'Vui lòng nhập ngày khởi hành', trigger: 'blur' },
                    ],
                    entryDay: [
                        { required: true, message: 'Vui lòng nhập ngày nhập cảnh', trigger: 'blur' },
                    ],
                    departureLocation: [
                        { required: true, message: 'Vui lòng chọn quốc gia khởi hành', trigger: 'blur' },
                    ],
                    departureProvince: [
                        { required: true, message: 'Vui lòng chọn tỉnh khởi hành', trigger: 'blur' },
                    ],
                    destinationLocation: [
                        { required: true, message: 'Vui lòng chọn quốc gia đã đến', trigger: 'blur' },
                    ],
                    destinationProvince: [
                        { required: true, message: 'Vui lòng chọn tỉnh đã đến', trigger: 'blur' },
                    ],
                },
                form: {
                    obj: '',
                    name: '',
                    id: '',
                    birthDay: '',
                    gender: '',
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
                    vaccine: '',
                    vehicles: '',
                    departureDay: '',
                    entryDay: '',
                    departureLocation: '',
                    departureProvince: '',
                    destinationLocation: '',
                    destinationProvince: '',
                },
            };
        },

        computed: {
            gates() {
                return [
                    { label: 'asd', value: 'asdasd' },
                    { label: '1', value: 'asd' },
                    { label: '2', value: '21' },
                    { label: '3', value: 'as21' },
                ];
            },

            objects() {
                return [
                    { label: 'Chuyên gia', value: 0 },
                    { label: 'Người Việt Nam', value: 1 },
                ];
            },

            isOtherVehicles() {
                return this.form.vehicles === 'other';
            },

            isVietNameseDeparture() {
                return this.form.departureLocation === 'VN';
            },

            isVietNameseDestination() {
                return this.form.destinationLocation === 'VN';
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
        },
    };
</script>
