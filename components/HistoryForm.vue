<template>
    <el-table :data="history">
        <el-table-column label="Mã phiếu">
            <template slot-scope="scope">
                {{ scope.row.MaPhieu[0] }}
            </template>
        </el-table-column>
        <el-table-column prop="HoTen" label="Họ Tên" />
        <el-table-column prop="CMND" label="CMND" />
        <el-table-column label="Tình trạng">
            <template slot-scope="scope">
                {{ scope.row.AmTinh ? 'Âm tính': 'Dương tính' }}
            </template>
        </el-table-column>
        <el-table-column label="Cập nhật gần nhất">
            <template slot-scope="scope">
                {{ scope.row.UpdatedAt | dateFormat }}
            </template>
        </el-table-column>
        <el-table-column label="Tùy chọn">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/admin/form/${scope.row.MaPhieu[0]}/edit`)"
                >
                    <i class="fas fa-edit" />
                </el-button>
                <el-button type="danger" @click="$emit('remove', scope.row.MaVaccine)">
                    <i class="fas fa-trash-alt" />
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            history: {
                type: Array,
                required: true,
            },
        },
    };
</script>
