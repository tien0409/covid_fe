<template>
    <el-table :data="sheets">
        <el-table-column prop="MaPhieu" label="Mã phiếu" width="100" />
        <el-table-column prop="CMND" label="CMND/CCCD" width="200" />
        <el-table-column prop="HoTen" label="Họ tên" width="200" />
        <el-table-column prop="VaccineDaTiem" label="Vaccine đã tiêm"  width="250"/>
        <el-table-column prop="QuocTich" label="Quốc tịch" width="170" />
        <el-table-column label="Tình trạng" width="150">
            <template slot-scope="scope">
                {{ scope.row.AmTinh ? 'Âm tính': 'Dương tính' }}
            </template>
        </el-table-column>
        <el-table-column label="Thuộc dạng" width="130">
            <template slot-scope="scope">
                {{ scope.row.TenNB }}
            </template>
        </el-table-column>
        <el-table-column label="Cập nhật gần nhất" width="230">
            <template slot-scope="scope">
                {{ scope.row.UpdatedAt | dateFormat }}
            </template>
        </el-table-column>
        <el-table-column label="Tùy chọn">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/admin/vaccines/${scope.row.MaVaccine}/edit`)"
                >
                    <i class="fas fa-eye" />
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
            sheets: {
                type: Array,
                required: true,
            },
        },
    };
</script>
