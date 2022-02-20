<template>
    <el-table :data="usersSymptom">
        <el-table-column prop="CMND" label="CMND/CCCD" />
        <el-table-column prop="HoTen" label="Họ Tên" width="150" />
        <el-table-column prop="TenNB" label="Đối tượng" />
        <el-table-column prop="VaccineDaTiem" label="Vaccine đã tiêm" width="250" />
        <el-table-column label="Tình trạng hiện tại">
            <template slot-scope="scope">
                {{ scope.row.AmTinh ? 'Âm tính': 'Dương tính' }}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            usersSymptom: {
                type: Array,
                required: true,
            },
        },
    };
</script>
