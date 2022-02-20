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
                    <el-form-item prop="HoTen" label="Họ tên">
                        <el-input v-model="form.HoTen" />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="CMND" label="CCCD/CMND">
                        <el-input v-model="form.CMND" />
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

            <el-form-item>
                <el-col :span="24">
                    <el-form-item prop="SoNha" label="Chi tiết địa chỉ">
                        <el-input v-model="form.SoNha" placeholder="Số nhà, phố, tổ dân phố/thôn/đội" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="11">
                    <el-form-item prop="SDT" label="Điện thoại">
                        <el-input v-model="form.SDT" />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="Email" label="Email">
                        <el-input v-model="form.Email" type="email" />
                    </el-form-item>
                </el-col>
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
    import { getDistricts, getWards } from '@/api/external/address';
    import { validPhone, validEmail } from '@/utils/form';
    import { createNationalForm } from '@/api/user';
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
        },

        data() {
            return {
                districts: [],
                wards: [],
                rules: {
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
                },
                form: {
                    MaDonVi: null,
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
                    const TenQuan = this.districts.find((district) => district.code === this.form.TenQuan).name;
                    const TenPhuong = this.wards.find((ward) => ward.code === this.form.TenPhuong).name;
                    const TrieuChung = this.$refs.infectedSubject.symptom.join(',');

                    const newForm = {
                        ...this.form, MaDonVi, TenTinh, TenQuan, TenPhuong, TrieuChung,
                    };
                    await createNationalForm(newForm);
                    this.$message.success('Thành công');
                } catch (err) {
                    console.log(err);
                    this.$message.error(err.response?.data?.message || 'Có lỗi xảy ra, Vui lòng thử lại sau');
                }
            },
        },
    };
</script>
