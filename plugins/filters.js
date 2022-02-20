import Vue from 'vue';

import dateFormat from '@/plugins/filters/dateFormat';
import datetimeFormat from '@/plugins/filters/datetimeFormat';
import numberFormat from '@/plugins/filters/numberFormat';
import phoneFormat from '@/plugins/filters/phoneFormat';
import timeFormat from '@/plugins/filters/timeFormat';

export default () => {
    Vue.filter('datetimeFormat', datetimeFormat);
    Vue.filter('dateFormat', dateFormat);
    Vue.filter('numberFormat', numberFormat);
    Vue.filter('phoneFormat', phoneFormat);
    Vue.filter('timeFormat', timeFormat);
};
