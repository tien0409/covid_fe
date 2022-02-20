<template>
    <el-table :data="vaccines">
        <el-table-column prop="MaVaccine" label="Mã vaccine" />
        <el-table-column prop="TenVaccine" label="Tên vaccine" />
        <el-table-column prop="XuatXu" label="Xuất xứ" />
        <el-table-column prop="DaSuDung" label="Đã sử dụng" />
        <el-table-column label="Tùy chọn">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/admin/vaccines/${scope.row.MaVaccine}/edit`)"
                >
                    <span class="font-bold text-danger">
                        <i class="fas fa-edit" />
                    </span>
                </el-button>
                <el-button type="danger" @click="$emit('remove', scope.row.MaVaccine)">
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
            vaccines: {
                type: Array,
                required: true,
            },
        },
    };
</script>
