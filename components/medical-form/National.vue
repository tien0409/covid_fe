<template>
    <div>
        <h2 class="text-center uppercase my-8 text-2xl font-bold">
            Thông tin khai báo y tế
        </h2>
        <el-form ref="formRef" model="form" label-width="120px">
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
                <el-col :span="7">
                    <el-form-item prop="birthDay" label="Năm sinh">
                        <el-date-picker
                            v-model="form.birthDay"
                            type="date"
                            style="width: 100%;"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item prop="gender" label="Giới tính">
                        <el-radio-group v-model="form.gender">
                            <el-radio
                                v-for="_gender in genders"
                                :key="_gender.label"
                                border
                                :label="_gender.label"
                            >
                                {{ _gender.value }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
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
                <el-col :span="8">
                    <el-form-item v-model="form.district" label="Quận / Huyện">
                        <el-select filterable placeholder="Chọn">
                            <el-option />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="ward" label="Phường / Xã">
                        <el-select
                            v-model="form.ward"
                            class="w-full"
                            filterable
                            placeholder="Chọn"
                        >
                            <el-select
                                v-model="form.ward"
                                class="w-full"
                                filterable
                                placeholder="Chọn"
                            >
                                <el-option />
                            </el-select>
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
    import { getDistricts } from '@/api/external/address';

    export default {
        props: {
            provinces: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                form: {
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
                },
            };
        },

        computed: {
            genders() {
                return [
                    { label: 'man', value: 'Nam' },
                    { label: 'woman', value: 'Nữ' },
                    { label: 'other', value: 'Khác' },
                ];
            },
        },

        methods: {
            async handleChangeProvince(provinceCode) {
                const res = await getDistricts(provinceCode);
                console.log(res);
            },
        },
    };
</script>
