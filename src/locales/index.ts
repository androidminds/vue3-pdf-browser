import {createI18n} from "vue-i18n";
import enMessages from './en'
import zhCNMessages from './zh-CN'

const messages = {
    'en': enMessages,
    'zh-CN': zhCNMessages
}

const i18n = createI18n({
    legacy: false,
    locale: navigator.language,
    fallbackLocale: 'en',
    messages,
})

export default i18n;
