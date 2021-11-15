<template>
    <el-tabs v-model="activeDeclarationSheet" stretch>
        <el-tab-pane label="Khai báo toàn dân" name="1">
            <MedicalFormNational :genders="genders" :provinces="provinces" :national="national" />
        </el-tab-pane>
        <el-tab-pane label="Khai báo nội địa" name="2">
            <MedicalFormDomestic :genders="genders" :provinces="provinces" :national="national" />
        </el-tab-pane>
        <el-tab-pane label="Khai báo nhập cảnh" name="3">
            <MedicalFormEntry
                :genders="genders"
                :vaccine="vaccine"
                :vehicles="vehicles"
                :provinces="provinces"
                :national="national"
            />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import MedicalFormNational from '@/components/medical-form/National.vue';
    import MedicalFormDomestic from '@/components/medical-form/Domestic.vue';
    import MedicalFormEntry from '@/components/medical-form/Entry.vue';
    import { getProvinces } from '@/api/external/address';
    import national from '@/constants/national';
    import vehicles from '@/constants/vehicles';
    import vaccine from '@/constants/vaccine';
    import genders from '@/constants/genders';

    export default {
        components: {
            MedicalFormNational,
            MedicalFormDomestic,
            MedicalFormEntry,
        },

        async asyncData() {
            const res = await getProvinces();
            return {
                provinces: res,
            };
        },

        data() {
            return {
                vaccine,
                genders,
                national,
                vehicles,
                activeDeclarationSheet: '1',
            };
        },
    };
</script>
