<template>
    <div class="w-7/12 mx-auto">
        da
    </div>
</template>

<script>
    export default {
        async asyncData({ store, redirect }) {
            if (!store.$auth.loggedIn) {
                redirect('/admin/login');
            }
        },

    };
</script>
