<template>
    <div class="w-7/12 mx-auto">
        <el-form
            :model="form"
            class="w-full login__form"
        >
            <h3 class="text-2xl font-semibold h-14 baloo-font">
                Chào mừng trở lại!
            </h3>

            <el-form-item label="Tài khoản" prop="TaiKhoan">
                <el-input
                    v-model="form.TaiKhoan"
                    placeholder="Tài khoản"
                />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="MatKhau">
                <div class="relative">
                    <el-input
                        v-model="form.MatKhau"
                        placeholder="Mật Khẩu"
                        show-password
                    />
                </div>
            </el-form-item>

            <div class="h-12 mt-10">
                <el-button type="primary" class="w-full h-full" @click="submitForm">
                    Đăng nhập
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    TaiKhoan: '',
                    MatKhau: '',
                },
            };
        },

        methods: {
            async submitForm() {
                try {
                    await this.$auth.loginWith('admin', {
                        data: this.form,
                    });
                    this.$message('Đăng nhập thành công');
                } catch (_) {
                    console.log('_', _);
                    this.$message.error('Tài khoản, mật khẩu không chính xác');
                }
            },
        },
    };
</script>
