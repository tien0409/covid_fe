<template>
    <div>
        <h2 class="text-center uppercase my-8 text-2xl font-bold">
            Thông tin khai báo y tế
        </h2>
        <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            class="my-8"
        >
            <el-form-item required>
                <el-col :span="11">
                    <el-form-item prop="DoiTuong" label="Đối tượng">
                        <el-select
                            v-model="form.DoiTuong"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_obj in objects"
                                :key="_obj.label"
                                :label="_obj.label"
                                :value="_obj.label"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item label="Họ tên" prop="HoTen">
                        <el-input v-model="form.HoTen" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="8">
                    <el-form-item prop="NgaySinh" label="Năm sinh">
                        <el-date-picker
                            v-model="form.NgaySinh"
                            type="date"
                            style="width: 100%;"
                            value-format="MM-dd-yyyy"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="1">
&nbsp;
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="GioiTinh" label="Giới tính">
                        <el-select
                            v-model="form.GioiTinh"
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
                    <el-form-item prop="QuocTich" label="Quốc tịch">
                        <el-select
                            v-model="form.QuocTich"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-option
                                v-for="_nation in national"
                                :key="_nation.code"
                                :label="_nation.name"
                                :value="_nation.name"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item prop="CMND" label="CMND">
                <el-input v-model="form.CMND" />
            </el-form-item>

            <el-form-item prop="PhuongTien" label="Phương tiện đi lại">
                <el-radio-group v-model="form.PhuongTien">
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
                    <el-form-item prop="NgayKhoiHanh" label="Ngày khởi hành">
                        <el-date-picker
                            v-model="form.NgayKhoiHanh"
                            type="date"
                            style="width: 100%;"
                            value-format="MM-dd-yyyy"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="NgayNhapCanh" label="Ngày nhập cảnh">
                        <el-date-picker
                            v-model="form.NgayNhapCanh"
                            type="date"
                            style="width: 100%;"
                            value-format="MM-dd-yyyy"
                        />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <h3 class="font-bold">
                Địa điểm khởi hành(tỉnh/quốc gia)
            </h3>
            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="DiaDiemQGKhoiHanh" label="Quốc gia/Vùng lãnh thổ">
                        <el-select
                            v-model="form.DiaDiemQGKhoiHanh"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                            @change="form.DiaDiemTinhKhoiHanh = ''"
                        >
                            <el-option
                                v-for="_nation in national"
                                :key="_nation.code"
                                :label="_nation.name"
                                :value="_nation.name"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="DiaDiemTinhKhoiHanh" label="Tỉnh">
                        <el-select
                            v-if="isVietNameseDeparture"
                            v-model="form.DiaDiemTinhKhoiHanh"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                        >
                            <el-option
                                v-for="_province in provinces"
                                :key="_province.MaDonVi"
                                :label="_province.TenDonVi"
                                :value="_province.TenDonVi"
                            />
                        </el-select>
                        <el-input v-else v-model="form.DiaDiemTinhKhoiHanh" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <h3 class="font-bold">
                Địa điểm nơi đến(tỉnh/quốc gia)
            </h3>
            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="DiaDiemQGNoiDen" label="Quốc gia/Vùng lãnh thổ">
                        <el-select
                            v-model="form.DiaDiemQGNoiDen"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                            @change="form.DiaDiemTinhNoiDen = ''"
                        >
                            <el-option
                                v-for="_nation in national"
                                :key="_nation.code"
                                :label="_nation.name"
                                :value="_nation.name"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="DiaDiemTinhNoiDen" label="Tỉnh">
                        <el-select
                            v-if="isVietNameseDestination"
                            v-model="form.DiaDiemTinhNoiDen"
                            class="w-full"
                            placeholder="Chọn"
                            filterable
                        >
                            <el-option
                                v-for="_province in provinces"
                                :key="_province.MaDonVi"
                                :label="_province.TenDonVi"
                                :value="_province.TenDonVi"
                            />
                        </el-select>
                        <el-input v-else v-model="form.DiaDiemTinhNoiDen" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <h3 class="font-bold">
                Địa chỉ liên lạc tại Việt Nam
            </h3>
            <el-form-item>
                <el-col :span="8">
                    <el-form-item prop="TenTinh" label="Tỉnh thành">
                        <el-select
                            v-model="form.TenTinh"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                            @change="handleChangeProvince"
                        >
                            <el-option
                                v-for="_province in provinces"
                                :key="_province.TenDonVi"
                                :label="_province.TenDonVi"
                                :value="_province.TaiKhoan.split('tk')[1]"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
