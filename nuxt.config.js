export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'do_an_covid',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '@fortawesome/fontawesome-free/css/all.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/axios',
        '@/plugins/element-ui',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/fontawesome',
    ],

    axios: {
        browserBaseURL: 'http://localhost:8080',
        baseURL: 'http://localhost:8080',
        proxyHeaders: false,
        credentials: false,
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],

    auth: {
        plugins: [{ src: '@/plugins/axios.js', ssr: true }],
        redirect: {
            login: '/admin/login',
            home: '/admin',
        },
        strategies: {
            admin: {
                scheme: 'local',
                token: {
                    property: 'data.token',
                },
                autoLogout: true,
                user: {
                    property: 'data.user',
                },
                endpoints: {
                    login: {
                        url: 'http://localhost:8080/api/admin/login',
                        method: 'POST',
                    },
                    logout: false,
                    user: {
                        url: 'http://localhost:8080/api/admin/currentUser',
                        method: 'GET',
                    },
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
    },
};
