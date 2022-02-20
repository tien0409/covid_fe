<template>
    <el-table :data="symptoms">
        <el-table-column prop="MaTrieuChung" label="Mã triệu chứng" width="150" />
        <el-table-column prop="TenTrieuChung" label="Tên triệu chứng" />
        <el-table-column prop="MoTa" label="Mô tả" />
        <el-table-column prop="SoNguoiNhiemBenhDaBi" label="Số người nhiễm bệnh từng bị" />
        <el-table-column label="Tùy chọn">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/admin/symptoms/${scope.row.MaTrieuChung}/edit`)"
                >
                    <span class="font-bold text-danger">
                        <i class="fas fa-edit" />
                    </span>
                </el-button>
                <el-button type="danger" @click="$emit('remove', scope.row.MaTrieuChung)">
                    <span class="font-bold text-danger">
                        <i class="fas fa-trash-alt" />
                    </span>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            symptoms: {
                type: Array,
                required: true,
            },
        },
    };
</script>