&nbsp;
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="TenQuan" label="Quận / Huyện">
                        <el-select
                            v-model="form.TenQuan"
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
                    <el-form-item prop="TenPhuong" label="Phường / Xã">
                        <el-select
                            v-model="form.TenPhuong"
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

            <el-form-item prop="MaCSCL" label="Cơ sở cách ly">
                <el-radio-group v-model="form.MaCSCL">
                    <el-radio
                        v-for="_cscl in CSCL"
                        :key="_cscl.MaCSCL"
                        border
                        :label="_cscl.MaCSCL"
                    >
                        {{ _cscl.TenCSCL }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Đối tượng nhiễm bệnh">
                <InfectedSubject
                    ref="infectedSubject"
                    :infected-subject="form.MaNB"
                    :exposed-object="form.DSNguoiTX"
                    @onChangeInf="form.MaNB=$event"
                    @onChangeSymptom="form.hasSymptom=!form.hasSymptom"
                    @onAdd="addExposedObject"
                    @onRemove="removeExposedObject"
                />
            </el-form-item>

            <el-form-item prop="isInjectedVaccine">
                <InjectedVaccine
                    :is-injected-vaccine="form.isInjectedVaccine"
                    :injected-vaccine="form.DSVaccineDaTiem"
                    @onChangeIsInjected="form.isInjectedVaccine=!form.isInjectedVaccine"
                    @onAdd="addInjectedVaccine"
                    @onRemove="removeInjectedVaccine"
                />
            </el-form-item>

            <div class="text-center mt-4">
                <el-button type="primary" @click="submitForm">
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
    import { createEntryForm } from '@/api/user';
    import InfectedSubject from './shared/InfectedSubject.vue';
    import InjectedVaccine from './shared/InjectedVaccine.vue';
    import vehicles from '@/constants/vehicles';

    export default {
        components: {
            InfectedSubject,
            InjectedVaccine,
        },

        props: {
            provinces: {
                type: Array,
                required: true,
            },
            national: {
                type: Array,
                required: true,
            },
            CSCL: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                districts: [],
                wards: [],
                vehicles,
                rules: {
                    MaCSCL: [
                        { required: true, message: 'Vui lòng chọn cơ sở cách ly', trigger: 'change' },
                    ],
                    DoiTuong: [
                        { required: true, message: 'Vui lòng chọn đối tượng', trigger: 'change' },
                    ],
                    HoTen: [
                        { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
                    ],
                    CMND: [
                        { required: true, message: 'Vui lòng nhập CCCD/CMND', trigger: 'blur' },
                    ],
                    GioiTinh: [
                        { required: true, message: 'Vui lòng chọn giới tính', trigger: 'blur' },
                    ],
                    NgaySinh: [
                        { required: true, message: 'Vui lòng nhập ngày sinh', trigger: 'blur' },
                    ],
                    QuocTich: [
                        { required: true, message: 'Vui lòng chọn quốc gia', trigger: 'blur' },
                    ],
                    TenTinh: [
                        { required: true, message: 'Vui lòng chọn tỉnh thành', trigger: 'blur' },
                    ],
                    TenQuan: [
                        { required: true, message: 'Vui lòng chọn quận/huyện', trigger: 'blur' },
                    ],
                    TenPhuong: [
                        { required: true, message: 'vui lòng chọn phường/xã', trigger: 'blur' },
                    ],
                    SoNha: [
                        { required: true, message: 'vui lòng nhập thông tin chi tiết nơi ở', trigger: 'blur' },
                    ],
                    SDT: [
                        { required: true, message: 'vui lòng nhập thông tin chi tiết nơi ở', trigger: 'blur' },
                        { validator: validPhone, message: 'Số điện thoại không đúng', trigger: 'blur' },
                    ],
                    Email: [
                        { required: true, message: 'vui lòng nhập thông tin chi tiết nơi ở', trigger: 'blur' },
                        { validator: validEmail, message: 'Email không đúng định dạng', trigger: 'blur' },
                    ],
                    isInjectedVaccine: [
                        { required: true, message: 'vui lòng chọn', trigger: 'blur' },
                    ],
                    PhuongTien: [
                        { required: true, message: 'Vui lòng chọn phương tiện', trigger: 'blur' },
                    ],
                    NgayKhoiHanh: [
                        { required: true, message: 'Vui lòng nhập ngày khởi hành', trigger: 'blur' },
                    ],
                    NgayNhapCanh: [
                        { required: true, message: 'Vui lòng nhập ngày nhập cảnh', trigger: 'blur' },
                    ],
                    DiaDiemQGKhoiHanh: [
                        { required: true, message: 'Vui lòng chọn quốc gia khởi hành', trigger: 'blur' },
                    ],
                    DiaDiemTinhKhoiHanh: [
                        { required: true, message: 'Vui lòng chọn tỉnh khởi hành', trigger: 'blur' },
                    ],
                    DiaDiemQGNoiDen: [
                        { required: true, message: 'Vui lòng chọn quốc gia đã đến', trigger: 'blur' },
                    ],
                    DiaDiemTinhNoiDen: [
                        { required: true, message: 'Vui lòng chọn tỉnh đã đến', trigger: 'blur' },
                    ],
                },
                form: {
                    obj: '',
                    MaCSCL: null,
                    MaNB: null,
                    HoTen: '',
                    CMND: '',
                    NgaySinh: '',
                    GioiTinh: null,
                    QuocTich: '',
                    TenTinh: '',
                    TenQuan: '',
                    TenPhuong: '',
                    SoNha: '',
                    SDT: '',
                    Email: '',
                    hasSymptom: false,
                    isInjectedVaccine: false,
                    infectedSubject: NO,
                    DSNguoiTX: [],
                    DSVaccineDaTiem: [],
                    TrieuChung: [],
                    PhuongTien: '',
                    DiaDiemQGKhoiHanh: '',
                    DiaDiemTinhKhoiHanh: '',
                    DiaDiemQGNoiDen: '',
                    DiaDiemTinhNoiDen: '',
                },
            };
        },

        computed: {
            objects() {
                return [
                    { label: 'Chuyên gia' },
                    { label: 'Người Việt Nam' },
                ];
            },

            genders() {
                return [
                    { label: 1, value: 'Nam' },
                    { label: 0, value: 'Nữ' },
                ];
            },

            isOtherVehicles() {
                return this.form.PhuongTien === 'other';
            },

            isVietNameseDeparture() {
                return this.form.DiaDiemQGKhoiHanh === 'Viet Nam';
            },

            isVietNameseDestination() {
                return this.form.DiaDiemQGNoiDen === 'Viet Nam';
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
                const _objLast = this.form.DSNguoiTX[this.form.DSNguoiTX.length - 1];
                if (_objLast && (!_objLast.CMND || !_objLast.DiaDiemTX || !_objLast.ThoiGianTX)) {
                    this.$message.error('Vui lòng nhập đầy đủ thông tin người tiếp xúc đang nhập');
                    return;
                }

                this.form.DSNguoiTX.push({
                    CMND: '',
                    DiaDiemTX: '',
                    ThoiGianTX: '',
                });
            },

            removeExposedObject(index) {
                this.form.DSNguoiTX.splice(index, 1);
            },

            addInjectedVaccine() {
                const _vaccineLast = this.form.DSVaccineDaTiem[this.form.DSVaccineDaTiem.length - 1];
                if (_vaccineLast && (!_vaccineLast.LuotTiem || !_vaccineLast.MaVaccine || !_vaccineLast.NgayTiem)) {
                    this.$message.error('Vui lòng nhập đầy đủ thông tin vaccine đã tiêm đang nhập');
                    return;
                }

                this.form.DSVaccineDaTiem.push({
                    MaVaccine: '',
                    LuotTiem: _vaccineLast?.LuotTiem ? _vaccineLast.LuotTiem + 1 : 1,
                    NgayTiem: '',
                });
            },

            removeInjectedVaccine(index) {
                this.form.DSVaccineDaTiem.splice(index, 1);
            },

            async submitForm() {
                try {
                    const MaDonVi = +this.form.TenTinh;
                    const TenTinh = this.provinces.find((province) => province.TaiKhoan
                        === `tk${this.form.TenTinh}`).TenDonVi;
                    const TenQuan = this.districts.find((district) => district.code === +this.form.TenQuan).name;
                    const TenPhuong = this.wards.find((ward) => ward.code === +this.form.TenPhuong).name;
                    const TrieuChung = this.$refs.infectedSubject.symptom.join(',');

                    const newForm = {
                        ...this.form, MaDonVi, TenTinh, TenQuan, TenPhuong, TrieuChung,
                    };
                    await createEntryForm(newForm);
                    this.$message.success('Thành công');
                } catch (err) {
                    console.log('err', err);
                    this.$message.error(err.response?.data?.message || 'Có lỗi xảy ra, Vui lòng thử lại sau');
                }
            },
        },
    };
</script>
