import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../lang/en'
import kh from '../lang/kh'

Vue.use(VueI18n);
const messages = { en, kh };
const i18n = new VueI18n({
    locale: 'kh',
    messages
});

export default i18n;
