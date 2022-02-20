<template>
    <MedicalFormNational
        :genders="genders"
        :provinces="provinces"
        :national="national"
    />
</template>

<script>
    import MedicalFormNational from '@/components/medical-form/National.vue';
    import { getProvinces, getCSCL } from '@/api/default';
    import { getNationalForm } from '@/api/user';
    import national from '@/constants/national';
    import vehicles from '@/constants/vehicles';
    import genders from '@/constants/genders';

    export default {
        components: {
            MedicalFormNational,
        },

        async asyncData({ params }) {
            const { data: { provinces } } = await getProvinces();
            const { data: { CSCL } } = await getCSCL();
            const { data: { form } } = await getNationalForm(params.id);

            console.log('form', form);
            return {
                provinces,
                CSCL,
                form,
            };
        },

        data() {
            return {
                genders,
                national,
                vehicles,
                activeDeclarationSheet: '1',
            };
        },

    };
</script>
