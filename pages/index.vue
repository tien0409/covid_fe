<template>
    <div id="bg" class="relative w-screen h-screen">
        <div class="w-1/3 h-1/3 border bg-white rounded-md flex items-center justify-center shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <el-form
                ref="form"
                :model="form"
                label-width="120px"
                :rules="rules"
                @submit.native.prevent="handleLogin"
            >
                <el-form-item prop="phoneNumber" label="Phone Number">
                    <el-input v-model="form.phoneNumber" />
                </el-form-item>

                <el-button native-type="submit" class="w-full" type="primary">
                    Đăng nhập
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    phoneNumber: ""
                },
                rules: {
                    phoneNumber: [
                        { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            handleLogin() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log("Login success");
                        this.$router.push("/home");
                    } else {
                        this.$message.error("Vui lòng nhập đầy đủ thông tin")
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
#bg {
    background-color: #20262d;
}
</style>
